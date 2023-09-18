import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayRemove,
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
  updateDoc
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "./setting";
import { getAuth } from "firebase/auth";
import { IPostData, IPostUploadData } from "../apiType";
import {
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes
} from "firebase/storage";

const auth = getAuth();

/**
 * 게시물 데이터 조회
 */
export const fetchPostData = async (
  postId: string
): Promise<IPostData | undefined> => {
  const postDoc = doc(db, `post/${postId}`);
  const res = await getDoc(postDoc);
  const data = res.data();

  const userRef = collection(db, "user");
  if (!auth.currentUser) return;
  const userDocs = await getDocs(userRef);
  const userList = userDocs.docs.map((el) => el.data());

  // 게시물 데이터 목록을 반복하면서 사용자 데이터를 연결
  if (data) {
    for (let i = 0; i < userList.length; i++) {
      if (data.uid === userList[i].uid) {
        data.displayName = userList[i].displayName;
        data.photoURL = userList[i].photoURL;
        break;
      }
    }
  }

  return data;
};

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
 * 게시물 업로드 함수
 */
export const fetchUploadPost = async (
  postData: Omit<IPostUploadData, "img"> // img는 쓰이지 않기 때문에 Omit 타입으로 빼줌
) => {
  // post colletion
  const postRef = collection(db, "post");
  // post colletion에 postData Doc 추가
  const addPostPromise = setDoc(doc(postRef, postData.id), postData);

  // 유저에도 post 데이터를 추가
  // user collection
  const userRef = collection(db, "user");
  // 현재 유저가 존재하지 않을 경우 retrun
  if (!auth.currentUser) return;
  // 유저 uid를 통해 Doc 가져오기
  const userDoc = doc(userRef, auth.currentUser.uid);
  // 해당 user의  Doc에 postList 배열에 postData 추가
  const addUserPostListPromise = updateDoc(userDoc, {
    postList: arrayUnion(postData.id)
  });
  // 비동기 처리 동시 수행
  await Promise.all([addPostPromise, addUserPostListPromise]);
};

/**
 * 게시물 이미지 업로드 함수
 * @return 업로드 결과 fileInfo = {url, filename} 객체를 반환
 */
export const fetchPostImg = async (files: File[]) => {
  // files file 수 만큼 이미지 업로드 처리 후 결과를 배열로 만듬
  const uploadPromises = files.map((file) => {
    if (file && file.name) {
      // file 이름에 id 값을 이미지를 삭제시 id 값 사용을 위해서
      const fileName = uuid() + "_" + file.name;
      // 이미지를 fireStore에 업로드
      const uploadTask = uploadBytes(
        storageRef(storage, `images/post/${fileName}`),
        file
      );
      // 업로드한 결과를 받아와서 url과 fileName를 반환
      return uploadTask.then(async (res) => {
        const uploadfileUrl = await getDownloadURL(res.ref);
        return { url: uploadfileUrl, fileName: fileName };
      });
    }
  });

  // 비동기 처리 동시 수행
  const fileInfoArray = await Promise.all(uploadPromises);
  const fileInfo = {
    url: [] as string[],
    filename: [] as string[]
  };

  // 이미지 결과 배열을 순회 요소의 url과 fileName를 filInfo 객체의 url, filename 배열에 추가
  fileInfoArray.forEach((file) => {
    if (file) {
      fileInfo.url.push(file.url);
      fileInfo.filename.push(file.fileName);
    }
  });
  return fileInfo;
};

/**
 * 게시물 수정
 */
export const fetchEditPost = async (
  prevPostData: IPostData,
  editPostData: Pick<
    IPostUploadData,
    "id" | "content" | "rating" | "mapData" | "imgURL" | "imgName" | "img"
  >
) => {
  const postDoc = doc(db, `post/${editPostData.id}`);
  const updatePostPromise = updateDoc(postDoc, { ...editPostData });
  // 게시물 수정 시 기존 이미지가 삭제된다면 해당 이미지 파일을 저장소에서 삭제처리
  const removeImgPromise = [];
  if (editPostData.imgName && prevPostData.imgName) {
    for (let i = 0; i < prevPostData.imgName.length; i++) {
      if (!editPostData.imgName.includes(prevPostData.imgName[i])) {
        removeImgPromise.push(
          deleteObject(
            storageRef(storage, `images/post/${prevPostData.imgName[i]}`)
          )
        );
      }
    }
  }
  await Promise.all([updatePostPromise, ...removeImgPromise]);
};

/**
 * 게시물 삭제
 */
export const fetchRemovePost = async (postData: IPostData) => {
  if (!postData.imgName) return;
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

  await Promise.all([...removeImgPromise, removeUserPostList, removePost]);
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
 * 맛집 지도 추가
 */
export const fetchAddPostMap = async (postData: IPostData) => {
  const postRef = doc(db, `post/${postData.id}`);
  const addLMapCountPromise = updateDoc(postRef, {
    storedMapCount: increment(1)
  });

  if (!auth.currentUser) return;
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const addUserMapListPromise = updateDoc(userRef, {
    storedMapList: arrayUnion(postData.mapData)
  });
  await Promise.all([addLMapCountPromise, addUserMapListPromise]);
};

/**
 * 맛집 지도 삭제
 */
export const fetchRemovePostMap = async (postData: IPostData) => {
  const postRef = doc(db, `post/${postData.id}`);
  const removeMapCountPromise = updateDoc(postRef, {
    storedMapCount: increment(-1)
  });

  if (!auth.currentUser) return;
  const userRef = doc(db, `user/${auth.currentUser.uid}`);
  const removeUserMapListPromise = updateDoc(userRef, {
    storedMapList: arrayRemove(postData.mapData)
  });
  await Promise.all([removeMapCountPromise, removeUserMapListPromise]);
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
