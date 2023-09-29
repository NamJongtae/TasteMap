import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
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
import { ICommentData, IUserData } from "../apiType";
import { getAuth } from "firebase/auth";

const auth = getAuth();

/**
 * 댓글 데이터 조회
 */
export const fetchCommentData = async (
  commentId: string
): Promise<ICommentData | undefined> => {
  try {
    const commentsDoc = doc(db, `comments/${commentId}`);
    const res = await getDoc(commentsDoc);
    const data = res.data();
    return data as ICommentData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
/**
 * 댓글 첫 페이지 조회
 */
export const fetchFirstPageCommentData = async (
  postId: string,
  pagePerData: number
) => {
  try {
    // 게시물 확인 및 예외처리
    const postDoc = doc(db, `post/${postId}`);
    const postDocSnapshot = await getDoc(postDoc);
    if(!postDocSnapshot.exists()){
      throw new Error("게시물이 존재하지 않습니다.");
    }

    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      orderBy("createdAt", "desc"),
      where("postId", "==", postId),
      limit(pagePerData)
    );
    const commentDoc = await getDocs(q);
    const data = commentDoc.docs.map((el) => el.data());
    if (data.length > 0) {
      const userRef = collection(db, "user");
      const userUid: string[] = [...data].map((item) => item.uid);
      const userQuery = query(userRef, where("uid", "in", userUid));
      const res = await getDocs(userQuery);
      const uidData: IUserData[] = res.docs.map((el) => {
        return { uid: el.id, ...el.data() };
      });

      for (let i = 0; i < data.length; i++) {
        const userData = uidData.find(
          (userData) => userData.uid === data[i].uid
        );
        if (userData) {
          data[i].displayName = userData.displayName;
          data[i].photoURL = userData.photoURL;
        }
      }
    }

    return { commentDoc, data: data as ICommentData[] };
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
  postId: string,
  pagePerData: number
) => {
  try {
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      orderBy("createdAt", "desc"),
      where("postId", "==", postId),
      startAfter(page),
      limit(pagePerData)
    );
    const commentDoc = await getDocs(q);
    const data = commentDoc.docs.map((el) => el.data());

    if (data.length > 0) {
      const userRef = collection(db, "user");
      const userUid: string[] = [...data].map((item) => item.uid);
      const userQuery = query(userRef, where("uid", "in", userUid));
      const res = await getDocs(userQuery);
      const uidData: IUserData[] = res.docs.map((el) => {
        return { uid: el.id, ...el.data() };
      });

      for (let i = 0; i < data.length; i++) {
        const userData = uidData.find(
          (userData) => userData.uid === data[i].uid
        );
        if (userData) {
          data[i].displayName = userData.displayName;
          data[i].photoURL = userData.photoURL;
        }
      }
    }

    return { commentDoc, data: data as ICommentData[] };
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
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${commentData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    // 결과 확인 및 예외 처리
    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // comment colledcion에 댓글 doc 추가
    const commentsRef = collection(db, "comments");
    const addCommentPromise = setDoc(
      doc(commentsRef, commentData.commentId),
      commentData
    );

    // 게시물 doc에 commenCount 늘리기
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
  commentEditData: Pick<ICommentData, "commentId" | "content" | "postId">
) => {
  try {
    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${commentEditData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${commentEditData.commentId}`);
    tasks.push(getDoc(commentDoc));

    // 모든 작업을 병렬로 실행하고 결과 배열을 얻습니다.
    const results = await Promise.all(tasks);

    // 결과 확인 및 예외 처리
    if (!results[0].exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    if (!results[1].exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

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
    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${commentData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${commentData.commentId}`);
    tasks.push(getDoc(commentDoc));

    // 모든 작업을 병렬로 실행하고 결과 배열을 얻습니다.
    const results = await Promise.all(tasks);

    // 결과 확인 및 예외 처리
    if (!results[0].exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    if (!results[1].exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    // 댓글 삭제
    const commentsDoc = doc(db, `comments/${commentData.commentId}`);
    const removeCommentPromise = deleteDoc(commentsDoc);

    // 게시물 doc에서 commentCount 줄이기
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
    if (!auth.currentUser) return;

    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${reportCommentData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${reportCommentData.commentId}`);
    tasks.push(getDoc(commentDoc));

    // 모든 작업을 병렬로 실행하고 결과 배열을 얻습니다.
    const results = await Promise.all(tasks);

    // 결과 확인 및 예외 처리
    if (!results[0].exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    if (!results[1].exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    const addReportCountPromise = await updateDoc(commentDoc, {
      reportCount: increment(1),
      isBlock: reportCommentData.reportCount >= 4 ? true : false,
      reportUidList: arrayUnion(auth.currentUser.uid)
    });

    const decreaseCommentCountPromise = [];
    if (reportCommentData.reportCount >= 4) {
      const postDoc = doc(db, `post/${reportCommentData.postId}`);
      decreaseCommentCountPromise.push(
        updateDoc(postDoc, {
          commentCount: increment(-1)
        })
      );
    }

    await Promise.all([addReportCountPromise, decreaseCommentCountPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
