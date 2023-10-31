import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IKnownError, IProfileData } from "../api/apiType";
import {
  fetchSearchFirstPageData,
  fetchSearchPagingData
} from "../api/firebase/searchAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { sweetToast } from "../library/sweetAlert/sweetAlert";

export const thunkFetchSearchFirstPageData = createAsyncThunk<
  | {
      userDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IProfileData[];
    }
  | undefined,
  { keyword: string; limitPage: number },
  { rejectValue: IKnownError }
>(
  "searchSlice/thunkFetchSearchFirstPageData",
  async ({ keyword, limitPage }, thunkAPI) => {
    try {
      const res = await fetchSearchFirstPageData(keyword, limitPage);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const thunkFetchSearchPagingData = createAsyncThunk<
  | {
      userDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IProfileData[];
    }
  | undefined,
  {
    keyword: string;
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    limitPage: number;
  },
  { rejectValue: IKnownError }
>(
  "searchSlice/thunkFetchSearchPagingData",
  async ({ keyword, page, limitPage }, thunkAPI) => {
    try {
      const res = await fetchSearchPagingData(keyword, page, limitPage);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchResult: [] as IProfileData[],
    searchKeyword: "",
    page: {} as QueryDocumentSnapshot<DocumentData, DocumentData>,
    hasMore: false,
    pagePerData: 20,
    loadSerachLoading: false,
    loadSearchDone: false,
    loadSearchError: "",
    loadMoreSearchLoading: false,
  },
  reducers: {
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchSearchFirstPageData.pending, (state) => {
      state.loadSerachLoading = true;
      state.loadSearchDone = false;
      state.loadSearchError = "";
    });
    builder.addCase(
      thunkFetchSearchFirstPageData.fulfilled,
      (state, action) => {
        state.loadSerachLoading = false;
        state.loadSearchDone = true;
        if (action.payload) {
          state.searchResult = action.payload.data;
          state.hasMore = action.payload.data.length % state.pagePerData === 0;
          state.page =
            action.payload.userDocs.docs[
              action.payload.userDocs.docs.length - 1
            ];
        }
      }
    );
    builder.addCase(thunkFetchSearchFirstPageData.rejected, (state, action) => {
      state.loadSerachLoading = false;
      if (action.payload) {
        state.loadSearchError = action.payload.message;
        console.error(state.loadSearchError);
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
    });

    builder.addCase(thunkFetchSearchPagingData.pending, (state) => {
      state.loadMoreSearchLoading = true;
      state.loadSearchDone = false;
      state.loadSearchError = "";
    });
    builder.addCase(thunkFetchSearchPagingData.fulfilled, (state, action) => {
      state.loadMoreSearchLoading = false;
      state.loadSearchDone = true;
      if (action.payload) {
        state.searchResult.push(...action.payload.data);
        state.hasMore = action.payload.data.length % state.pagePerData === 0;
        state.page =
          action.payload.userDocs.docs[action.payload.userDocs.docs.length - 1];
      }
    });
    builder.addCase(thunkFetchSearchPagingData.rejected, (state, action) => {
      state.loadMoreSearchLoading = false;
      if (action.payload) {
        state.loadSearchError = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
    });
  }
});
