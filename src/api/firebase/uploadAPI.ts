import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db, storage } from "./setting";
import { IPostUploadData } from "../apiType";
import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL
} from "firebase/storage";
const auth = getAuth();

/**
 * 게시물 업로드 함수
 */
export const fetchUploadPost = async (
  postData: Omit<IPostUploadData, "img"> // img는 쓰이지 않기 때문에 Omit 타입으로 빼줌
) => {
  // post colletion 
  const postRef = collection(db, "post");
  // post colletion에 postData Doc 추가 
  const addPostPromise = setDoc(doc(postRef, postData.id), postData);

  // 유저에도 post 데이터를 추가 
  // user collection
  const userRef = collection(db, "user");
  // 현재 유저가 존재하지 않을 경우 retrun
  if (!auth.currentUser) return;
  // 유저 uid를 통해 Doc 가져오기
  const userDoc = doc(userRef, auth.currentUser.uid);
  // 해당 user의  Doc에 postList 배열에 postData 추가
  const addUserPostListPromise = updateDoc(userDoc, {
    postList: arrayUnion(postData.id)
  });
  // 비동기 처리 동시 수행
  await Promise.all([addPostPromise, addUserPostListPromise]);
};

/**
 * 게시물 이미지 업로드 함수
 * @return 업로드 결과 fileInfo = {url, filename} 객체를 반환
 */
export const fetchPostImg = async (files: File[]) => {
  // files file 수 만큼 이미지 업로드 처리 후 결과를 배열로 만듬
  const uploadPromises = files.map((file) => {
    if (file) {
      // file 이름에 id 값을 이미지를 삭제시 id 값 사용을 위해서
      const fileName = uuid() + "_" + file.name;
      // 이미지를 fireStore에 업로드
      const uploadTask = uploadBytes(
        storageRef(storage, `images/post/${fileName}`),
        file
      );
      // 업로드한 결과를 받아와서 url과 fileName를 반환
      return uploadTask.then(async (res) => {
        const uploadfileUrl = await getDownloadURL(res.ref);
        return { url: uploadfileUrl, fileName: fileName };
      });
    }
  });

  // 비동기 처리 동시 수행
  const fileInfoArray = await Promise.all(uploadPromises);
  const fileInfo = {
    url: [] as string[],
    filename: [] as string[]
  };

  // 이미지 결과 배열을 순회 요소의 url과 fileName를 filInfo 객체의 url, filename 배열에 추가
  fileInfoArray.forEach((file) => {
    if (file) {
      fileInfo.url.push(file.url);
      fileInfo.filename.push(file.fileName);
    }
  });
  return fileInfo;
};
