import { createSlice } from "@reduxjs/toolkit";
import {
  IPostData,
  IMapData
} from "../api/apiType";
import {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    post: {} as IPostData,
    posts: [] as IPostData[], // 게시물 데이터
    postsPage: {} as QueryDocumentSnapshot<DocumentData>,
    postsPagePerData: 5,
    postsHasMore: false,
    searchMapData: [] as IMapData[], // 검색 데이터
    seletedMapData: [] as IMapData[], // 선택한 검색 데이터,
    userPostsPagePerData: 5,
  },

  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setSelectedMapData: (state, action) => {
      state.seletedMapData = [action.payload];
    },
    resetSelectedMapData: (state) => {
      state.seletedMapData = [] as IMapData[];
    },
    resetSearchMapData: (state) => {
      state.searchMapData = [];
    },
    remove: (state, action) => {
      const newData = [...state.posts].filter(
        (item) => item.id !== action.payload
      );
      state.posts = newData;
    },
  },
});
