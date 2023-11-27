import { createSlice } from "@reduxjs/toolkit";
import { IReplyData } from "../api/apiType";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export const replySlice = createSlice({
  name: "replySlice",
  initialState: {
    replies: [] as IReplyData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    parentCommentId: "",
    isOpenReplyModal: false
  },
  reducers: {
    setParentCommentId: (state, action) => {
      state.parentCommentId = action.payload;
    },
    setIsOpenReplyModal: (state, action: { payload: boolean }) => {
      state.isOpenReplyModal = action.payload;
    }
  }
});
