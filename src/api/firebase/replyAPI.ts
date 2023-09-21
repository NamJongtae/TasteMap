import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  setDoc,
  updateDoc,
  increment,
  deleteDoc,
  arrayUnion,
  limit,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter
} from "firebase/firestore";
import { IReplyData } from "../apiType";
import { db } from "./setting";
import { getAuth } from "firebase/auth";

const auth = getAuth();

/**
 * 답글 첫 페이지 조회
 */
export const fetchFirstPageReplyData = async (
  parentCommentId: string, pagePerData:number
) => {
  try {
    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const replyRef = collection(commentDoc, "replies");
    const q = query(
      replyRef,
      orderBy("createdAt", "desc"),
      limit(pagePerData),
    );
    const replyDoc = await getDocs(q);
    const data = replyDoc.docs.map((el) => el.data());

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

    return {replyDoc, data: data as IReplyData[]};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 페이징
 */
export const fetchPagingReplyData = async (
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  parentCommentId: string, pagePerData:number
) => {
  try {
    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const replyRef = collection(commentDoc, `replies`);
    const q = query(
      replyRef,
      orderBy("createdAt", "desc"),
      startAfter(page),
      limit(pagePerData),
    );
    const replyDoc = await getDocs(q);
    const data = replyDoc.docs.map((el) => el.data());

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

    return {replyDoc, data: data as IReplyData[]};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchReplyListData = async (
  parentCommentId: string
): Promise<IReplyData[]> => {
  try {
    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const replyRef = collection(commentDoc, `replies`);
    const q = query(replyRef, orderBy("createdAt", "desc"));
    const res = await getDocs(q);
    const data = res.docs.map((el) => el.data());

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

    return data as IReplyData[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 추가
 */
export const fetchAddReply = async (replyCommentData: IReplyData) => {
  try {
    const commentDoc = doc(db, `comments/${replyCommentData.parentCommentId}`);
    const replyRef = collection(commentDoc, "replies");
    // 댓글 데이터 subCollection replies에 답글 Doc 추가
    const addReplyCommentProimse = setDoc(
      doc(replyRef, replyCommentData.replyId),
      { ...replyCommentData }
    );

    // 댓글 데이터 답글 수 늘리기
    const addReplyCountPromise = updateDoc(commentDoc, {
      replyCount: increment(1)
    });

    await Promise.all([addReplyCommentProimse, addReplyCountPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 수정
 */
export const fetchEditReply = async (
  replyEditData: Pick<IReplyData, "parentCommentId" | "replyId" | "content">
) => {
  try {
    const commentDoc = doc(db, `comments/${replyEditData.parentCommentId}`);
    const replyDoc = doc(commentDoc, `replies/${replyEditData.replyId}`);
    // 답글 doc의 content 수정
    await updateDoc(replyDoc, {
      content: replyEditData.content
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 삭제
 */
export const fetchRemoveReply = async (
  replyEditData: Pick<IReplyData, "parentCommentId" | "replyId">
) => {
  try {
    const commentDoc = doc(db, `comments/${replyEditData.parentCommentId}`);
    const replyDoc = doc(commentDoc, `replies/${replyEditData.replyId}`);
    // 답글 doc 삭제
    const removeReplyPromise = deleteDoc(replyDoc);

    // 댓글 doc의 replyCount 줄이기
    const decreaseReplyCountPromise = updateDoc(commentDoc, {
      replyCount: increment(-1)
    });

    await Promise.all([removeReplyPromise, decreaseReplyCountPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 신고
 */
export const fetchReportReply = async (
  replyReportData: Pick<IReplyData, "replyId" | "parentCommentId" | "reportCount">
) => {
  try {
    const commentDoc = doc(db, `comments/${replyReportData.parentCommentId}`);
    const replyDoc = doc(commentDoc, `replies/${replyReportData.replyId}`);
    const addReportCountPromise = await updateDoc(replyDoc, {
      reportCount: increment(1),
      isBlock: replyReportData.reportCount >= 4 ? true : false
    });

    const decreaseReplyCountPromise = []
    if (replyReportData.reportCount >= 4) {
      const commentDoc = doc(db, `comments/${replyReportData.parentCommentId}`);
      decreaseReplyCountPromise.push(updateDoc(commentDoc, {
        replyCount: increment(-1)
      }));
    }

    if (!auth.currentUser) return;
    const userDoc = doc(db, `user/${auth.currentUser.uid}`);
    const addReportListPromise = updateDoc(userDoc, {
      reportReplyList: arrayUnion(replyReportData.replyId)
    });

    await Promise.all([addReportCountPromise, addReportListPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
