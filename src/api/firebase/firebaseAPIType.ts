export interface IUserData {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface IPostData {
  uid: string;
  displayName: string;
  id: string;
  content: string;
  img: string[];
  createdAt: Date;
  likeCount: number;
  commentCount: number;
  coords: {x:number, y:number}
}

