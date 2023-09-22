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
  updateDoc,
  where
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "./setting";
import { getAuth } from "firebase/auth";
import { IPostData, IPostUploadData, IUserData } from "../apiType";
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
  try {
    const postDoc = doc(db, `post/${postId}`);
    const res = await getDoc(postDoc);
    const data = res.data();

    if (data) {
      const userRef = collection(db, "user");
      const userQuery = query(userRef, where("uid", "==", data.uid));
      const res = await getDocs(userQuery);
      const uidData: IUserData[] = res.docs.map((el) => {
        return { uid: el.id, ...el.data() };
      });
      const userInfo = uidData.find((userData) => userData.uid === data.uid);
      data.displayName = userInfo?.displayName;
      data.photoURL = userInfo?.photoURL;
    }
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 첫 페이지
 */
export const fetchFirstPagePostData = async (pagePerDate: number) => {
  try {
    const postRef = collection(db, "post");
    const q = query(postRef, orderBy("createdAt", "desc"), limit(pagePerDate));
    const postDocs = await getDocs(q);
    const data = postDocs.docs.map((el) => el.data());

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

    return { postDocs, data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 페이징 데이터
 */
export const fetchPagingPostData = async (
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  pagePerDate: number
) => {
  try {
    const postRef = collection(db, "post");
    const q = query(
      postRef,
      orderBy("createdAt", "desc"),
      startAfter(page),
      limit(pagePerDate)
    );
    const postDocs = await getDocs(q);
    const data = postDocs.docs.map((el) => el.data());
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
    return { postDocs, data };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 업로드 함수
 */
export const fetchUploadPost = async (
  postData: Omit<IPostUploadData, "img"> // img는 쓰이지 않기 때문에 Omit 타입으로 빼줌
) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 이미지 업로드 함수
 * @return 업로드 결과 fileInfo = {url, filename} 객체를 반환
 */
export const fetchPostImg = async (files: File[]) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
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
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 삭제
 */
export const fetchRemovePost = async (postData: IPostData) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 좋아요 추가
 */
export const fetchAddPostLike = async (id: string) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 좋아요 삭제
 */
export const fetchRemovePostLike = async (id: string) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 맛집 지도 추가
 */
export const fetchAddPostMap = async (postData: IPostData) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 맛집 지도 삭제
 */
export const fetchRemovePostMap = async (postData: IPostData) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 게시물 신고
 */
export const fetchReportPost = async (postData: IPostData) => {
  try {
    const postDoc = doc(db, `post/${postData.id}`);
    const removePostPromise = updateDoc(postDoc, {
      reportCount: increment(1),
      isBlock: postData.reportCount && postData.reportCount >= 4 ? true : false
    });
    if (!auth.currentUser) return;
    const userDoc = doc(db, `user/${auth.currentUser.uid}`);
    const addUserReportListPromise = updateDoc(userDoc, {
      reportPostList: arrayUnion(postData.id)
    });

    await Promise.all([removePostPromise, addUserReportListPromise]);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
