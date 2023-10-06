import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { db, storage } from "./setting";
import {
  uploadBytes,
  getDownloadURL,
  ref as storageRef
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";

const auth = getAuth();
// 회원가입 API
export const fetchSignup = async (
  displayName: string,
  file: File | "",
  email: string,
  password: string,
  phone: string,
  introduce: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      sweetToast(
        `${displayName}님 환영합니다.`,
        "success",
        1500
      );
    }
    const fileName = file && `${uuidv4()}_${file.name}`;
    const uploadImgURLRes =
      file &&
      (await uploadBytes(
        storageRef(storage, `images/profile/${fileName}`),
        file
      ));
    const photoURL =
      (file &&
        uploadImgURLRes &&
        (await getDownloadURL(uploadImgURLRes.ref))) ||
      process.env.REACT_APP_DEFAULT_PROFILE_IMG;
    await updateProfile(res.user, {
      displayName,
      photoURL
    });

    const user = collection(db, "user");

    await setDoc(doc(user, `${res.user.uid}`), {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL || process.env.REACT_APP_DEFAULT_PROFILE_IMG,
      phone,
      postList: [],
      likeList: [],
      storedMapList: [],
      followerList: [],
      followingList: [],
      photoFileName: fileName || "",
      introduce,
      createdAt: Timestamp.fromDate(new Date())
    });

    return {
      uid: res.user.uid,
      email: res.user.email,
      displayName: res.user.displayName,
      photoURL: res.user.photoURL || process.env.REACT_APP_DEFAULT_PROFILE_IMG
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
