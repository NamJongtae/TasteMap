import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc
} from "firebase/firestore";
import { db, storage } from "./setting";
import { getAuth } from "firebase/auth";
import { IPostData } from "../apiType";
import { deleteObject, ref as storageRef } from "firebase/storage";

const auth = getAuth();
/**
 * 게시물 첫 페이지 
 */
export const fetchFirstPagePostData = async (pagePerDate: number) => {
  const postRef = collection(db, "post");
  const q = query(postRef, orderBy("createdAt", "desc"), limit(pagePerDate));
  const postDocs = await getDocs(q);
  const data = postDocs.docs.map((el) => el.data());

  const userRef = collection(db, "user");
  if (!auth.currentUser) return;
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
  return { postDocs, data };
};

/**
 * 게시물 페이징 데이터 
 */
export const fetchPagingPostData = async (
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  pagePerDate: number
) => {
  const postRef = collection(db, "post");
  const q = query(
    postRef,
    orderBy("createdAt", "desc"),
    startAfter(page),
    limit(pagePerDate)
  );
  const postDocs = await getDocs(q);
  const data = postDocs.docs.map((el) => el.data());

  const userRef = collection(db, "user");
  if (!auth.currentUser) return;
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
  return { postDocs, data };
};

/**
 * 게시물 삭제
 */
export const fetchRemovePost = async (postData: IPostData) => {
  const removeImgPromise = postData.imgName?.map((name) => {
    return deleteObject(storageRef(storage, `images/post/${name}`));
  });

  if (!auth.currentUser) return;
  const userDoc = doc(db, `user/${auth.currentUser.uid}`);
  const removeUserPostList = updateDoc(userDoc, {
    postList: arrayRemove(postData.id)
  });

  const postDoc = doc(db, `post/${postData.id}`);
  const removePost = deleteDoc(postDoc);

  await Promise.all([removeImgPromise, removeUserPostList, removePost]);
};

/**
 * 좋아요 추가
 */
export const fetchAddPostLike = async (id: string) => {
  const postRef = doc(db, `post/${id}`);
  const addLikeCountPromise = updateDoc(postRef, {
    likeCount: increment(1)
  });

  if (!auth.currentUser) return;
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const addUserLikeListPromise = updateDoc(userRef, {
    likeList: arrayUnion(id)
  });
  await Promise.all([addLikeCountPromise, addUserLikeListPromise]);
};

/**
 * 좋아요 삭제
 */
export const fetchRemovePostLike = async (id: string) => {
  const postRef = doc(db, `post/${id}`);
  const removeLikeCountPromise = updateDoc(postRef, {
    likeCount: increment(-1)
  });

  if (!auth.currentUser) return;
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const removeUserLikeListPromise = updateDoc(userRef, {
    likeList: arrayRemove(id)
  });
  await Promise.all([removeLikeCountPromise, removeUserLikeListPromise]);
};

/**
 * 게시물 신고
 */
export const fetchReportPost = async (postData: IPostData) => {
  const postDoc = doc(db, `post/${postData.id}`);
  if (postData.reportCount === undefined) return;
  const removePostPromise = updateDoc(postDoc, {
    reportCount: increment(1),
    isBlock: postData.reportCount >= 4 ? true : false
  });

  if (!auth.currentUser) return;
  const userDoc = doc(db, `user/${auth.currentUser.uid}`);
  const addUserReportListPromise = updateDoc(userDoc, {
    reportList: arrayUnion(postData.id)
  });

  await Promise.all([removePostPromise, addUserReportListPromise]);
};
