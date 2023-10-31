import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICommentData, IKnownError } from "../api/apiType";
import {
  fetchAddComment,
  fetchCommentData,
  fetchEditComment,
  fetchFirstPageCommentData,
  fetchPagingCommentData,
  fetchRemoveComment,
  fetchReportComment
} from "../api/firebase/commentAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { RootState } from "../store/store";
import { postSlice } from "./postSlice";

/**
 * 댓글 답글 수 업데이트
 */
export const thunkUpdateReplyCount = createAsyncThunk<
  ICommentData | undefined,
  string,
  { rejectValue: IKnownError }
>("commentSlice/thunkUpdateReplyCount", async (commentId: string, thunkAPI) => {
  try {
    const res = await fetchCommentData(commentId);
    return res;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

// 댓글 첫 페이지 조회
export const thunkFetchFirstPageCommentData = createAsyncThunk<
  | {
      commentDoc: QuerySnapshot<DocumentData, DocumentData>;
      data: ICommentData[];
    }
  | undefined,
  { postId: string; pagePerData: number },
  { rejectValue: IKnownError }
>(
  "commentSlice/thunkFetchFirstPageCommentData",
  async ({ postId, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchFirstPageCommentData(postId, pagePerData);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 댓글 페이징
export const thunkFetchPagingCommentData = createAsyncThunk<
  | {
      commentDoc: QuerySnapshot<DocumentData, DocumentData>;
      data: ICommentData[];
    }
  | undefined,
  {
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    postId: string;
    pagePerData: number;
  },
  { rejectValue: IKnownError }
>(
  "commentSlice/thunkFetchPagingCommentData",
  async ({ page, postId, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchPagingCommentData(page, postId, pagePerData);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const thunkFetchAddComment = createAsyncThunk<
  ICommentData | undefined,
  ICommentData,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchAddComment", async (commentData, thunkAPI) => {
  try {
    await fetchAddComment(commentData);
    return commentData;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter(
        (item) => item.id !== commentData.postId
      );
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

export const thunkFetchEditComment = createAsyncThunk<
  Pick<ICommentData, "commentId" | "content"> | undefined,
  Pick<ICommentData, "commentId" | "content" | "postId">,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchEditComment", async (commentEditData, thunkAPI) => {
  try {
    await fetchEditComment(commentEditData);
    return commentEditData;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "댓글이 존재하지 않습니다.") {
      const comments = state.comment.comments;
      const newCommentListData = [...comments].filter(
        (item) => item.commentId !== commentEditData.commentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));
    } else if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter(
        (item) => item.id !== commentEditData.postId
      );
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

export const thunkFetchRemoveComment = createAsyncThunk<
  string | undefined,
  ICommentData,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchRemoveComment", async (commentData, thunkAPI) => {
  try {
    await fetchRemoveComment(commentData);
    return commentData.commentId;
  } catch (error: any) {
    const { dispatch } = thunkAPI;
    const state = thunkAPI.getState() as RootState;
    if (error.message === "댓글이 존재하지 않습니다.") {
      const comments = state.comment.comments;
      const newCommentListData = [...comments].filter(
        (item) => item.commentId !== commentData.commentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));
    } else if (error.message === "게시물이 존재하지 않습니다.") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));

      // 해당 게시물 삭제
      const posts = state.post.posts;
      const newData = [...posts].filter(
        (item) => item.id !== commentData.postId
      );
      dispatch(postSlice.actions.setPosts(newData));
    }
    return thunkAPI.rejectWithValue(error);
  }
});

export const thunkFetchReportComment = createAsyncThunk<
  | (Pick<ICommentData, "commentId" | "reportCount"> & {
      postId: string;
      uid: string | undefined;
    })
  | undefined,
  Pick<ICommentData, "commentId" | "reportCount"> & {
    postId: string;
    uid: string | undefined;
  },
  { rejectValue: IKnownError }
>(
  "commentSlice/thunkFetchReportComment",
  async (reportCommentData, thunkAPI) => {
    try {
      await fetchReportComment(reportCommentData);
      return reportCommentData;
    } catch (error: any) {
      const { dispatch } = thunkAPI;
      const state = thunkAPI.getState() as RootState;
      if (error.message === "댓글이 존재하지 않습니다.") {
        const comments = state.comment.comments;
        const newCommentListData = [...comments].filter(
          (item) => item.commentId !== reportCommentData.commentId
        );
        dispatch(commentSlice.actions.setCommentListData(newCommentListData));
      } else if (error.message === "게시물이 존재하지 않습니다.") {
        // 댓글 모달창 닫기
        document.body.style.overflow = "auto";
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));

        // 해당 게시물 삭제
        const posts = state.post.posts;
        const newData = [...posts].filter(
          (item) => item.id !== reportCommentData.postId
        );
        dispatch(postSlice.actions.setPosts(newData));
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    comments: [] as ICommentData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    hasMore: false,
    postId: "",
    isOpenCommentModal: false,
    loadCommentsLoading: false,
    loadCommentsDone: false,
    loadCommentsError: "",
    loadMoreCommentsLoading: false,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: "",
    updateCommentLoading: false,
    updateCommentDone: false,
    updateCommentError: "",
    reportCommentLoading: false,
    reportCommentDone: false,
    reportCommentError: "",
    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: "",
    updateCommentCountLoading: false,
    updateCommentCountDone: false,
    updateCommentCountError: ""
  },
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setCommentListData: (state, action) => {
      state.comments = action.payload;
    },
    setIsOpenCommentModal: (state, action) => {
      state.isOpenCommentModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 댓글 답글 수 업데이트
    builder.addCase(thunkUpdateReplyCount.pending, (state) => {
      state.updateCommentCountLoading = true;
      state.updateCommentCountDone = false;
      state.updateCommentCountError = "";
    });
    builder.addCase(thunkUpdateReplyCount.fulfilled, (state, action) => {
      state.updateCommentCountLoading = false;
      state.updateCommentCountDone = true;
      if (action.payload) {
        const comment = state.comments.find(
          (v) => v.commentId === action.payload?.commentId
        );
        if (comment) comment.replyCount = action.payload.replyCount;
      }
    });
    builder.addCase(thunkUpdateReplyCount.rejected, (state, action) => {
      if (action.payload)
        state.updateCommentCountError = action.payload?.message;
      state.updateCommentCountLoading = false;
      console.error(state.updateCommentCountError);
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
    });

    // 댓글 첫 페이지 조회
    builder.addCase(thunkFetchFirstPageCommentData.pending, (state) => {
      state.loadCommentsLoading = true;
      state.loadCommentsDone = false;
      state.loadCommentsError = "";
    });
    builder.addCase(
      thunkFetchFirstPageCommentData.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.comments = action.payload.data as ICommentData[];
          state.hasMore =
            (action.payload?.data as ICommentData[]).length %
              state.pagePerData ===
            0;
          state.page =
            action.payload.commentDoc.docs[
              action.payload.commentDoc.docs.length - 1
            ];
        }
        state.loadCommentsLoading = false;
        state.loadCommentsDone = true;
      }
    );
    builder.addCase(
      thunkFetchFirstPageCommentData.rejected,
      (state, action) => {
        if (action.payload) state.loadCommentsError = action.payload?.message;
        if (action.payload?.message === "게시물이 존재하지 않습니다.") {
          sweetToast("삭제된 게시물 입니다.", "warning");
        } else {
          sweetToast(
            "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
            "warning"
          );
        }
        console.error(state.loadCommentsError);
        state.loadCommentsLoading = false;
      }
    );

    // 댓글 페이징
    builder.addCase(thunkFetchPagingCommentData.pending, (state) => {
      state.loadMoreCommentsLoading = true;
      state.loadCommentsDone = false;
      state.loadCommentsError = "";
    });
    builder.addCase(thunkFetchPagingCommentData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.loadMoreCommentsLoading = false;
      state.loadCommentsDone = true;
      state.comments.push(...(action.payload?.data as ICommentData[]));
      state.page =
        action.payload.commentDoc.docs[
          action.payload.commentDoc.docs.length - 1
        ];
      state.hasMore = action.payload.data.length % state.pagePerData === 0;
    });
    builder.addCase(thunkFetchPagingCommentData.rejected, (state, action) => {
      if (action.payload) state.loadCommentsError = action.payload?.message;
      state.loadMoreCommentsLoading = false;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadCommentsError);
    });

    // 댓글 추가
    builder.addCase(thunkFetchAddComment.pending, (state) => {
      state.addCommentLoading = true;
      state.addCommentDone = false;
      state.addCommentError = "";
    });
    builder.addCase(thunkFetchAddComment.fulfilled, (state, action) => {
      if (action.payload) {
        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.comments.unshift(action.payload);
        sweetToast("작성이 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchAddComment.rejected, (state, action) => {
      if (!action.payload) return;
      state.addCommentLoading = false;
      state.addCommentError = action.payload.message;
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
      console.error(state.addCommentError);
    });

    // 댓글 수정
    builder.addCase(thunkFetchEditComment.pending, (state) => {
      state.updateCommentLoading = true;
      state.updateCommentDone = false;
      state.updateCommentError = "";
    });
    builder.addCase(thunkFetchEditComment.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateCommentLoading = false;
        state.updateCommentDone = true;
        const comment = state.comments.find(
          (v) => v.commentId === action.payload?.commentId
        );
        if (comment) comment.content = action.payload.content;
        sweetToast("수정이 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchEditComment.rejected, (state, action) => {
      if (!action.payload) return;
      state.updateCommentLoading = false;
      state.updateCommentError = action.payload.message;
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
      console.error(state.updateCommentError);
    });

    // 댓글 삭제
    builder.addCase(thunkFetchRemoveComment.pending, (state) => {
      state.removeCommentLoading = true;
      state.removeCommentDone = false;
      state.removeCommentError = "";
    });
    builder.addCase(thunkFetchRemoveComment.fulfilled, (state, action) => {
      if (action.payload) {
        state.removeCommentLoading = false;
        state.removeCommentDone = true;
        state.comments = state.comments.filter(
          (item) => item.commentId !== action.payload
        );
        sweetToast("삭제가 완료되었습니다.", "success");
      }
    });

    builder.addCase(thunkFetchRemoveComment.rejected, (state, action) => {
      if (!action.payload) return;
      state.removeCommentLoading = false;
      state.removeCommentError = action.payload.message;
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
      console.error(state.removeCommentError);
    });

    // 댓글 신고
    builder.addCase(thunkFetchReportComment.pending, (state) => {
      state.reportCommentLoading = true;
      state.reportCommentDone = false;
      state.reportCommentError = "";
    });
    builder.addCase(thunkFetchReportComment.fulfilled, (state, action) => {
      state.reportCommentLoading = false;
      state.reportCommentDone = true;
      const comment = state.comments.find(
        (v) => v.commentId === action.payload?.commentId
      );
      if (!action.payload?.uid) {
        sweetToast("로그인후 이용가능합니다.");
        return;
      }
      if (comment) comment.reportUidList.push(action.payload.uid);
      if (action.payload && action.payload?.reportCount >= 4) {
        const comment = state.comments.find(
          (v) => v.commentId === action.payload?.commentId
        );
        if (comment) comment.isBlock = true;
        sweetToast(
          "신고가 누적되어 댓글이 블라인드 처리되었습니다.",
          "info",
          1500
        );
      } else {
        sweetToast("신고가 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchReportComment.rejected, (state, action) => {
      if (!action.payload) return;
      state.reportCommentLoading = false;
      state.reportCommentError = action.payload.message;
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
      console.error(state.reportCommentError);
    });
  }
});
