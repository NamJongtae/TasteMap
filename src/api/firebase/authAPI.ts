import { getAuth, onAuthStateChanged } from "firebase/auth";
import { IUserData } from "../../types/apiTypes";

export const fetchAuth = async (): Promise<IUserData> => {
  try {
    const auth = getAuth();
    const myInfo = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve({
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email
        });
      });
    });
    if ((myInfo as IUserData).uid) {
      localStorage.setItem("user", JSON.stringify(myInfo));
      return myInfo as IUserData;
    } else {
      return {} as IUserData;
    }
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
