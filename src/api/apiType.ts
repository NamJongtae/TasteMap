import { Timestamp } from "firebase/firestore";

export interface IUserData {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export interface IProfileData {
  uid?: string;
  displayName?: string;
  email?: string;
  photoURL?: string;
  phone?: string;
  introduce?: string;
  createdAt?: Timestamp;
  likeList?: string[];
  postList?: string[];
  storedMapList?: ISearchMapData[];
  reportCommentList?: string[];
  reportReplyList?: string[];
  reportPostList?: string[];
}

export interface IStoredImgData {
  url?: string[];
  filename?: string[];
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
  mapData: ISearchMapData;
  isBlock: boolean;
  imgName: string[];
  imgURL: string[];
  rating: number;
}

export interface IPostData {
  uid?: string;
  displayName?: string;
  photoURL?: string;
  id?: string;
  content?: string;
  imgURL?: string[];
  imgName?: string[];
  createdAt?: Timestamp;
  likeCount?: number;
  commentCount?: number;
  reportCount?: number;
  mapData?: ISearchMapData;
  isBlock?: boolean;
  rating?: number;
}

export interface ISearchMapData {
  address?: string;
  category?: string;
  link?: string;
  mapx?: string;
  mapy?: string;
  roadAddress?: string;
  title?: string;
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
}

export interface IKnownError {
  message: string;
}
