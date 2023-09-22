import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICommentData, IKnownError } from "../api/apiType";
import {
  fetchAddComment,
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
      thunkAPI.rejectWithValue(error);
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
      thunkAPI.rejectWithValue(error);
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
    thunkAPI.rejectWithValue(error);
  }
});

export const thunkFetchEditComment = createAsyncThunk<
  Pick<ICommentData, "commentId" | "content"> | undefined,
  Pick<ICommentData, "commentId" | "content">,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchEditComment", async (commentEditData, thunkAPI) => {
  try {
    await fetchEditComment(commentEditData);
    return commentEditData;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
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
    thunkAPI.rejectWithValue(error);
  }
});

export const thunkFetchReportComment = createAsyncThunk<
  | (Pick<ICommentData, "commentId" | "reportCount"> & { postId: string })
  | undefined,
  Pick<ICommentData, "commentId" | "reportCount"> & { postId: string },
  { rejectValue: IKnownError }
>(
  "commentSlice/thunkFetchReportComment",
  async (reportCommentData, thunkAPI) => {
    try {
      await fetchReportComment(reportCommentData);
      return reportCommentData;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    commentListData: [] as ICommentData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    hasMore: false,
    postId: "",
    isOpenCommentModal: false,
    isLoading: false,
    error: ""
  },
  reducers: {
    setPostId: (state, action) => {
      state.postId = action.payload;
    },
    setCommentListData: (state, action) => {
      state.commentListData = action.payload;
    },
    setIsOpenCommentModal: (state, action) => {
      state.isOpenCommentModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 댓글 첫 페이지 조회
    builder.addCase(thunkFetchFirstPageCommentData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      thunkFetchFirstPageCommentData.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.commentListData = action.payload.data as ICommentData[];
          state.hasMore =
            (action.payload?.data as ICommentData[]).length %
              state.pagePerData ===
            0;
          state.page =
            action.payload.commentDoc.docs[
              action.payload.commentDoc.docs.length - 1
            ];
        }
        state.isLoading = false;
      }
    );
    builder.addCase(
      thunkFetchFirstPageCommentData.rejected,
      (state, action) => {
        if (action.payload) state.error = action.payload?.message;
        console.error(state.error);
        state.isLoading = false;
      }
    );

    // 댓글 페이징
    builder.addCase(thunkFetchPagingCommentData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.commentListData = [
        ...state.commentListData,
        ...(action.payload?.data as ICommentData[])
      ];
      state.page =
        action.payload.commentDoc.docs[action.payload.commentDoc.docs.length - 1];
      state.hasMore = action.payload.data.length % state.pagePerData === 0;
    });
    builder.addCase(thunkFetchPagingCommentData.rejected, (state, action) => {
      if (action.payload) state.error = action.payload?.message;
      console.error(state.error);
    });

    // 댓글 추가
    builder.addCase(thunkFetchAddComment.fulfilled, (state, action) => {
      if (action.payload)
        state.commentListData = [action.payload, ...state.commentListData];
      sweetToast("작성이 완료되었습니다.", "success");
    });
    builder.addCase(thunkFetchAddComment.rejected, (state, action) => {
      if (action.payload) state.error = action.payload?.message;
      console.error(state.error);
    });

    // 댓글 수정
    builder.addCase(thunkFetchEditComment.fulfilled, (state, action) => {
      if (action.payload) {
        const newData = [...state.commentListData];
        const index = newData.findIndex(
          (item) => item.commentId === action.payload?.commentId
        );
        newData[index] = {
          ...newData[index],
          content: action.payload?.content
        };
        state.commentListData = newData;
        sweetToast("수정이 완료되었습니다.", "success");
      }
    });

    // 댓글 삭제
    builder.addCase(thunkFetchRemoveComment.fulfilled, (state, action) => {
      if (action.payload) {
        const newData = [...state.commentListData].filter(
          (item) => item.commentId !== action.payload
        );
        state.commentListData = newData;
        sweetToast("삭제가 완료되었습니다.", "success");
      }
    });

    builder.addCase(thunkFetchRemoveComment.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
        console.error(state.error);
      }
    });

    // 댓글 신고
    builder.addCase(thunkFetchReportComment.fulfilled, (state, action) => {
      if (action.payload && action.payload?.reportCount >= 4) {
        const newData = [...state.commentListData].filter(
          (item) => item.commentId !== action.payload?.commentId
        );
        state.commentListData = newData;
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
      if (action.payload) {
        state.error = action.payload.message;
        console.error(state.error);
      }
    });
  }
});
