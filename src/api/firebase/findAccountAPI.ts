import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { db } from "./setting";

const auth = getAuth();

const changeFormateDate = (dateObject: Date) => {
  return `${dateObject.getFullYear()}-${String(
    dateObject.getMonth() + 1
  ).padStart(2, "0")}-${String(dateObject.getDate()).padStart(2, "0")}`;
};
// 이메일 찾기 API
export const fetchFindEmail = async (
  displayName: string,
  phone: string
): Promise<{
  email: string;
  createdAt: string;
}> => {
  try {
    const userRef = collection(db, "user");
    const q = query(
      userRef,
      where("displayName", "==", displayName),
      where("phone", "==", phone)
    );
    const res = await getDocs(q);
    const datas = res.docs.map((el) => el.data());
    if (datas.length > 0)
      return {
        email: datas[0].email,
        createdAt: changeFormateDate(datas[0].createdAt.toDate())
      };
    else {
      throw new Error("닉네임 또는 휴대폰 번호가 일치하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 비밀번호 변경 API
export const fetchChangePassword = async (
  email: string,
  phone: string
): Promise<boolean> => {
  try {
    const userRef = collection(db, "user");
    const q = query(
      userRef,
      where("email", "==", email),
      where("phone", "==", phone)
    );
    const res = await getDocs(q);
    const datas = res.docs.map((el) => el.data());
    if (datas.length > 0) {
      sendPasswordResetEmail(auth, email).catch((error) => {
        throw error;
      });
      return true;
    } else {
      throw new Error("이메일 또는 휴대폰 번호가 일치하지 않습니다.");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
