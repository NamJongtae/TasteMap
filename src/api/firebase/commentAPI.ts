import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "./setting";
import { ICommentData } from "../apiType";

/**
 * 댓글 조회
 */
export const fetchCommentList = async (
  postId: string
): Promise<ICommentData[]> => {

  const commentsRef = collection(db, "comments");
  const q = query(
    commentsRef,
    orderBy("createdAt", "desc"),
    where("postId", "==", postId)
  );
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
    data[i].displayName = userData.displayName;
    data[i].photoURL = userData.photoURL;
  }

  return data as ICommentData[];
};

/**
 * 댓글 추가
 */
export const fetchAddComment = async (commentData: ICommentData) => {
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
};

/**
 * 댓글 수정
 */
export const fetchEditComment = async (
  commentEditData: Pick<ICommentData, "commentId" | "content">
) => {
  const commentDoc = doc(db, `comments/${commentEditData.commentId}`);
  await updateDoc(commentDoc, { content: commentEditData.content });
};

/**
 * 댓글 삭제
 */
export const fetchRemoveComment = async (
  commentData: ICommentData
): Promise<void> => {
  // 댓글 삭제
  const commentsDoc = doc(db, `comments/${commentData.commentId}`);
  const removeCommentPromise = deleteDoc(commentsDoc);
  
  // 게시물 doc에서 commentCount 줄이기
  const postDoc = doc(db, `post/${commentData.postId}`);
  const removeCommentCountPromise = updateDoc(postDoc, {
    commentCount: increment(-1)
  });

  await Promise.all([removeCommentPromise, removeCommentCountPromise]);
};


