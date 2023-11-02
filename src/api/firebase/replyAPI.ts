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
  where,
  getDoc
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
    // 댓글 확인 및 예외처리
    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const commentDocSnapShot = await getDoc(commentDoc);
    if(!commentDocSnapShot.exists()){
      throw new Error("댓글이 존재하지 않습니다.")
    }

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
        return { uid: el.id, ...el.data() as Omit<IUserData, "uid"> };
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
        return { uid: el.id, ...el.data() as Omit<IUserData, "uid"> };
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
    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyCommentData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyCommentData.parentCommentId}`);
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
  replyEditData: Pick<
    IReplyData,
    "parentCommentId" | "replyId" | "content" | "postId"
  >
) => {
  try {
    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyEditData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyEditData.parentCommentId}`);
    tasks.push(getDoc(commentDoc));

    // 답글 확인 작업 추가
    const replyDoc = doc(commentDoc, `replies/${replyEditData.replyId}`);
    tasks.push(getDoc(replyDoc));

    // 모든 작업을 병렬로 실행하고 결과 배열을 얻습니다.
    const results = await Promise.all(tasks);

    // 결과 확인 및 예외 처리
    if (!results[0].exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    if (!results[1].exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    if (!results[2].exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }

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
  replyRemoveData: Pick<IReplyData, "parentCommentId" | "replyId" | "postId">
) => {
  try {
    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyRemoveData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyRemoveData.parentCommentId}`);
    tasks.push(getDoc(commentDoc));

    // 답글 확인 작업 추가
    const replyDoc = doc(commentDoc, `replies/${replyRemoveData.replyId}`);
    tasks.push(getDoc(replyDoc));

    // 모든 작업을 병렬로 실행하고 결과 배열을 얻습니다.
    const results = await Promise.all(tasks);

    // 결과 확인 및 예외 처리
    if (!results[0].exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    if (!results[1].exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    if (!results[2].exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }

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
    "replyId" | "parentCommentId" | "reportCount" | "postId"
  >
) => {
  try {
    // 병렬 처리할 비동기 작업 배열 생성
    const tasks = [];

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyReportData.postId}`);
    tasks.push(getDoc(postDoc));

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyReportData.parentCommentId}`);
    tasks.push(getDoc(commentDoc));

    // 답글 확인 작업 추가
    const replyDoc = doc(commentDoc, `replies/${replyReportData.replyId}`);
    tasks.push(getDoc(replyDoc));

    // 모든 작업을 병렬로 실행하고 결과 배열을 얻습니다.
    const results = await Promise.all(tasks);

    // 결과 확인 및 예외 처리
    if (!results[0].exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    if (!results[1].exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    if (!results[2].exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }

    const replySnapShot = await getDoc(replyDoc);
    if (!replySnapShot.exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }
    if(!auth.currentUser) return;
    const addReportCountPromise = await updateDoc(replyDoc, {
      reportCount: increment(1),
      isBlock: replyReportData.reportCount >= 4 ? true : false,
      reportUidList: arrayUnion(auth.currentUser.uid)
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

    await Promise.all([addReportCountPromise, ...decreaseReplyCountPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
