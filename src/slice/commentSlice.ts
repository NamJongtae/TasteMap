import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICommentData, IKnownError } from "../api/apiType";
import {
  fetchAddComment,
  fetchCommentList,
  fetchEditComment,
  fetchRemoveComment,
} from "../api/firebase/commentAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";

export const thunkFetchCommentList = createAsyncThunk<
  ICommentData[] | undefined,
  string,
  { rejectValue: IKnownError }
>("commentSlice/thunkFetchCommentList", async (postId, thunkAPI) => {
  try {
    const res = await fetchCommentList(postId);
    return res;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

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

export const commentSlice = createSlice({
  name: "commentSlice",
  initialState: {
    commentListData: [] as ICommentData[],
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
    },
  },
  extraReducers: (builder) => {
    // 댓글 조회
    builder.addCase(thunkFetchCommentList.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(thunkFetchCommentList.fulfilled, (state, action) => {
      if (action.payload) state.commentListData = action.payload;
      state.isLoading = false;
    });
    builder.addCase(thunkFetchCommentList.rejected, (state, action) => {
      if (action.payload) state.error = action.payload?.message;
      console.error(state.error);
      state.isLoading = false;
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

  }
});
