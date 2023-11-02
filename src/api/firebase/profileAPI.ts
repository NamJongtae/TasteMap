import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  updateDoc,
  where,
  orderBy,
  setDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { v4 as uuid } from "uuid";

import { db, storage } from "./setting";
import {
  IProfileData,
  IPostData,
  IUserData,
  IFollowData,
  IEditProfileData
} from "../apiType";
import {
  UploadResult,
  deleteObject,
  getDownloadURL,
  ref as storageRef,
  uploadBytes
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";

/**
 * 유저 프로필 조회
 */
export const fetchProfile = async (
  uid: string
): Promise<IProfileData | undefined> => {
  try {
    const userRef = doc(db, `user/${uid}`);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data();
    return data as IProfileData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저 프로필 게시물 첫 페이지
 */
export const fetchProfileFirstPageData = async (
  uid: string,
  pagePerData: number
) => {
  try {
    const postRef = collection(db, `post`);
    const q = query(
      postRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      limit(pagePerData)
    );
    const postDocs = await getDocs(q);
    const data = postDocs.docs.map((el) => el.data());

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
    return { postDocs, data: data as IPostData[] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 유저 프로필 게시물 페이징
 */
export const fetchProfilePagingData = async (
  uid: string,
  pagePerData: number,
  page: QueryDocumentSnapshot<DocumentData, DocumentData>
) => {
  try {
    const postRef = collection(db, `post`);
    const q = query(
      postRef,
      where("uid", "==", uid),
      orderBy("createdAt", "desc"),
      startAfter(page),
      limit(pagePerData)
    );
    const postDocs = await getDocs(q);
    const data = postDocs.docs.map((el) => el.data());
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
    return { postDocs, data: data as IPostData[] };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * 팔로우
 */
export const fetchFollow = async (myUid: string, userUid: string) => {
  // 나의 프로필 Doc에 followingList에 해당 유저의 uid 추가
  const myProfileDoc = doc(db, `user/${myUid}`);
  const followingListRef = collection(myProfileDoc, `following`);
  const addFollowingListDocPromise = setDoc(doc(followingListRef, userUid), {
    uid: userUid
  });
  const addFollowerListPromise = updateDoc(myProfileDoc, {
    followingList: arrayUnion(userUid)
  });

  // 팔로우한 유저 프로필 Doc에 followerList에 나의 uid 추가
  const userProfileDoc = doc(db, `user/${userUid}`);
  const followerListRef = collection(userProfileDoc, `follower`);
  const addFollowerListDocPromise = setDoc(doc(followerListRef, myUid), {
    uid: myUid
  });
  const addFollowingListPromise = updateDoc(userProfileDoc, {
    followerList: arrayUnion(myUid)
  });

  await Promise.all([
    addFollowerListPromise,
    addFollowingListPromise,
    addFollowerListDocPromise,
    addFollowingListDocPromise
  ]);
};

/**
 * 언팔로우
 */
export const fetchUnfollow = async (myUid: string, userUid: string) => {
  // 나의 프로필 Doc에 followingList에 해당 유저의 uid 제거
  const myProfileDoc = doc(db, `user/${myUid}`);
  const followingDoc = doc(myProfileDoc, `following/${userUid}`);
  const removeFollowingDocPromise = deleteDoc(followingDoc);
  const removeFollowingListPromise = updateDoc(myProfileDoc, {
    followingList: arrayRemove(userUid)
  });

  // 팔로우한 유저 프로필 Doc에 followerList에 나의 uid 제거
  const userProfileDoc = doc(db, `user/${userUid}`);
  const followerDoc = doc(userProfileDoc, `follower/${myUid}`);
  const removeFollowerDocPromise = deleteDoc(followerDoc);
  const removeFollowerListPromise = updateDoc(userProfileDoc, {
    followerList: arrayRemove(myUid)
  });

  await Promise.all([
    removeFollowerDocPromise,
    removeFollowerListPromise,
    removeFollowingDocPromise,
    removeFollowingListPromise
  ]);
};

/**
 * 팔로워 첫 페이지 목록 조회
 */
export const fetchFirstpageFollowerData = async (
  uid: string,
  pagePerData: number
) => {
  const userDoc = doc(db, `user/${uid}`);
  const followerRef = collection(userDoc, "follower");
  const q = query(followerRef, limit(pagePerData));
  const followerDocs = await getDocs(q);
  const data = followerDocs.docs.map((el) => el.data());

  if (data.length > 0) {
    const userRef = collection(db, "user");
    const userUid: string[] = [...data].map((item) => item.uid);
    const userQuery = query(userRef, where("uid", "in", userUid));
    const res = await getDocs(userQuery);
    const uidData: IUserData[] = res.docs.map((el) => {
      return { uid: el.id, ...(el.data() as Omit<IUserData, "uid">) };
    });

    for (let i = 0; i < data.length; i++) {
      const userData = uidData.find((userData) => userData.uid === data[i].uid);
      if (userData) {
        data[i].displayName = userData.displayName;
        data[i].photoURL = userData.photoURL;
      }
    }
  }

  return { followerDocs, data: data as IFollowData[] };
};

/**
 * 팔로워 페이징
 */
export const fetchPagingFollowerData = async (
  uid: string,
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  pagePerData: number
) => {
  const userDoc = doc(db, `user/${uid}`);
  const followerRef = collection(userDoc, "follower");
  const q = query(followerRef, startAfter(page), limit(pagePerData));
  const followerDocs = await getDocs(q);
  const data = followerDocs.docs.map((el) => el.data());

  if (data.length > 0) {
    const userRef = collection(db, "user");
    const userUid: string[] = [...data].map((item) => item.uid);
    const userQuery = query(userRef, where("uid", "in", userUid));
    const res = await getDocs(userQuery);
    const uidData: IUserData[] = res.docs.map((el) => {
      return { uid: el.id, ...(el.data() as Omit<IUserData, "uid">) };
    });

    for (let i = 0; i < data.length; i++) {
      const userData = uidData.find((userData) => userData.uid === data[i].uid);
      if (userData) {
        data[i].displayName = userData.displayName;
        data[i].photoURL = userData.photoURL;
      }
    }
  }

  return { followerDocs, data: data as IFollowData[] };
};

/**
 * 팔로잉 첫 페이지 목록 조회
 */
export const fetchFirstpageFollowingData = async (
  uid: string,
  pagePerData: number
) => {
  const userDoc = doc(db, `user/${uid}`);
  const followingRef = collection(userDoc, "following");
  const q = query(followingRef, limit(pagePerData));
  const followingDocs = await getDocs(q);
  const data = followingDocs.docs.map((el) => el.data());

  if (data.length > 0) {
    const userRef = collection(db, "user");
    const userUid: string[] = [...data].map((item) => item.uid);
    const userQuery = query(userRef, where("uid", "in", userUid));
    const res = await getDocs(userQuery);
    const uidData: IUserData[] = res.docs.map((el) => {
      return { uid: el.id, ...(el.data() as Omit<IUserData, "uid">) };
    });

    for (let i = 0; i < data.length; i++) {
      const userData = uidData.find((userData) => userData.uid === data[i].uid);
      if (userData) {
        data[i].displayName = userData.displayName;
        data[i].photoURL = userData.photoURL;
      }
    }
  }

  return { followingDocs, data: data as IFollowData[] };
};

/**
 * 팔로잉 페이징
 */
export const fetchPagingFollowingData = async (
  uid: string,
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  pagePerData: number
) => {
  const userDoc = doc(db, `user/${uid}`);
  const followingRef = collection(userDoc, "following");
  const q = query(followingRef, startAfter(page), limit(pagePerData));
  const followingDocs = await getDocs(q);
  const data = followingDocs.docs.map((el) => el.data());

  if (data.length > 0) {
    const userRef = collection(db, "user");
    const userUid: string[] = [...data].map((item) => item.uid);
    const userQuery = query(userRef, where("uid", "in", userUid));
    const res = await getDocs(userQuery);
    const uidData: IUserData[] = res.docs.map((el) => {
      return { uid: el.id, ...(el.data() as Omit<IUserData, "uid">) };
    });

    for (let i = 0; i < data.length; i++) {
      const userData = uidData.find((userData) => userData.uid === data[i].uid);
      if (userData) {
        data[i].displayName = userData.displayName;
        data[i].photoURL = userData.photoURL;
      }
    }
  }

  return { followingDocs, data: data as IFollowData[] };
};

/**
 * 프로필 수정
 */
const auth = getAuth();
export const fetchEditProfile = async (editProfileData: IEditProfileData) => {
  try {
    // 이미지 파일 존재시 이미지 파일을 업로드
    const fileName =
      typeof editProfileData.file !== "string" &&
      editProfileData.file &&
      `${uuid()}_${editProfileData.file.name}`;
    const ImgRes =
      typeof editProfileData.file !== "string" &&
      editProfileData.file &&
      (await uploadBytes(
        storageRef(storage, `images/profile/${fileName}`),
        editProfileData.file
      ));

    const promise = [];
    const uploadfileUrl =
      typeof editProfileData.file !== "string" &&
      editProfileData.file &&
      (await getDownloadURL((ImgRes as UploadResult).ref));
    if (!auth.currentUser) return;
    // 유저 데이터 가져오기
    const userDoc = doc(db, `user/${auth.currentUser.uid}`);
    const userRes = await getDoc(userDoc);
    const user = userRes.data();

    // 이미지 파일 존재 시 기존 프로필 이미지 삭제
    if (
      (typeof editProfileData.file !== "string" ||
        editProfileData.file === "defaultImg") &&
      user &&
      user.photoFileName
    ) {
      if (user.photoURL !== process.env.REACT_APP_DEFAULT_PROFILE_IMG)
        promise.push(
          deleteObject(
            storageRef(storage, `images/profile/${String(user.photoFileName)}`)
          )
        );
    }
    // 수정할 필드를 담을 빈 객체를 만듭니다.
    const updateFields: {
      displayName?: string;
      photoFileName?: string;
      photoURL?: string;
      introduce?: string;
    } = {};
    // displayName 속성이 editProfileData에 존재하면 업데이트 객체에 추가합니다.
    if (editProfileData.displayName) {
      updateFields.displayName = editProfileData.displayName;
    }

    // photoURL 속성이 uploadfileUrl에 존재하면 업데이트 객체에 추가합니다.
    if (uploadfileUrl) {
      updateFields.photoURL = uploadfileUrl;
    } else if (editProfileData.file === "defaultImg") {
      updateFields.photoURL = process.env.REACT_APP_DEFAULT_PROFILE_IMG;
    }
    promise.push(updateProfile(auth.currentUser, updateFields));
    // photoFileName 속성이 fileName에 존재하면 업데이트 객체에 추가합니다.
    if (fileName) {
      updateFields.photoFileName = fileName;
    } else if (editProfileData.file === "defaultImg") {
      updateFields.photoFileName = "icon-defaultProfileImg.png";
    }

    // introduce 속성이 editProfileData에 존재하면 업데이트 객체에 추가합니다.
    if (editProfileData.introduce || editProfileData.introduce === "") {
      updateFields.introduce = editProfileData.introduce;
    }
    promise.push(updateDoc(userDoc, updateFields));
    await Promise.all(promise);
    return {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      displayName: updateFields.displayName || user?.displayName,
      introduce: updateFields.introduce || user?.introduce,
      photoURL: updateFields.photoURL || user?.photoURL
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
