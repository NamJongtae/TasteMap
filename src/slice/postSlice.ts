import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPostData, IPostUploadData, ISearchMapData } from "../api/apiType";
import { fetchSearchData } from "../api/naverSearchAPI/naverSearchAPI";
import { fetchPostImg, fetchUploadPost } from "../api/firebase/uploadAPI";

interface IknownError {
  message: string;
}

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
  void,
  IPostUploadData,
  { rejectValue: IknownError }
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
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    postData: [] as IPostData[], // 게시물 데이터
    searchMapData: [] as ISearchMapData[], // 검색 데이터
    seletedMapData: [] as ISearchMapData[], // 선택한 검색 데이터
    error: "",
    isLoading: false
  },
  reducers: {
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
      const newData = [...state.postData].filter(
        (item) => item.id !== action.payload
      );
      state.postData = newData;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 맛집 지도 검색
    builder.addCase(thuckFetchSearchMap.fulfilled, (state, action) => {
      state.searchMapData = action.payload;
    });
    builder.addCase(thuckFetchSearchMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.toString();
    });

    // 게시물 업로드
    builder.addCase(thunkFetchUploadPost.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.isLoading = true;
    });
    builder.addCase(thunkFetchUploadPost.fulfilled, (state) => {
      document.body.style.overflow = "auto";
      state.isLoading = false;
    });
    builder.addCase(thunkFetchUploadPost.rejected, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.error = action.payload.toString();
    });
  }
});
