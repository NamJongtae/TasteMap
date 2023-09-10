import { createSlice } from "@reduxjs/toolkit";
import { IPostData } from "../api/firebase/firebaseAPIType";

const dummy: IPostData[] = [
  {
    uid: "aaa",
    displayName: "미식가",
    content: "여기 맛집이네요",
    img: ["/assets/test.jpg"],
    createdAt: new Date("2023-07-07"),
    likeCount: 3,
    commentCount: 3,
    id: "0",
    coords: { x: 35.6031, y: 127.5391 }
  },
  {
    uid: "bbb",
    displayName: "먹깨비",
    content: "여기로 오세요",
    img: ["/assets/asd.jpg"],
    createdAt: new Date("2023-09-08"),
    likeCount: 2,
    commentCount: 1,
    id: "1",
    coords: { x: 35.6031, y: 127.5391 }
  },
  {
    uid: "ccc",
    displayName: "맛집",
    content: "여기 별로네요",
    img: ["/assets/test.jpg"],
    createdAt: new Date("2023-09-09"),
    likeCount: 5,
    commentCount: 3,
    id: "2",
    coords: { x: 35.6031, y: 127.5391 }
  },
  {
    uid: "ddd",
    displayName: "test",
    content: "와우",
    img: ["/assets/test.jpg"],
    createdAt: new Date(),
    likeCount: 5,
    commentCount: 3,
    id: "3",
    coords: { x: 35.6031, y: 127.5391 }
  },
  {
    uid: "eee",
    displayName: "미식가",
    content: "여기 맛집이네요",
    img: [],
    createdAt: new Date("2023-07-07"),
    likeCount: 3,
    commentCount: 3,
    id: "4",
    coords: { x: 35.6031, y: 127.5391 }
  }
];
export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    data: dummy,
    error: "",
    isLoading: ""
  },
  reducers: {
    remove: (state, action) => {
      const newData = [...state.data].filter(
        (item) => item.id !== action.payload
      );
      state.data = newData;
    }
  }
});
