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
  startAfter,
  where
} from "firebase/firestore";
import { IReplyData, IUserData } from "../apiType";
import { db } from "./setting";
import { getAuth } from "firebase/auth";

const auth = getAuth();

/**
 * 답글 첫 페이지 조회
 */
export const fetchFirstPageReplyData = async (
  parentCommentId: string,
  pagePerData: number
) => {
  try {
    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const replyRef = collection(commentDoc, "replies");
    const q = query(replyRef, orderBy("createdAt", "desc"), limit(pagePerData));
    const replyDoc = await getDocs(q);
    const data = replyDoc.docs.map((el) => el.data());

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

    return { replyDoc, data: data as IReplyData[] };
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
  parentCommentId: string,
  pagePerData: number
) => {
  try {
    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const replyRef = collection(commentDoc, `replies`);
    const q = query(
      replyRef,
      orderBy("createdAt", "desc"),
      startAfter(page),
      limit(pagePerData)
    );
    const replyDoc = await getDocs(q);
    const data = replyDoc.docs.map((el) => el.data());
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

    return { replyDoc, data: data as IReplyData[] };
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
  replyReportData: Pick<
    IReplyData,
    "replyId" | "parentCommentId" | "reportCount"
  >
) => {
  try {
    const commentDoc = doc(db, `comments/${replyReportData.parentCommentId}`);
    const replyDoc = doc(commentDoc, `replies/${replyReportData.replyId}`);
    const addReportCountPromise = await updateDoc(replyDoc, {
      reportCount: increment(1),
      isBlock: replyReportData.reportCount >= 4 ? true : false
    });

    const decreaseReplyCountPromise = [];
    if (replyReportData.reportCount >= 4) {
      const commentDoc = doc(db, `comments/${replyReportData.parentCommentId}`);
      decreaseReplyCountPromise.push(
        updateDoc(commentDoc, {
          replyCount: increment(-1)
        })
      );
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
