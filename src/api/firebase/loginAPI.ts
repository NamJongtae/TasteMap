import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut
} from "firebase/auth";
import { db } from "./setting";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// 로그인 API
export const fetchLogin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    if (!auth.currentUser) return;
    sweetToast(
      `${auth.currentUser.displayName}님 환영합니다.`,
      "success",
      2000
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchSocialLogin = async (type: string) => {
  try {
    let provider;
    if (type === "google") {
      provider = googleProvider;
    } else if (type === "github") {
      provider = githubProvider;
    }
    if (!provider) return;
    const result = await signInWithPopup(auth, provider);
    if (result) {
      const user = result.user;
      const displayName = user.displayName;
      const photoURL = user.photoURL;
      const isUserRes = await getDoc(doc(db, `user/${user.uid}`));
      const isUser = isUserRes.data();
      if (!isUser) {
        await updateProfile(result.user, {
          displayName,
          photoURL
        });

        const userRef = collection(db, "user");
        await setDoc(doc(userRef, `${user.uid}`), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL || "",
          phone: user.phoneNumber,
          introduce: "",
          likeList: [],
          tasteCoords: [],
          postReportList: [],
          commentReportList: [],
          photoFileName: ""
        });
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchLogout = async () => {
  try{
    await signOut(auth);
  } catch(error) {
    console.log(error);
    throw error;
  }
}
