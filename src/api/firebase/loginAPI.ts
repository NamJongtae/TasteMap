import { collection, doc, setDoc, getDoc, Timestamp } from "firebase/firestore";
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
      1500
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
          displayName: displayName?.toLowerCase(),
          photoURL
        });

        const userRef = collection(db, "user");
        await setDoc(doc(userRef, `${user.uid}`), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName?.toLowerCase(),
          photoURL: user.photoURL || process.env.REACT_APP_DEFAULT_PROFILE_IMG,
          phone: "",
          postList: [],
          likeList: [],
          storedMapList: [],
          followerList: [],
          followingList: [],
          photoFileName: "",
          introduce: "",
          createdAt: Timestamp.fromDate(new Date())
        });
      }
    }
  } catch (error: any) {
    if (
      error.message.includes(
        "Firebase: Error (auth/cancelled-popup-request)."
      ) ||
      error.message.includes("Firebase: Error (auth/popup-closed-by-user).")
    ) {
      return;
    }
    console.log(error);
    throw error;
  }
};

export const fetchLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
