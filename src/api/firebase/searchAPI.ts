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
import { IProfileData } from "../apiType";

export const fetchSearchFirstPageData = async (
  keyword: string,
  limitPage: number
): Promise<
  | {
      userDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IProfileData[];
    }
  | undefined
> => {
  const userRef = collection(db, "user");

  const q = query(
    userRef,
    where("displayName", ">=", keyword.toLowerCase()),
    where("displayName", "<=", keyword.toLowerCase() + "\uf8ff"),
    orderBy("displayName", "asc"),
    limit(limitPage)
  );
  try {
    const res = await getDocs(q);
    const data = res.docs.map((el) => el.data() as IProfileData);
    return { userDocs: res, data};
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const fetchSearchPagingData = async (
  keyword: string,
  page: QueryDocumentSnapshot<DocumentData, DocumentData>,
  limitPage: number
): Promise<
  | {
      userDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IProfileData[];
    }
  | undefined
> => {
  const userRef = collection(db, "user");
  const q = query(
    userRef,
    where("displayName", ">=", keyword.toLowerCase()),
    where("displayName", "<=", keyword.toLowerCase() + "\uf8ff"),
    orderBy("displayName", "asc"),
    startAfter(page),
    limit(limitPage)
  );
  const res = await getDocs(q);
  const data = res.docs.map((el) => el.data());
  return { userDocs: res, data: data as IProfileData[] };
};
