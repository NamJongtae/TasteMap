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
import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';

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
      thunkAPI.rejectWithValue(error);
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
      const res = await fetchPagingReplyData(page, parentCommentId, pagePerData);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
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
    thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 수정
 */
export const thunkFetchEditReply = createAsyncThunk<
  Pick<IReplyData, "parentCommentId" | "replyId" | "content"> | undefined,
  Pick<IReplyData, "parentCommentId" | "replyId" | "content">,
  { rejectValue: IKnownError }
>("replySlice/thunkFetchEditReply", async (replyEditData, thunkAPI) => {
  try {
    await fetchEditReply(replyEditData);
    return replyEditData;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 삭제
 */
export const thunkFetchRemoveReply = createAsyncThunk<
  Pick<IReplyData, "parentCommentId" | "replyId"> | undefined,
  Pick<IReplyData, "parentCommentId" | "replyId">,
  { rejectValue: IKnownError }
>("replySlice/thunkFetchRemoveReply", async (replyRemoveData, thunkAPI) => {
  try {
    await fetchRemoveReply(replyRemoveData);
    return replyRemoveData;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 신고
 */
export const thunkFetchReportReply = createAsyncThunk<
  Pick<IReplyData, "replyId" | "parentCommentId" | "reportCount"> | undefined,
  Pick<IReplyData, "replyId" | "parentCommentId" | "reportCount">,
  { rejectValue: IKnownError }
>("replySlice/thunkFetchReportReply", async (reportReplyData, thunkAPI) => {
  try {
    await fetchReportReply(reportReplyData);
    return reportReplyData;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

export const replySlice = createSlice({
  name: "replySlice",
  initialState: {
    replyListData: [] as IReplyData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    hasMore: false,
    parentCommentId: "",
    isOpenReplyModal: false,
    isLoading: false,
    error: ""
  },
  reducers: {
    setReplyListData: (state, action) => {
      state.replyListData = action.payload;
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
      state.isLoading = true;
    });
    builder.addCase(
      thunkFetchFirstPageReplyData.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.replyListData = action.payload.data as IReplyData[];
          state.hasMore =
            (action.payload?.data as IReplyData[]).length %
              state.pagePerData ===
            0;
          state.page =
            action.payload.replyDoc.docs[
              action.payload.replyDoc.docs.length - 1
            ];
        }
        state.isLoading = false;
      }
    );
    builder.addCase(
      thunkFetchFirstPageReplyData.rejected,
      (state, action) => {
        if (action.payload) state.error = action.payload?.message;
        console.error(state.error);
        state.isLoading = false;
      }
    );

    // 답글 페이징
    builder.addCase(thunkFetchPagingReplyData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.replyListData = [
        ...state.replyListData,
        ...(action.payload?.data as IReplyData[])
      ];
      state.page =
        action.payload.replyDoc.docs[action.payload.replyDoc.docs.length - 1];
      state.hasMore = action.payload.data.length % state.pagePerData === 0;
    });

    // 답글 추가
    builder.addCase(thunkFetchAddReply.fulfilled, (state, action) => {
      if (action.payload)
        state.replyListData = [action.payload, ...state.replyListData];
      sweetToast("작성이 완료되었습니다.", "success");
    });
    builder.addCase(thunkFetchAddReply.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
        console.error(state.error);
      }
    });

    // 답글 수정
    builder.addCase(thunkFetchEditReply.fulfilled, (state, action) => {
      if (action.payload) {
        const newData = [...state.replyListData];
        const index = newData.findIndex(
          (item) => item.replyId === action.payload?.replyId
        );
        newData[index] = {
          ...newData[index],
          content: action.payload?.content
        };
        state.replyListData = newData;
        sweetToast("수정이 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchEditReply.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
        console.error(state.error);
      }
    });

    // 답글 삭제
    builder.addCase(thunkFetchRemoveReply.fulfilled, (state, action) => {
      if (action.payload) {
        const newData = [...state.replyListData].filter(
          (item) => item.replyId !== action.payload?.replyId
        );
        state.replyListData = newData;
        sweetToast("삭제가 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchRemoveReply.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
        console.error(state.error);
      }
    });

    // 답글 신고
    builder.addCase(thunkFetchReportReply.fulfilled, (state, action) => {
      if (action.payload && action.payload?.reportCount >= 4) {
        const newData = [...state.replyListData].filter(
          (item) => item.replyId !== action.payload?.replyId
        );
        state.replyListData = newData;
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
      if (action.payload) {
        state.error = action.payload.message;
        console.error(state.error);
      }
    });
  }
});
