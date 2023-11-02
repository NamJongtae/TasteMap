import { Timestamp } from "firebase/firestore";

export interface IUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface IProfileData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  phone: string;
  introduce: string;
  createdAt: Timestamp;
  likeList: string[];
  postList: string[];
  storedMapList: ISearchMapData[];
  followerList: string[];
  followingList: string[];
}

export interface IPostUploadData {
  uid: string;
  id: string;
  content: string;
  img?: File[];
  createdAt: Timestamp;
  likeCount: number;
  commentCount: number;
  reportCount: number;
  reportUidList: string[];
  mapData: ISearchMapData;
  isBlock: boolean;
  imgName: string[];
  imgURL: string[];
  rating: number;
}

export interface IEditPostUploadData {
  id: string;
  content: string;
  rating: number;
  mapData: ISearchMapData;
  img?: File[];
  imgName: string[];
  imgURL: string[];
}

export interface IPostData {
  uid: string;
  displayName: string;
  photoURL: string;
  id: string;
  content: string;
  imgURL: string[];
  imgName: string[];
  createdAt: Timestamp;
  likeCount: number;
  commentCount: number;
  reportCount: number;
  reportUidList: string[];
  mapData: ISearchMapData;
  isBlock: boolean;
  rating: number;
}

export interface ISearchMapData {
  address: string;
  category: string;
  link: string;
  mapx: string;
  mapy: string;
  roadAddress: string;
  title: string;
}

export interface ICommentData {
  commentId: string;
  content: string;
  postId: string;
  createdAt: Timestamp;
  isBlock: boolean;
  uid: string;
  displayName?: string;
  photoURL?: string;
  replies?: IReplyData[];
  replyCount: number;
  reportCount: number;
  reportUidList: string[];
}

export interface IReplyData {
  parentCommentId: string;
  replyId: string;
  content: string;
  postId: string;
  createdAt: Timestamp;
  isBlock: boolean;
  uid: string;
  displayName?: string;
  photoURL?: string;
  reportCount: number;
  reportUidList: string[];
}

export interface IFollowData {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface IEditProfileData {
  displayName: string;
  file: File | string;
  introduce: string;
}

export interface IKnownError {
  message: string;
}
