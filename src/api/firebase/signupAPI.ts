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

const auth = getAuth();
// 회원가입 API
export const signup = async (
  displayName: string,
  file: File | "",
  email: string,
  password: string,
  phone: string,
  introduce: string
): Promise<{
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | undefined;
}> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
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
