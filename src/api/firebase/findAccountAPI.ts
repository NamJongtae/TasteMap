import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { db } from "./setting";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";

const auth = getAuth();

const changeFormateDate = (dateObject: Date) => {
  return `${dateObject.getFullYear()}-${String(
    dateObject.getMonth() + 1
  ).padStart(2, "0")}-${String(dateObject.getDate()).padStart(2, "0")}`;
};
// 이메일 찾기 API
export const fetchFindEmail = async (displayName: string, phone: string) => {
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
      sweetToast("일치하는 정보가 없습니다!", "warning");
      return {};
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 비밀번호 변경 API
export const fetchChangePassword = async (email: string, phone: string) => {
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
      sweetToast("일치하는 정보가 없습니다!", "warning");
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
