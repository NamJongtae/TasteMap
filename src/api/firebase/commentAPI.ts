import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "./setting";
import { ICommentData } from "../apiType";
import { getAuth } from "firebase/auth";

const auth = getAuth();

/**
 * 댓글 첫 페이지 조회
 */
export const fetchFirstPageCommentData = async (
  postId: string, pagePerData:number
) => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      orderBy("createdAt", "desc"),
      where("postId", "==", postId),
      limit(pagePerData),
    );
    const commentDoc = await getDocs(q);
    const data = commentDoc.docs.map((el) => el.data());

    const userRef = collection(db, "user");
    const userDocs = await getDocs(userRef);
    const userList = userDocs.docs.map((el) => el.data());

    // 유저 db를 담을 Map 생성
    const userMap = new Map();
    // 사용자 데이터 목록을 반복하면서 Map에 사용자 UID를 키로 하여 데이터를 저장
    for (const userData of userList) {
      userMap.set(userData.uid, userData);
    }
    // 게시물 데이터 목록을 반복하면서 사용자 데이터를 연결
    for (let i = 0; i < data.length; i++) {
      const userData = userMap.get(data[i].uid);
      // 기존 data에 displayName과 photoURL을 추가
      if (userData) {
        data[i].displayName = userData.displayName;
        data[i].photoURL = userData.photoURL;
      }
    }

    return {commentDoc, data: data as ICommentData[]};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 페이징
 */
export const fetchPagingCommentData = async (
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  postId: string, pagePerData:number
) => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      orderBy("createdAt", "desc"),
      where("postId", "==", postId),
      startAfter(page),
      limit(pagePerData),
    );
    const commentDoc = await getDocs(q);
    const data = commentDoc.docs.map((el) => el.data());

    const userRef = collection(db, "user");
    const userDocs = await getDocs(userRef);
    const userList = userDocs.docs.map((el) => el.data());

    // 유저 db를 담을 Map 생성
    const userMap = new Map();
    // 사용자 데이터 목록을 반복하면서 Map에 사용자 UID를 키로 하여 데이터를 저장
    for (const userData of userList) {
      userMap.set(userData.uid, userData);
    }
    // 게시물 데이터 목록을 반복하면서 사용자 데이터를 연결
    for (let i = 0; i < data.length; i++) {
      const userData = userMap.get(data[i].uid);
      // 기존 data에 displayName과 photoURL을 추가
      if (userData) {
        data[i].displayName = userData.displayName;
        data[i].photoURL = userData.photoURL;
      }
    }

    return {commentDoc, data: data as ICommentData[]};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 추가
 */
export const fetchAddComment = async (commentData: ICommentData) => {
  try {
    // comment colledcion에 댓글 doc 추가
    const commentsRef = collection(db, "comments");
    const addCommentPromise = setDoc(
      doc(commentsRef, commentData.commentId),
      commentData
    );

    // 게시물 doc에 commenCount 늘리기
    const postDoc = doc(db, `post/${commentData.postId}`);
    const addCommentCountPromise = updateDoc(postDoc, {
      commentCount: increment(1)
    });

    await Promise.all([addCommentPromise, addCommentCountPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 수정
 */
export const fetchEditComment = async (
  commentEditData: Pick<ICommentData, "commentId" | "content">
) => {
  try {
    const commentDoc = doc(db, `comments/${commentEditData.commentId}`);
    await updateDoc(commentDoc, { content: commentEditData.content });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 삭제
 */
export const fetchRemoveComment = async (
  commentData: ICommentData
): Promise<void> => {
  try {
    // 댓글 삭제
    const commentsDoc = doc(db, `comments/${commentData.commentId}`);
    const removeCommentPromise = deleteDoc(commentsDoc);

    // 게시물 doc에서 commentCount 줄이기
    const postDoc = doc(db, `post/${commentData.postId}`);
    const removeCommentCountPromise = updateDoc(postDoc, {
      commentCount: increment(-1)
    });
    await Promise.all([removeCommentPromise, removeCommentCountPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 신고
 */

export const fetchReportComment = async (
  reportCommentData: Pick<ICommentData, "commentId" | "reportCount"> & {
    postId: string;
  }
) => {
  try {
    const commentDoc = doc(db, `comments/${reportCommentData.commentId}`);
    const addReportCountPromise = await updateDoc(commentDoc, {
      reportCount: increment(1),
      isBlock: reportCommentData.reportCount >= 4 ? true : false
    });

    const decreaseCommentCountPromise = []
    if (reportCommentData.reportCount >= 4) {
      const postDoc = doc(db, `post/${reportCommentData.postId}`);
      decreaseCommentCountPromise.push(updateDoc(postDoc, {
        commentCount: increment(-1)
      }));
    }
    if (!auth.currentUser) return;
    const userDoc = doc(db, `user/${auth.currentUser.uid}`);
    const addReportListPromise = updateDoc(userDoc, {
      reportCommentList: arrayUnion(reportCommentData.commentId)
    });

    await Promise.all([
      addReportCountPromise,
      decreaseCommentCountPromise,
      addReportListPromise
    ]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
