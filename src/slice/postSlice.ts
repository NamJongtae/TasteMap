import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IKnownError,
  IPostData,
  IPostUploadData,
  ISearchMapData
} from "../api/apiType";
import { fetchSearchData } from "../api/naverSearchAPI/naverSearchAPI";
import {
  fetchAddPostLike,
  fetchAddPostMap,
  fetchEditPost,
  fetchFirstPagePostData,
  fetchPagingPostData,
  fetchPostData,
  fetchPostImg,
  fetchRemovePost,
  fetchRemovePostLike,
  fetchRemovePostMap,
  fetchReportPost,
  fetchUploadPost
} from "../api/firebase/postAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { sweetToast } from "../library/sweetAlert/sweetAlert";

// 게시물 데이터 조회
export const thuckFetchPostData = createAsyncThunk<
  IPostData | undefined,
  string,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchPostData", async (postId: string, thuckAPI) => {
  try {
    const res = await fetchPostData(postId);
    if (res?.id) {
      thuckAPI.dispatch(postSlice.actions.setInvalidPage(false));
    } else {
      thuckAPI.dispatch(postSlice.actions.setInvalidPage(true));
    }
    return res;
  } catch (error: any) {
    thuckAPI.rejectWithValue(error);
  }
});

// 맛집 검색
export const thuckFetchSearchMap = createAsyncThunk(
  "postSlice/thuckFetchSearchMap",
  async (keyword: string, thunkAPI) => {
    try {
      const res = await fetchSearchData(keyword);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시물 업로드
export const thunkFetchUploadPost = createAsyncThunk<
  IPostUploadData,
  IPostUploadData,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchUploadPost", async (postData, thunkAPI) => {
  try {
    // img 프로퍼티는 이미지 firestore에 이미지를 저장하고
    // 저장한 이미지 파일의 url과 filename를 얻기위해 사용
    if (postData.img) {
      const res = await fetchPostImg(postData.img);
      postData.imgURL = res.url;
      postData.imgName = res.filename;
    }
    // 이미지 저장, 이미지 저장 데이터 적용 후
    // 이미지 파일 프로퍼티 삭제
    // 데이터 업로드시 파일 프로퍼티는 업로드할 필요가 없음
    delete postData.img;
    await fetchUploadPost(postData);
    return postData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 첫 페이지 데이터 조회
 */
export const thunkFetchFirstPagePostData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: DocumentData[];
    }
  | undefined,
  number,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchFirstPagePostData", async (pagePerDate, thunkAPI) => {
  try {
    const res = await fetchFirstPagePostData(pagePerDate);
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 페이징 데이터 조회
 */
export const thunkFetchPagingPostData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: DocumentData[];
    }
  | undefined,
  {
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pagePerData: number;
  },
  { rejectValue: IKnownError }
>(
  "postSlice/thunkFetchPostPageData",
  async ({ page, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchPagingPostData(page, pagePerData);
      if (!res) return;
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 게시물 수정
 */
export const thuckFecthEditPost = createAsyncThunk<
  Pick<
    IPostUploadData,
    "id" | "content" | "rating" | "mapData" | "imgURL" | "imgName" | "img"
  >,
  {
    prevPostData: IPostData;
    editPostData: Pick<
      IPostUploadData,
      "id" | "content" | "rating" | "mapData" | "imgURL" | "imgName" | "img"
    >;
  },
  { rejectValue: IKnownError }
>(
  "postSlice/thuckFecthEditPost",
  async ({ prevPostData, editPostData }, thunkAPI) => {
    try {
      // img 프로퍼티는 이미지 firestore에 이미지를 저장하고
      // 저장한 이미지 파일의 url과 filename를 얻기위해 사용
      if (editPostData.img) {
        const res = await fetchPostImg(editPostData.img);
        editPostData.imgURL = [...editPostData.imgURL, ...res.url];
        editPostData.imgName = [...editPostData.imgName, ...res.filename];
      }
      // 이미지 저장, 이미지 저장 데이터 적용 후
      // 이미지 파일 프로퍼티 삭제
      // 데이터 업로드시 파일 프로퍼티는 업로드할 필요가 없음
      delete editPostData.img;
      await fetchEditPost(prevPostData, editPostData);
      return editPostData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
/**
 * 게시물 삭제
 */
export const thuckFetchRemovePost = createAsyncThunk<
  IPostData,
  IPostData,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchRemovePost", async (postData, thunkAPI) => {
  try {
    fetchRemovePost(postData);
    return postData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 신고
 */
export const thuckFetchReportPost = createAsyncThunk<
  void,
  IPostData,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchReportPost", async (postData, thunkAPI) => {
  try {
    await fetchReportPost(postData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 좋아요 추가
 */
export const thuckFetchAddPostLike = createAsyncThunk<
  string,
  string,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchAddPostLike", async (id, thunkAPI) => {
  try {
    await fetchAddPostLike(id);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 좋아요 삭제
 */
export const thuckFetchRemovePostLike = createAsyncThunk<
  void,
  string,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchRemovePostLike", async (id, thunkAPI) => {
  try {
    await fetchRemovePostLike(id);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 지도 추가
 */
export const thuckFetchAddPostMap = createAsyncThunk<
  IPostData,
  IPostData,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchAddPostMap", async (postData, thunkAPI) => {
  try {
    await fetchAddPostMap(postData);
    return postData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 지도 삭제
 */
export const thuckFetchRemovePostMap = createAsyncThunk<
  void,
  IPostData,
  { rejectValue: IKnownError }
>("postSlice/thuckFetchRemovePostMap", async (postData, thunkAPI) => {
  try {
    await fetchRemovePostMap(postData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    postData: {} as IPostData,
    postListData: [] as IPostData[], // 게시물 데이터
    page: {} as QueryDocumentSnapshot<DocumentData>,
    pagePerData: 10,
    hasMore: false,
    searchMapData: [] as ISearchMapData[], // 검색 데이터
    seletedMapData: [] as ISearchMapData[], // 선택한 검색 데이터,
    invalidPage: false,
    error: "",
    isLoading: false
  },
  reducers: {
    setPostListData: (state, action) => {
      state.postListData = action.payload;
    },
    setSelectedMapData: (state, action) => {
      state.seletedMapData = [action.payload];
    },
    resetSelectedMapData: (state) => {
      state.seletedMapData = [] as ISearchMapData[];
    },
    resetSearchMapData: (state) => {
      state.searchMapData = [];
    },
    remove: (state, action) => {
      const newData = [...state.postListData].filter(
        (item) => item.id !== action.payload
      );
      state.postListData = newData;
    },
    setInvalidPage: (state, action) => {
      state.invalidPage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 게시물 데이터 조회
    builder.addCase(thuckFetchPostData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.isLoading = true;
    });
    builder.addCase(thuckFetchPostData.fulfilled, (state, action) => {
      if (action.payload) state.postData = action.payload;
      document.body.style.overflow = "auto";
      state.isLoading = false;
    });
    builder.addCase(thuckFetchPostData.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      document.body.style.overflow = "auto";
      state.isLoading = false;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 맛집 지도 검색
    builder.addCase(thuckFetchSearchMap.fulfilled, (state, action) => {
      state.searchMapData = action.payload;
    });
    builder.addCase(thuckFetchSearchMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.toString();
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 업로드
    builder.addCase(thunkFetchUploadPost.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.isLoading = true;
    });
    builder.addCase(thunkFetchUploadPost.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.isLoading = false;
      state.postListData = [action.payload, ...state.postListData];
    });
    builder.addCase(thunkFetchUploadPost.rejected, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.error = action.payload.toString();
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 조회
    builder.addCase(thunkFetchFirstPagePostData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.isLoading = true;
    });
    builder.addCase(thunkFetchFirstPagePostData.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.isLoading = false;
      state.postListData = action.payload?.data as IPostData[];
      state.hasMore =
        (action.payload?.data as IPostData[]).length % state.pagePerData === 0;
      if (action.payload) {
        state.page =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
      }
    });
    builder.addCase(thunkFetchFirstPagePostData.rejected, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 페이징
    builder.addCase(thunkFetchPagingPostData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.postListData = [
        ...state.postListData,
        ...(action.payload?.data as IPostData[])
      ];
      state.page =
        action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
      state.hasMore = action.payload.data.length % state.pagePerData === 0;
    });

    // 게시물 수정
    builder.addCase(thuckFecthEditPost.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.isLoading = true;
    });
    builder.addCase(thuckFecthEditPost.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.isLoading = false;
      const index = [...state.postListData].findIndex(
        (data) => data.id === action.payload.id
      );
      const newData = [...state.postListData];
      newData[index] = { ...newData[index], ...action.payload };
      state.postListData = newData;
    });
    builder.addCase(thuckFecthEditPost.rejected, (state, action) => {
      if (!action.payload) return;
      document.body.style.overflow = "auto";
      state.isLoading = false;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 삭제
    builder.addCase(thuckFetchRemovePost.fulfilled, (state, action) => {
      state.postListData = [
        ...state.postListData.filter((item) => item.id !== action.payload.id)
      ];
      sweetToast("삭제가 완료되었습니다.", "success");
    });

    builder.addCase(thuckFetchRemovePost.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 신고
    builder.addCase(thuckFetchReportPost.fulfilled, () => {
      sweetToast("신고가 완료되었습니다.", "success");
    });
    builder.addCase(thuckFetchReportPost.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 좋아요 추가
    builder.addCase(thuckFetchAddPostLike.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 좋아요 삭제
    builder.addCase(thuckFetchRemovePostLike.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 지도 추가
    builder.addCase(thuckFetchAddPostMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 게시물 지도 삭제
    builder.addCase(thuckFetchRemovePostMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });
  }
});
