import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where
} from "firebase/firestore";
import { db } from "./setting";
import { IUserProfileData } from "../apiType";

export const fetchUserSearch = async (
  keyword: string,
  page: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  pagePerData: number
): Promise<{
  userDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IUserProfileData[];
}> => {
  const userRef = collection(db, "user");
  const q = page
    ? query(
        userRef,
        where("displayName", ">=", keyword.toLowerCase()),
        where("displayName", "<=", keyword.toLowerCase() + "\uf8ff"),
        orderBy("displayName", "asc"),
        startAfter(page),
        limit(pagePerData)
      )
    : query(
        userRef,
        where("displayName", ">=", keyword.toLowerCase()),
        where("displayName", "<=", keyword.toLowerCase() + "\uf8ff"),
        orderBy("displayName", "asc"),
        limit(pagePerData)
      );
  const res = await getDocs(q);
  const data = res.docs.map((el) => el.data() as IUserProfileData);
  const userProfiles = data.map((profile: IUserProfileData) => ({
    uid: profile.uid,
    displayName: profile.displayName,
    photoURL: profile.photoURL,
    introduce: profile.introduce,
    storedMapList: profile.storedMapList,
    followerList: profile.followerList,
    followingList: profile.followingList
  }));
  return { userDocs: res, data: userProfiles as IUserProfileData[] };
};
