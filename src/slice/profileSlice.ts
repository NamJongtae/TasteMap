import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IKnownError, IPostData, IProfileData } from "../api/apiType";
import {
  fetchFollow,
  fetchProfile,
  fetchProfileFirstPageData,
  fetchProfilePagingData,
  fetchUnfollow
} from "../api/firebase/profileAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";

/**
 * 자신의 프로필 조회
 */
export const thunkFetchMyProfile = createAsyncThunk<
  IProfileData | undefined,
  string,
  { rejectValue: IKnownError }
>("profileSlice/thunkFetchMyProfile", async (uid, thuckAPI) => {
  try {
    const res = await fetchProfile(uid);
    return res;
  } catch (error: any) {
    return thuckAPI.rejectWithValue(error);
  }
});

/**
 * 유저의 프로필 조회
 */
export const thunkFetchUserProfile = createAsyncThunk<
  IProfileData | undefined,
  string,
  { rejectValue: IKnownError }
>("profileSlice/thunkFetchUserProfile", async (uid, thuckAPI) => {
  try {
    const res = await fetchProfile(uid);
    return res;
  } catch (error: any) {
    return thuckAPI.rejectWithValue(error);
  }
});

/**
 * 유저 팔로우
 */
export const thunkFetchFollow = createAsyncThunk<
  { myUid: string; userUid: string } | undefined,
  { myUid: string; userUid: string },
  { rejectValue: IKnownError }
>("profileSlice/thunkFetchFollow", async ({ myUid, userUid }, thuckAPI) => {
  try {
    await fetchFollow(myUid, userUid);
    return { myUid, userUid };
  } catch (error: any) {
    return thuckAPI.rejectWithValue(error);
  }
});

/**
 * 유저 언팔로우
 */
export const thunkFetchUnfollow = createAsyncThunk<
  { myUid: string; userUid: string } | undefined,
  { myUid: string; userUid: string },
  { rejectValue: IKnownError }
>("profileSlice/thunkFetchUnfollow", async ({ myUid, userUid }, thuckAPI) => {
  try {
    await fetchUnfollow(myUid, userUid);
    return { myUid, userUid };
  } catch (error: any) {
    return thuckAPI.rejectWithValue(error);
  }
});

/**
 * 유저 프로필 게시물 첫 페이지 조회
 */
export const thunkFetchProfileFirstPageData = createAsyncThunk<
  | { postDocs: QuerySnapshot<DocumentData, DocumentData>; data: IPostData[] }
  | undefined,
  { uid: string; pagePerData: number },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchProfileFirstPageData",
  async ({ uid, pagePerData }, thuckAPI) => {
    try {
      const res = await fetchProfileFirstPageData(uid, pagePerData);
      return res;
    } catch (error: any) {
      thuckAPI.rejectWithValue(error);
    }
  }
);

/**
 * 유저 프로필 게시물 페이징
 */
export const thunkFetchProfilePagingData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IPostData[];
    }
  | undefined,
  {
    uid: string;
    pagePerData: number;
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
  },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchProfilePagingData",
  async ({ uid, pagePerData, page }, thunkAPI) => {
    try {
      const res = await fetchProfilePagingData(uid, pagePerData, page);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    myProfileData: {} as IProfileData,
    userProfileData: {} as IProfileData,
    profilePostListData: [] as IPostData[],
    page: {} as QueryDocumentSnapshot<DocumentData>,
    hasMore: false,
    pagePerData: 10,
    isLoading: false,
    error: ""
  },
  reducers: {
    setMyprofile: (state, action) => {
      state.myProfileData = action.payload;
    },
    setUserProfile: (state, action) => {
      state.myProfileData = action.payload;
    },
    setProfilePostListData: (state, action) => {
      state.profilePostListData = action.payload;
    },
  },
  extraReducers: (builder) => {
    // 자신의 프로필 데이터 조회
    builder.addCase(thunkFetchMyProfile.fulfilled, (state, action) => {
      if (action.payload) state.myProfileData = action.payload;
    });
    builder.addCase(thunkFetchMyProfile.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 유저의 프로필 데이터 조회
    builder.addCase(thunkFetchUserProfile.fulfilled, (state, action) => {
      if (action.payload) state.userProfileData = action.payload;
    });
    builder.addCase(thunkFetchUserProfile.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 유저 팔로우
    builder.addCase(thunkFetchFollow.fulfilled, (state, action) => {
      if (action.payload) {
        const newData = { ...state.myProfileData };
        newData.followerList?.push(action.payload.userUid);
        state.myProfileData = newData;

        const newUserProfile = { ...state.userProfileData };
        newUserProfile.followingList?.push(action.payload.myUid);
        state.userProfileData = newUserProfile;
      }
    });
    builder.addCase(thunkFetchFollow.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 유저 언팔로우
    builder.addCase(thunkFetchUnfollow.fulfilled, (state, action) => {
      if (action.payload) {
        const newData = { ...state.myProfileData };
        newData.followerList = newData.followingList?.filter(
          (item) => item !== action.payload?.userUid
        );
        state.myProfileData = newData;

        const newUserProfile = { ...state.userProfileData };
        newUserProfile.followingList = newUserProfile.followingList?.filter(
          (item) => item !== action.payload?.myUid
        );
        state.userProfileData = newUserProfile;
      }
    });

    builder.addCase(thunkFetchUnfollow.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 프로필 게시물 데이터 첫 페이지
    builder.addCase(thunkFetchProfileFirstPageData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.isLoading = true;
    });
    builder.addCase(
      thunkFetchProfileFirstPageData.fulfilled,
      (state, action) => {
        document.body.style.overflow = "auto";
        state.isLoading = false;
        if (action.payload) {
          state.profilePostListData = action.payload?.data;
          state.hasMore =
            (action.payload?.data as IPostData[]).length % state.pagePerData ===
            0;
          state.page =
            action.payload.postDocs.docs[
              action.payload.postDocs.docs.length - 1
            ];
        }
      }
    );
    builder.addCase(
      thunkFetchProfileFirstPageData.rejected,
      (state, action) => {
        if (!action.payload) return;
        state.isLoading = false;
        state.error = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.error);
      }
    );

    // 게시물 페이징
    builder.addCase(thunkFetchProfilePagingData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.profilePostListData = [
        ...state.profilePostListData,
        ...(action.payload?.data as IPostData[])
      ];
      state.page =
        action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
      state.hasMore = action.payload.data.length % state.pagePerData === 0;
    });
    builder.addCase(thunkFetchProfilePagingData.rejected, (state, action) => {
      if (!action.payload) return;
      state.isLoading = false;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });
  }
});
