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
  arrayRemove,
} from "firebase/firestore";
import { db } from "./setting";
import { IProfileData, IPostData, IUserData, IFollowData } from "../apiType";

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
    return data;
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
  // 나의 프로필 Doc에 followList에 해당 유저의 uid 추가
  const myProfileDoc = doc(db, `user/${myUid}`);
  const folloerListRef = collection(myProfileDoc, `follower`);
  const addFollowerListDocPromise = setDoc(doc(folloerListRef, userUid), {
    uid: userUid
  });
  const addFollowerListPromise = updateDoc(myProfileDoc, {
    followerList: arrayUnion(userUid)
  });

  // 팔로우한 유저 프로필 Doc에 followingList에 나의 uid 추가
  const userProfileDoc = doc(db, `user/${userUid}`);
  const followingListRef = collection(userProfileDoc, `following`);
  const addFollowingListDocPromise = setDoc(doc(followingListRef, myUid), {
    uid: myUid
  });
  const addFollowingListPromise = updateDoc(userProfileDoc, {
    followingList: arrayUnion(myUid)
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
  // 나의 프로필 Doc에 followList에 해당 유저의 uid 제거
  const myProfileDoc = doc(db, `user/${myUid}`);
  const followerDoc = doc(myProfileDoc, `follower/${userUid}`);
  const removeFollowerDocPromise = deleteDoc(followerDoc);
  const removeFollowerListPromise = updateDoc(myProfileDoc, {
    followerList: arrayRemove(userUid)
  });

  // 팔로우한 유저 프로필 Doc에 followingList에 나의 uid 제거
  const userProfileDoc = doc(db, `user/${userUid}`);
  const followingDoc = doc(userProfileDoc, `following/${myUid}`);
  const removeFollowingDocPromise = deleteDoc(followingDoc);
  const removeFollowingListPromise = updateDoc(userProfileDoc, {
    followingList: arrayRemove(myUid)
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
      return { uid: el.id, ...el.data() };
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
      return { uid: el.id, ...el.data() };
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
      return { uid: el.id, ...el.data() };
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
  const followingRef = collection(userDoc, "follower");
  const q = query(followingRef, startAfter(page), limit(pagePerData));
  const followingDocs = await getDocs(q);
  const data = followingDocs.docs.map((el) => el.data());

  if (data.length > 0) {
    const userRef = collection(db, "user");
    const userUid: string[] = [...data].map((item) => item.uid);
    const userQuery = query(userRef, where("uid", "in", userUid));
    const res = await getDocs(userQuery);
    const uidData: IUserData[] = res.docs.map((el) => {
      return { uid: el.id, ...el.data() };
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
