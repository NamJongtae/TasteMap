import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
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
export const fetchComment = async (
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
 * 댓글 페이징
 */
export const fetchComments = async (
  page: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  postId: string,
  pagePerData: number
): Promise<{
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
}> => {
  try {
    const commentsRef = collection(db, "comments");

    const postDoc = doc(db, `post/${postId}`);
    const postDocSnapshot = await getDoc(postDoc);
    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }
    const q = page
      ? query(
          commentsRef,
          orderBy("createdAt", "desc"),
          where("postId", "==", postId),
          where("isBlock", "==", false),
          startAfter(page),
          limit(pagePerData)
        )
      : query(
          commentsRef,
          orderBy("createdAt", "desc"),
          where("postId", "==", postId),
          where("isBlock", "==", false),
          limit(pagePerData)
        );
    const commentDocs = await getDocs(q);
    const data = commentDocs.docs.map((el) => el.data());

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

    return { commentDocs, data: data as ICommentData[] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 추가
 */
export const leaveComment = async (
  commentData: ICommentData
): Promise<string> => {
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
    const leaveCommentPromise = setDoc(
      doc(commentsRef, commentData.commentId),
      commentData
    );

    // 게시물 doc에 commenCount 늘리기
    const addCommentCountPromise = updateDoc(postDoc, {
      commentCount: increment(1)
    });

    await Promise.all([leaveCommentPromise, addCommentCountPromise]);

    return commentData.postId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 수정
 */
export const updateComment = async (
  commentData: Pick<ICommentData, "commentId" | "content" | "postId">
): Promise<string> => {
  try {
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${commentData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${commentData.commentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    await updateDoc(commentDoc, { content: commentData.content });

    return commentData.postId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 삭제
 */
export const removeComment = async (
  commentData: Pick<ICommentData, "postId" | "commentId">
): Promise<string> => {
  try {
    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${commentData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${commentData.commentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
      throw new Error("댓글이 존재하지 않습니다.");
    }

    // 댓글 삭제
    const commentsDoc = doc(db, `comments/${commentData.commentId}`);
    const removeCommentPromise = deleteDoc(commentsDoc);

    // 댓글 하위 답글 서브컬렉션 삭제
    const repliesCollection = collection(commentDoc, `replies`);
    const deleteRepliesPromise = getDocs(repliesCollection).then(
      (querySnapshot) => {
        const deletePromises: any[] = [];
        querySnapshot.forEach((doc) => {
          deletePromises.push(deleteDoc(doc.ref));
        });
        return Promise.all(deletePromises);
      }
    );

    // 게시물 doc에서 commentCount 줄이기
    const removeCommentCountPromise = updateDoc(postDoc, {
      commentCount: increment(-1)
    });
    await Promise.all([
      removeCommentPromise,
      deleteRepliesPromise,
      removeCommentCountPromise
    ]);

    return commentData.postId;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 댓글 신고
 */
export const reportComment = async (
  reportCommentData: Pick<ICommentData, "postId" | "commentId" | "reportCount">
): Promise<
  Pick<ICommentData, "commentId" | "postId" | "reportCount"> | undefined
> => {
  try {
    if (!auth.currentUser) return;

    // 게시물 확인 작업 추가
    const postDoc = doc(db, `post/${reportCommentData.postId}`);
    const postDocSnapshot = await getDoc(postDoc);

    if (!postDocSnapshot.exists()) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    // 댓글 확인 작업 추가
    const commentDoc = doc(db, `comments/${reportCommentData.commentId}`);
    const commentDocSnapshot = await getDoc(commentDoc);

    if (!commentDocSnapshot.exists()) {
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
    return reportCommentData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
