import { createSlice } from "@reduxjs/toolkit";
import { ICommentData } from "../types/apiTypes";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    comments: [] as ICommentData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    hasMore: false,
    postId: "",
    isOpenCommentModal: false
  },
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setIsOpenCommentModal: (state, action: { payload: boolean }) => {
      if (action.payload) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      state.isOpenCommentModal = action.payload;
    }
  }
});
