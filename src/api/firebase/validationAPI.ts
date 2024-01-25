import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./setting";

// 중복검사 API
export const fetchDuplication = async (
  duplicationValue: string,
  duplicationTarget: "email" | "phone" | "displayName"
): Promise<false | undefined> => {
  try {
    const userRef = collection(db, "user");
    const q = query(
      userRef,
      where(duplicationTarget, "==", duplicationValue.toLowerCase())
    );
    const res = await getDocs(q);
    const data = res.docs.map((el) => el.data());
    if (data.length > 0) {
      if (duplicationTarget === "email") {
        throw new Error("이미 사용중인 이메일입니다.");
      }
      if (duplicationTarget === "phone") {
        throw new Error("이미 사용중인 휴대폰 번호입니다.");
      }
      if (duplicationTarget === "displayName") {
        throw new Error("이미 사용중인 닉네임입니다.");
      }
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
