import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IKnownError, IReplyData } from "../api/apiType";
import {
  fetchAddReply,
  fetchEditReply,
  fetchFirstPageReplyData,
  fetchPagingReplyData,
  fetchRemoveReply,
  fetchReportReply
} from "../api/firebase/replyAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { RootState } from "../store/store";
import { commentSlice } from "./commentSlice";
import { postSlice } from "./postSlice";

// 답글 첫 페이지 조회
export const thunkFetchFirstPageReplyData = createAsyncThunk<
  | {
      replyDoc: QuerySnapshot<DocumentData, DocumentData>;
      data: IReplyData[];
    }
  | undefined,
  { parentCommentId: string; pagePerData: number },
  { rejectValue: IKnownError }
>(
  "replySlice/thunkFetchFirstPageReplyData",
  async ({ parentCommentId, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchFirstPageReplyData(parentCommentId, pagePerData);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 답글 페이징
export const thunkFetchPagingReplyData = createAsyncThunk<
  | {
      replyDoc: QuerySnapshot<DocumentData, DocumentData>;
      data: IReplyData[];
    }
  | undefined,
  {
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    parentCommentId: string;
    pagePerData: number;
  },
  { rejectValue: IKnownError }
>(
  "replySlice/thunkFetchPagingReplyData",
  async ({ page, parentCommentId, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchPagingReplyData(
        page,
        parentCommentId,
        pagePerData
      );
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 답글 추가
 */
export const thunkFetchAddReply = createAsyncThunk<
  IReplyData | undefined,
  IReplyData,
  { rejectValue: IKnownError }
>("replySlice/thunkFetchAddReply", async (replyData, thunkAPI) => {
  try {
    await fetchAddReply(replyData);
    return replyData;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "댓글이 존재하지 않습니다.") {
      const comments = state.comment.comments;
      const newCommentListData = [...comments].filter(
        (item) => item.commentId !== replyData.parentCommentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    } else if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter((item) => item.id !== replyData.postId);
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 수정
 */
export const thunkFetchEditReply = createAsyncThunk<
  Pick<IReplyData, "parentCommentId" | "replyId" | "content"> | undefined,
  Pick<IReplyData, "parentCommentId" | "replyId" | "content" | "postId">,
  { rejectValue: IKnownError }
>("replySlice/thunkFetchEditReply", async (replyEditData, thunkAPI) => {
  try {
    await fetchEditReply(replyEditData);
    return replyEditData;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "답글이 존재하지 않습니다.") {
      // 해당 답글 삭제
      const replies = state.reply.replies;
      const newReplyData = [...replies].filter(
        (item) => item.replyId !== replyEditData.replyId
      );
      dispatch(replySlice.actions.setReplies(newReplyData));
      // 답글 수 감소
      const comments = state.comment.comments;
      const newComments = [...comments];
      const index = newComments.findIndex(
        (v) => v.commentId === replyEditData.parentCommentId
      );
      newComments[index] = {
        ...newComments[index],
        replyCount: newComments[index].replyCount || 0 - 1
      };
      dispatch(replySlice.actions.setReplies(newComments));
    }
    else if (error.message === "댓글이 존재하지 않습니다.") {
      const comments = state.comment.comments;
      const newCommentListData = [...comments].filter(
        (item) => item.commentId !== replyEditData.parentCommentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    } else if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter(
        (item) => item.id !== replyEditData.postId
      );
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 삭제
 */
export const thunkFetchRemoveReply = createAsyncThunk<
  Pick<IReplyData, "parentCommentId" | "replyId"> | undefined,
  Pick<IReplyData, "parentCommentId" | "replyId" | "postId">,
  { rejectValue: IKnownError }
>("replySlice/thunkFetchRemoveReply", async (replyRemoveData, thunkAPI) => {
  try {
    await fetchRemoveReply(replyRemoveData);
    return replyRemoveData;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "답글이 존재하지 않습니다.") {
      // 해당 답글 삭제
      const replies = state.reply.replies;
      const newReplyData = [...replies].filter(
        (item) => item.replyId !== replyRemoveData.replyId
      );
      dispatch(replySlice.actions.setReplies(newReplyData));
      // 답글 수 감소
      const comments = state.comment.comments;
      const newComments = [...comments];
      const index = newComments.findIndex(
        (v) => v.commentId === replyRemoveData.parentCommentId
      );
      newComments[index] = {
        ...newComments[index],
        replyCount: newComments[index].replyCount || 0 - 1
      };
      dispatch(replySlice.actions.setReplies(newComments));
    }
    else if (error.message === "댓글이 존재하지 않습니다.") {
      const comments = state.comment.comments;
      const newCommentListData = [...comments].filter(
        (item) => item.commentId !== replyRemoveData.parentCommentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    } else if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter(
        (item) => item.id !== replyRemoveData.postId
      );
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 신고
 */
export const thunkFetchReportReply = createAsyncThunk<
  | (Pick<IReplyData, "replyId" | "parentCommentId" | "reportCount"> & {
      uid: string | undefined;
    })
  | undefined,
  Pick<IReplyData, "replyId" | "parentCommentId" | "reportCount" | "postId"> & {
    uid: string | undefined;
  },
  { rejectValue: IKnownError }
>("replySlice/thunkFetchReportReply", async (reportReplyData, thunkAPI) => {
  try {
    await fetchReportReply(reportReplyData);
    return reportReplyData;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "답글이 존재하지 않습니다.") {
      // 해당 답글 삭제
      const replies = state.reply.replies;
      const newReplyData = [...replies].filter(
        (item) => item.replyId !== reportReplyData.replyId
      );
      dispatch(replySlice.actions.setReplies(newReplyData));
      // 답글 수 감소
      const comments = state.comment.comments;
      const newComments = [...comments];
      const index = newComments.findIndex(
        (v) => v.commentId === reportReplyData.parentCommentId
      );
      newComments[index] = {
        ...newComments[index],
        replyCount: newComments[index].replyCount || 0 - 1
      };
      dispatch(replySlice.actions.setReplies(newComments));
    }
    else if (error.message === "댓글이 존재하지 않습니다.") {
      const comments = state.comment.comments;
      const newCommentListData = [...comments].filter(
        (item) => item.commentId !== reportReplyData.parentCommentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    } else if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter(
        (item) => item.id !== reportReplyData.postId
      );
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

export const replySlice = createSlice({
  name: "replySlice",
  initialState: {
    replies: [] as IReplyData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    hasMore: false,
    parentCommentId: "",
    isOpenReplyModal: false,
    loadReplyLoading: false,
    loadReplyDone: false,
    loadReplyError: "",
    loadMoreReplyLoading: false,
    addReplyLoading: false,
    addReplyDone: false,
    addReplyError: "",
    updateReplyLoading: false,
    updateReplyDone: false,
    updateReplyError: "",
    removeReplyLoading: false,
    removeReplyDone: false,
    removeReplyError: "",
    reportReplyLoading: false,
    reportReplyDone: false,
    reportReplyError: ""
  },
  reducers: {
    setReplies: (state, action) => {
      state.replies = action.payload;
    },
    setParentCommentId: (state, action) => {
      state.parentCommentId = action.payload;
    },
    setIsOpenReplyModal: (state, action) => {
      state.isOpenReplyModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 답글 첫 페이지 조회
    builder.addCase(thunkFetchFirstPageReplyData.pending, (state) => {
      state.loadReplyLoading = true;
      state.loadReplyDone = false;
      state.loadReplyError = "";
    });
    builder.addCase(thunkFetchFirstPageReplyData.fulfilled, (state, action) => {
      state.loadReplyLoading = false;
      state.loadReplyDone = true;
      if (action.payload) {
        state.replies = action.payload.data as IReplyData[];
        state.hasMore =
          (action.payload?.data as IReplyData[]).length % state.pagePerData ===
          0;
        state.page =
          action.payload.replyDoc.docs[action.payload.replyDoc.docs.length - 1];
      }
    });
    builder.addCase(thunkFetchFirstPageReplyData.rejected, (state, action) => {
      state.loadReplyLoading = false;
      if (action.payload) state.loadReplyError = action.payload?.message;
      if (action.payload?.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다.", "warning");
      } else if (action.payload?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.loadReplyError);
    });

    // 답글 페이징
    builder.addCase(thunkFetchPagingReplyData.pending, (state) => {
      state.loadMoreReplyLoading = true;
      state.loadReplyDone = false;
      state.loadReplyError = "";
    });
    builder.addCase(thunkFetchPagingReplyData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.loadMoreReplyLoading = false;
      state.loadReplyDone = true;
      state.replies.push(...(action.payload?.data as IReplyData[]));
      state.page =
        action.payload.replyDoc.docs[action.payload.replyDoc.docs.length - 1];
      state.hasMore = action.payload.data.length % state.pagePerData === 0;
    });
    builder.addCase(thunkFetchPagingReplyData.rejected, (state, action) => {
      if (action.payload) state.loadReplyError = action.payload?.message;
      console.error(state.loadReplyError);
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 답글 추가
    builder.addCase(thunkFetchAddReply.pending, (state) => {
      state.addReplyLoading = true;
      state.addReplyDone = false;
      state.addReplyError = "";
    });
    builder.addCase(thunkFetchAddReply.fulfilled, (state, action) => {
      state.addReplyLoading = false;
      state.addReplyDone = true;
      if (action.payload) {
        state.replies.unshift(action.payload);
        sweetToast("작성이 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchAddReply.rejected, (state, action) => {
      state.addReplyLoading = false;
      if (action.payload) state.addReplyError = action.payload?.message;
      if (action.payload?.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다.", "warning");
      } else if (action.payload?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.addReplyError);
    });

    // 답글 수정
    builder.addCase(thunkFetchEditReply.pending, (state) => {
      state.updateReplyLoading = true;
      state.updateReplyDone = false;
      state.updateReplyError = "";
    });
    builder.addCase(thunkFetchEditReply.fulfilled, (state, action) => {
      state.updateReplyLoading = false;
      state.updateReplyDone = true;
      if (action.payload) {
        const reply = state.replies.find(
          (v) => v.replyId === action.payload?.replyId
        );
        if (reply) reply.content = action.payload.content;
        sweetToast("수정이 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchEditReply.rejected, (state, action) => {
      state.updateReplyLoading = false;
      if (action.payload) state.updateReplyError = action.payload?.message;
      if (action.payload?.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다.", "warning");
      } else if (action.payload?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else if (action.payload?.message === "답글이 존재하지 않습니다.") {
        sweetToast("삭제된 답글입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.updateReplyError);
    });

    // 답글 삭제
    builder.addCase(thunkFetchRemoveReply.pending, (state) => {
      state.removeReplyLoading = true;
      state.removeReplyDone = false;
      state.removeReplyError = "";
    });
    builder.addCase(thunkFetchRemoveReply.fulfilled, (state, action) => {
      state.removeReplyLoading = false;
      state.removeReplyDone = true;
      if (action.payload) {
        state.replies = state.replies.filter(
          (v) => v.replyId !== action.payload?.replyId
        );
        sweetToast("삭제가 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchRemoveReply.rejected, (state, action) => {
      state.removeReplyLoading = false;
      if (action.payload) state.removeReplyError = action.payload?.message;
      if (action.payload?.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다.", "warning");
      } else if (action.payload?.message === "답글이 존재하지 않습니다.") {
        sweetToast("삭제된 답글입니다.", "warning");
      } else if (action.payload?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.removeReplyError);
    });

    // 답글 신고
    builder.addCase(thunkFetchReportReply.pending, (state) => {
      state.reportReplyLoading = true;
      state.reportReplyDone = false;
      state.reportReplyError = "";
    });
    builder.addCase(thunkFetchReportReply.fulfilled, (state, action) => {
      state.reportReplyLoading = false;
      state.reportReplyDone = true;
      const reply = state.replies.find(
        (v) => v.replyId === action.payload?.replyId
      );
      if (!action.payload?.uid) {
        sweetToast("로그인후 이용가능합니다.");
        return;
      }
      if (reply) reply.reportUidList.push(action.payload.uid);
      if (action.payload && action.payload?.reportCount >= 4) {
        const reply = state.replies.find(
          (v) => v.replyId === action.payload?.replyId
        );
        if (reply) reply.isBlock = true;
        sweetToast(
          "신고가 누적되어 답글이 블라인드 처리되었습니다.",
          "info",
          1500
        );
      } else {
        sweetToast("신고가 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchReportReply.rejected, (state, action) => {
      state.reportReplyLoading = false;
      if (action.payload) state.reportReplyError = action.payload?.message;
      if (action.payload?.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다.", "warning");
      } else if (action.payload?.message === "답글이 존재하지 않습니다.") {
        sweetToast("삭제된 답글입니다.", "warning");
      } else if (action.payload?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.reportReplyError);
    });
  }
});
