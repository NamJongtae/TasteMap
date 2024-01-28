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
  getDoc,
  QuerySnapshot
} from "firebase/firestore";
import { IReplyData, IUserData } from "../../types/apiTypes";
import { db } from "./setting";
import { getAuth } from "firebase/auth";

const auth = getAuth();

/**
 * 답글 페이징
 */
export const fetchReplies = async (
  page: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  postId: string,
  parentCommentId: string,
  pagePerData: number
): Promise<{
  replyDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IReplyData[];
}> => {
  try {
    const postDoc = doc(db, `post/${postId}`);
    const postDocSnapshot = await getDoc(postDoc);
    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    const commentDoc = doc(db, `comments/${parentCommentId}`);
    const commentDocSnapShot = await getDoc(commentDoc);

    if (!commentDocSnapShot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    const replyRef = collection(commentDoc, `replies`);

    const q = page
      ? query(
          replyRef,
          orderBy("createdAt", "desc"),
          startAfter(page),
          limit(pagePerData)
        )
      : query(replyRef, orderBy("createdAt", "desc"), limit(pagePerData));
    const replyDocs = await getDocs(q);
    const data = replyDocs.docs.map((el) => el.data());
    if (data.length > 0) {
      const userRef = collection(db, "user");
      const userUid: string[] = [...data].map((item) => item.uid);
      const userQuery = query(userRef, where("uid", "in", userUid));
      const res = await getDocs(userQuery);
      const uidData: IUserData[] = res.docs.map((el) => {
        return { uid: el.id, ...(el.data() as Omit<IUserData, "uid">) };
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

    return { replyDocs, data: data as IReplyData[] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 추가
 */
export const leaveReply = async (
  replyData: IReplyData
): Promise<{
  postId: string;
  parentCommentId: string;
}> => {
  try {
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyData.parentCommentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    const replyRef = collection(commentDoc, "replies");
    // 댓글 데이터 subCollection replies에 답글 Doc 추가
    const addReplyCommentProimse = setDoc(doc(replyRef, replyData.replyId), {
      ...replyData
    });

    // 댓글 데이터 답글 수 늘리기
    const addReplyCountPromise = updateDoc(commentDoc, {
      replyCount: increment(1)
    });

    await Promise.all([addReplyCommentProimse, addReplyCountPromise]);

    return {
      postId: replyData.postId,
      parentCommentId: replyData.parentCommentId
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 수정
 */
export const updateReply = async (
  replyData: Pick<
    IReplyData,
    "parentCommentId" | "replyId" | "content" | "postId"
  >
): Promise<{
  postId: string;
  parentCommentId: string;
}> => {
  try {
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyData.parentCommentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    // 답글 확인 작업 추가
    const replyDoc = doc(commentDoc, `replies/${replyData.replyId}`);
    const replyDocSnapshot = await getDoc(replyDoc);

    if (!replyDocSnapshot.exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }

    // 답글 doc의 content 수정
    await updateDoc(replyDoc, {
      content: replyData.content
    });

    return {
      postId: replyData.postId,
      parentCommentId: replyData.parentCommentId
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 삭제
 */
export const removeReply = async (
  replyData: Pick<IReplyData, "parentCommentId" | "replyId" | "postId">
): Promise<{
  postId: string;
  parentCommentId: string;
}> => {
  try {
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyData.parentCommentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    // 답글 확인 작업 추가
    const replyDoc = doc(commentDoc, `replies/${replyData.replyId}`);
    const replyDocSnapshot = await getDoc(replyDoc);

    if (!replyDocSnapshot.exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }

    // 답글 doc 삭제
    const removeReplyPromise = deleteDoc(replyDoc);

    // 댓글 doc의 replyCount 줄이기
    const decreaseReplyCountPromise = updateDoc(commentDoc, {
      replyCount: increment(-1)
    });

    await Promise.all([removeReplyPromise, decreaseReplyCountPromise]);

    return {
      postId: replyData.postId,
      parentCommentId: replyData.parentCommentId
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 답글 신고
 */
export const reportReply = async (
  replyData: Pick<
    IReplyData,
    "replyId" | "parentCommentId" | "reportCount" | "postId"
  >
): Promise<
  | Pick<IReplyData, "parentCommentId" | "replyId" | "postId" | "reportCount">
  | undefined
> => {
  try {
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${replyData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${replyData.parentCommentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    // 답글 확인 작업 추가
    const replyDoc = doc(commentDoc, `replies/${replyData.replyId}`);
    const replyDocSnapshot = await getDoc(replyDoc);

    if (!replyDocSnapshot.exists()) {
      throw new Error("답글이 존재하지 않습니다.");
    }

    if (!auth.currentUser) return;
    const addReportCountPromise = await updateDoc(replyDoc, {
      reportCount: increment(1),
      isBlock: replyData.reportCount >= 4 ? true : false,
      reportUidList: arrayUnion(auth.currentUser.uid)
    });

    const decreaseReplyCountPromise = [];
    if (replyData.reportCount >= 4) {
      const commentDoc = doc(db, `comments/${replyData.parentCommentId}`);
      decreaseReplyCountPromise.push(
        updateDoc(commentDoc, {
          replyCount: increment(-1)
        })
      );
    }

    await Promise.all([addReportCountPromise, ...decreaseReplyCountPromise]);

    return replyData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
