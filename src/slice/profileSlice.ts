import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IEditProfileData,
  IFollowData,
  IKnownError,
  IPostData,
  IProfileData
} from "../api/apiType";
import {
  fetchEditProfile,
  fetchFirstpageFollowerData,
  fetchFirstpageFollowingData,
  fetchFollow,
  fetchPagingFollowerData,
  fetchPagingFollowingData,
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

/**
 * 유저 팔로워 첫 페이지 조회
 */
export const thunkFetchFirstPageFollowerData = createAsyncThunk<
  | {
      followerDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IFollowData[];
    }
  | undefined,
  { uid: string; pagePerData: number },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchFirstPageFollowerData",
  async ({ uid, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchFirstpageFollowerData(uid, pagePerData);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 유저 팔로워 페이징
 */
export const thunkFetchPagingFollowerData = createAsyncThunk<
  | {
      followerDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IFollowData[];
    }
  | undefined,
  {
    uid: string;
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pagePerData: number;
  },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchPagingFollowerData",
  async ({ uid, page, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchPagingFollowerData(uid, page, pagePerData);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 유저 팔로잉 첫 페이지 조회
 */
export const thunkFetchFirstPageFollowingData = createAsyncThunk<
  | {
      followingDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IFollowData[];
    }
  | undefined,
  { uid: string; pagePerData: number },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchFirstPageFollowingData",
  async ({ uid, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchFirstpageFollowingData(uid, pagePerData);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 유저 팔로잉 페이징
 */
export const thunkFetchPagingFollowingData = createAsyncThunk<
  | {
      followingDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IFollowData[];
    }
  | undefined,
  {
    uid: string;
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pagePerData: number;
  },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchPagingFollowingData",
  async ({ uid, page, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchPagingFollowingData(uid, page, pagePerData);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
/**
 * 프로필 수정
 */
export const thunkFetchEditProfile = createAsyncThunk<
  void,
  IEditProfileData,
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchEditProfile",
  async (editProfileData: IEditProfileData, thunkAPI) => {
    try {
      await fetchEditProfile(editProfileData);
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
    pagePerData: 5,
    isOpenFollowerModal: false,
    isOpenFollowingModal: false,
    isOpenProfileEditModal: false,
    followListData: [] as IFollowData[],
    followPage: {} as QueryDocumentSnapshot<DocumentData>,
    followHasMore: false,
    followPagePerData: 20,
    isInvalidPage: false,
    isNoProfilePostData: false,
    isLoading: false,
    profilePostIsLoading: false,
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
    setFollowListData: (state, action) => {
      state.followListData = action.payload;
    },
    setIsOpenFollowerModal: (state, action) => {
      state.isOpenFollowerModal = action.payload;
    },
    setIsOpenFollowingModal: (state, action) => {
      state.isOpenFollowingModal = action.payload;
    },
    setIsOpenProfileEditModal: (state, action) => {
      state.isOpenProfileEditModal = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 자신의 프로필 데이터 조회
    builder.addCase(thunkFetchMyProfile.fulfilled, (state, action) => {
      if (action.payload) {
        state.myProfileData = action.payload;
      }
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
    builder.addCase(thunkFetchUserProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(thunkFetchUserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.isInvalidPage = false;
        state.userProfileData = action.payload;
      } else {
        state.isInvalidPage = true;
      }
    });
    builder.addCase(thunkFetchUserProfile.rejected, (state, action) => {
      state.isLoading = false;
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

        // 팔로우/팔로잉 모달창이 열렸을 경우에는 현재 유저 데이터와 자신의 uid 같을 경우에만 followingList를 변경
        // 현재 페이지의 유저의 팔로잉 리스트가 모달창에서 팔로우 버튼을 누르면 계속 늘어나는 문제해결을 위해 사용
        if (state.isOpenFollowerModal || state.isOpenFollowingModal) {
          if (state.userProfileData.uid === action.payload.myUid) {
            const newUserProfile = { ...state.userProfileData };
            newUserProfile.followingList?.push(action.payload.myUid);
            state.userProfileData = newUserProfile;
          }
        } else {
          // 팔로우/팔로잉 모달창이 닫힌 경우
          // followingList 바로 변경
          const newUserProfile = { ...state.userProfileData };
          newUserProfile.followingList?.push(action.payload.myUid);
          state.userProfileData = newUserProfile;
        }
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
        newData.followerList = newData.followerList?.filter(
          (item) => item !== action.payload?.userUid
        );
        state.myProfileData = newData;
        // 팔로우/팔로잉 모달창이 열렸을 경우에는 현재 유저 데이터와 자신의 uid 같을 경우에만 followingList를 변경
        // 현재 페이지의 유저의 팔로잉 리스트가 모달창에서 팔로우 버튼을 누르면 계속 줄어드는 문제해결을 위해 사용
        if (state.isOpenFollowerModal || state.isOpenFollowingModal) {
          if (state.userProfileData.uid === action.payload.myUid) {
            const newUserProfile = { ...state.userProfileData };
            newUserProfile.followingList = newUserProfile.followingList?.filter(
              (item) => item !== action.payload?.myUid
            );
            state.userProfileData = newUserProfile;
          }
        } else {
          // 팔로우/팔로잉 모달창이 닫힌 경우
          // followingList 바로 변경
          const newUserProfile = { ...state.userProfileData };
          newUserProfile.followingList = newUserProfile.followingList?.filter(
            (item) => item !== action.payload?.myUid
          );
          state.userProfileData = newUserProfile;
        }
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
      state.profilePostIsLoading = true;
    });
    builder.addCase(
      thunkFetchProfileFirstPageData.fulfilled,
      (state, action) => {
        document.body.style.overflow = "auto";
        state.profilePostIsLoading = false;
        if (!action.payload) return;
        if (action.payload.data.length > 0) {
          state.isNoProfilePostData = false;
          state.profilePostListData = action.payload?.data;
          state.hasMore =
            (action.payload?.data as IPostData[]).length % state.pagePerData ===
            0;
          state.page =
            action.payload.postDocs.docs[
              action.payload.postDocs.docs.length - 1
            ];
        } else {
          state.isNoProfilePostData = true;
        }
      }
    );
    builder.addCase(
      thunkFetchProfileFirstPageData.rejected,
      (state, action) => {
        if (!action.payload) return;
        state.profilePostIsLoading = false;
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
      if (action.payload.data.length > 0) {
        state.profilePostListData = [
          ...state.profilePostListData,
          ...(action.payload?.data as IPostData[])
        ];
        state.page =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
        state.hasMore = action.payload.data.length % state.pagePerData === 0;
      }
    });
    builder.addCase(thunkFetchProfilePagingData.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 유저 팔로우 첫 페이지 조회
    builder.addCase(
      thunkFetchFirstPageFollowerData.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.followListData = action.payload.data;
          state.followHasMore =
            (action.payload.data as IFollowData[]).length %
              state.followPagePerData ===
            0;
          state.followPage =
            action.payload.followerDocs.docs[
              action.payload.followerDocs.docs.length - 1
            ];
        }
      }
    );
    builder.addCase(
      thunkFetchFirstPageFollowerData.rejected,
      (state, action) => {
        if (!action.payload) return;
        state.error = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.error);
      }
    );

    // 유저 팔로우 페이징
    builder.addCase(thunkFetchPagingFollowerData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.followListData = [
        ...state.followListData,
        ...(action.payload?.data as IFollowData[])
      ];
      state.followPage =
        action.payload.followerDocs.docs[
          action.payload.followerDocs.docs.length - 1
        ];
      state.followHasMore =
        action.payload.data.length % state.followPagePerData === 0;
    });
    builder.addCase(thunkFetchPagingFollowerData.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 유저 팔로잉 첫 페이지 조회
    builder.addCase(
      thunkFetchFirstPageFollowingData.fulfilled,
      (state, action) => {
        if (action.payload) {
          state.followListData = action.payload.data;
          state.followHasMore =
            (action.payload.data as IFollowData[]).length %
              state.followPagePerData ===
            0;
          state.followPage =
            action.payload.followingDocs.docs[
              action.payload.followingDocs.docs.length - 1
            ];
        }
      }
    );
    builder.addCase(
      thunkFetchFirstPageFollowingData.rejected,
      (state, action) => {
        if (!action.payload) return;
        state.error = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.error);
      }
    );

    // 유저 팔로잉 페이징
    builder.addCase(
      thunkFetchPagingFollowingData.fulfilled,
      (state, action) => {
        if (!action.payload) return;
        state.followListData = [
          ...state.followListData,
          ...(action.payload?.data as IFollowData[])
        ];
        state.followPage =
          action.payload.followingDocs.docs[
            action.payload.followingDocs.docs.length - 1
          ];
        state.followHasMore =
          action.payload.data.length % state.followPagePerData === 0;
      }
    );
    builder.addCase(thunkFetchPagingFollowingData.rejected, (state, action) => {
      if (!action.payload) return;
      state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });

    // 프로필 수정
    builder.addCase(thunkFetchEditProfile.pending, (state) => {
      state.isOpenProfileEditModal = false;
      state.isLoading = true;
    });
    builder.addCase(thunkFetchEditProfile.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(thunkFetchEditProfile.rejected, (state, action) => {
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
