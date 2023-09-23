import {
  DocumentData,
  QueryDocumentSnapshot,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  updateDoc,
  where
} from "firebase/firestore";
import { db } from "./setting";
import { IProfileData, IPostData, IUserData } from "../apiType";

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
    const q = query(postRef, where("uid", "==", uid), limit(pagePerData));
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
  const addFollowerListPromise = updateDoc(myProfileDoc, {
    followerList: arrayUnion(userUid)
  });

  // 팔로우한 유저 프로필 Doc에 followingList에 나의 uid 추가
  const userProfileDoc = doc(db, `user/${userUid}`);
  const addFollowingListPromise = updateDoc(userProfileDoc, {
    followingList: arrayUnion(myUid)
  });

  await Promise.all([addFollowerListPromise, addFollowingListPromise]);
};
/**
 * 언팔로우
 */
export const fetchUnfollow = async (myUid: string, userUid: string) => {
  // 나의 프로필 Doc에 followList에 해당 유저의 uid 제거
  const userDoc = doc(db, `user/${myUid}`);
  const removeFollowerListPromise = updateDoc(userDoc, {
    followerList: arrayRemove(userUid)
  });

 // 팔로우한 유저 프로필 Doc에 followingList에 나의 uid 제거
  const userProfileDoc = doc(db, `user/${userUid}`);
  const removeFollowingListPromise = updateDoc(userProfileDoc, {
    followingList: arrayRemove(myUid)
  });

  await Promise.all([removeFollowerListPromise, removeFollowingListPromise]);
};
