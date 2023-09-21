import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './setting';
import { IProfileData } from '../apiType';

const auth = getAuth()
export const fetchProfile = async (): Promise<IProfileData | undefined> => {
  try {
    const user = JSON.parse(localStorage.getItem("user")||"{}")
    const userRef = doc(db, `user/${auth.currentUser&&auth.currentUser.uid||user.uid}`);
    const userDoc = await getDoc(userRef);
    const data = userDoc.data();
    return data;
  } catch(error) {
    console.error(error);
    throw error;
  }
 
}