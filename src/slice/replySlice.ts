import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IKnownError, IReplyData } from "../api/apiType";
import {
  fetchAddReply,
  fetchEditReply,
  fetchRemoveReply,
  fetchReplyListData
} from "../api/firebase/replyAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";

/**
 * 답글 조회
 */
export const thunkFetchReplyListData = createAsyncThunk<
  IReplyData[] | undefined,
  string,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchReplyListData", async (parentCommentId, thunkAPI) => {
  try {
    const res = await fetchReplyListData(parentCommentId);
    return res;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

/**
 * 답글 추가
 */
export const thunkFetchAddReply = createAsyncThunk<
  IReplyData | undefined,
  IReplyData,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchAddReply", async (replyData, thunkAPI) => {
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
>("commentSlice/thunkFetchEditReply", async (replyEditData, thunkAPI) => {
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
>("commentSlice/thunkFetchRemoveReply", async (replyRemoveData, thunkAPI) => {
  try {
    await fetchRemoveReply(replyRemoveData);
    return replyRemoveData;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

export const replySlice = createSlice({
  name: "commentSlice",
  initialState: {
    replyListData: [] as IReplyData[],
    parentCommentId: "",
    isOpenReplyModal: false,
    isLoading: false,
    error: ""
  },
  reducers: {
    setParentCommentId: (state, action) => {
      state.parentCommentId = action.payload;
    },
    setIsOpenReplyModal: (state, action) => {
      state.isOpenReplyModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 답글 조회
    builder.addCase(thunkFetchReplyListData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(thunkFetchReplyListData.fulfilled, (state, action) => {
      if (action.payload) state.replyListData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(thunkFetchReplyListData.rejected, (state, action) => {
      if (action.payload) state.error = action.payload?.message;
      console.error(state.error);
      state.isLoading = false;
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
  }
});
