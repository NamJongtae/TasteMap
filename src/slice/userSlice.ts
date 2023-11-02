import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  fetchLogin,
  fetchLogout,
  fetchSocialLogin
} from "../api/firebase/loginAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import {
  fetchChangePassword,
  fetchFindEmail
} from "../api/firebase/findAccountAPI";
import {
  IUserData,
  IKnownError,
  IProfileData,
  IFollowData,
  IEditProfileData
} from "../api/apiType";
import {
  fetchEditProfile,
  fetchFirstpageFollowerData,
  fetchFirstpageFollowingData,
  fetchFollow,
  fetchPagingFollowerData,
  fetchPagingFollowingData,
  fetchProfile,
  fetchUnfollow
} from "../api/firebase/profileAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { fetchSignup } from "../api/firebase/signupAPI";

interface IParms {
  displayNameValue: string;
  uploadImg: File | "";
  emailValue: string;
  passwordValue: string;
  phoneValue: string;
  currentPw: string;
  newPw: string;
}

// 로그인
export const thunkFetchLogin = createAsyncThunk<
  void,
  Pick<IParms, "emailValue" | "passwordValue">,
  { rejectValue: IKnownError }
>(
  "userSlice/thunkFetchLogin",
  async ({ emailValue, passwordValue }, thunkAPI) => {
    try {
      await fetchLogin(emailValue, passwordValue);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 소셜 로그인
export const thunkFetchSocialLogin = createAsyncThunk<
  void,
  string,
  { rejectValue: IKnownError }
>("userSlice/thunkFetchSocialLogin", async (type, thunkAPI) => {
  try {
    await fetchSocialLogin(type);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 로그아웃
export const thunkFetchLogout = createAsyncThunk<
  void,
  void,
  { rejectValue: IKnownError }
>("userSlice/thunkFetchLogout", async (_, thunkAPI) => {
  try {
    await fetchLogout();
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

// 이메일 찾기
export const thunkFetchFindEmail = createAsyncThunk<
  { email?: string; createdAt?: string },
  Pick<IParms, "displayNameValue" | "phoneValue">,
  { rejectValue: IKnownError }
>(
  "userSlice/thunkFetchFindEmail",
  async ({ displayNameValue, phoneValue }, thunkAPI) => {
    try {
      const res = await fetchFindEmail(displayNameValue, phoneValue);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 사용자 정보 갱신
 */
export const thunkFetchLoadMyInfo = createAsyncThunk<
  IUserData | undefined,
  void,
  { rejectValue: IKnownError }
>("userSlice/thunkFetchMyInfo", async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    const myInfo = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve({
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email
        });
      });
    });
    localStorage.setItem("user", JSON.stringify(myInfo));
    return myInfo as IUserData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

interface ISignupParms {
  displayNameValue: string;
  uploadImg: File | "";
  emailValue: string;
  passwordValue: string;
  phoneValue: string;
  introduce: string;
}

/**
 * 회원가입
 **/
export const thunkFetchSignup = createAsyncThunk<
  void,
  ISignupParms,
  { rejectValue: IKnownError }
>(
  "signupSlice/thunkFetchSignup",
  async (
    {
      displayNameValue,
      uploadImg,
      emailValue,
      passwordValue,
      phoneValue,
      introduce
    },
    thunkAPI
  ) => {
    try {
      await fetchSignup(
        displayNameValue,
        uploadImg,
        emailValue,
        passwordValue,
        phoneValue,
        introduce
      );
      thunkAPI.dispatch(thunkFetchLoadMyInfo());
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 비밀번호 찾기 시 비밀번호 변경
 **/
export const thunkFetchChangePassowrd = createAsyncThunk<
  boolean,
  Pick<IParms, "emailValue" | "phoneValue">,
  { rejectValue: IKnownError }
>(
  "userSlice/thunkFetchChangePassowrd",
  async ({ emailValue, phoneValue }, thunkAPI) => {
    try {
      const res = await fetchChangePassword(emailValue, phoneValue);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
  IUserData | undefined,
  IEditProfileData,
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchEditProfile",
  async (editProfileData: IEditProfileData, thunkAPI) => {
    try {
      const res = await fetchEditProfile(editProfileData);
      return res as IUserData;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString || "{}");

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    myInfo: userData as IUserData,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: "",
    logInLoading: false,
    logInDone: false,
    logInError: "",
    logOutLoading: false,
    logOutDone: false,
    logOutError: "",
    signupLoading: false,
    signupDone: false,
    signupError: "",
    findEmailLoading: false,
    findEmailDone: false,
    findEmailError: "",
    changePassworLoading: false,
    changePasswordDone: false,
    changePasswordError: "",
    findEmailValue: {} as { email?: string; createdAt?: string },
    findPasswordValue: false,
    myProfile: {} as IProfileData,
    userProfile: {} as IProfileData,
    follows: [] as IFollowData[],
    followsPage: {} as QueryDocumentSnapshot<DocumentData>,
    followsHasMore: false,
    followsPagePerData: 20,
    loadMyProfileLoading: false,
    loadMyProfileDone: false,
    loadMyProfileError: "",
    loadUserProfileLoading: false,
    loadUserProfileDone: false,
    loadUserProfileError: "",
    invaildUserProfile: false,
    loadFollowsLoading: false,
    loadFollowsDone: false,
    loadFollowsError: "",
    loadMoreFollowsLoading: false,
    followLoading: false,
    followDone: false,
    followError: "",
    unfollowLoading: false,
    unfollowDone: false,
    unfollowError: "",
    updateProfileLoading: false,
    updateProfileDone: false,
    updateProfileError: "",
    isOpenFollowerModal: false,
    isOpenFollowingModal: false,
    isOpenProfileEditModal: false
  },
  reducers: {
    setMyInfo: (state, action) => {
      state.myInfo = action.payload;
    },
    // 유저 데이터 초기화
    resetMyInfo: (state) => {
      state.myInfo = {} as IUserData;
    },
    // 이메일 및 비밀번호 찾은 값 초기화
    resetFindAccountValue: (state) => {
      state.findEmailValue = {};
      state.findPasswordValue = false;
    },
    setMyprofile: (state, action) => {
      state.myProfile = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setFollowListData: (state, action) => {
      state.follows = action.payload;
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
    // 로그인
    builder.addCase(thunkFetchLogin.pending, (state) => {
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = "";
    });
    builder.addCase(thunkFetchLogin.fulfilled, (state) => {
      state.logInLoading = false;
      state.logInDone = true;
      // 현재 유저 정보를 불러옴
      const user = getAuth().currentUser;
      // 현재 유저 데이터를 data에 저장
      state.myInfo = {
        uid: user?.uid || "",
        displayName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || ""
      };
    });
    builder.addCase(thunkFetchLogin.rejected, (state, action) => {
      state.logInLoading = false;
      if (action.payload) {
        state.logInError = action.payload.toString();
      }
      // firebase에서 보내는 에러 메세지를 통해 로그인 발생하는 에러 메세지 출력
      if (state.logInError.includes("auth/invalid-email")) {
        sweetToast("유효하지 않은 이메일 형식 입니다!", "warning");
      } else if (state.logInError.includes("auth/missing-email")) {
        sweetToast("존재하지 않는 이메일 입니다!", "warning");
      } else if (state.logInError.includes("auth/user-not-found")) {
        sweetToast("일치 하는 로그인 정보가 없습니다!", "warning");
        return;
      } else if (state.logInError.includes("auth/wrong-password")) {
        sweetToast("아이디 또는 비밀번호가 일치하지 않습니다!", "warning");
        return;
      } else if (state.logInError.includes("auth/too-many-requests")) {
        sweetToast(
          "많은 로그인 시도로 로그인이 일시적으로 제한됩니다!",
          "warning"
        );
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.logInError);
      }
    });

    // 소셜 로그인
    builder.addCase(thunkFetchSocialLogin.pending, (state) => {
      state.logInLoading = true;
      state.logInDone = false;
      state.logInError = "";
    });
    builder.addCase(thunkFetchSocialLogin.fulfilled, (state) => {
      state.logInLoading = false;
      state.logInDone = true;
      // 현재 유저 정보를 불러옴
      const user = getAuth().currentUser;
      // 현재 유저 데이터를 data에 저장
      state.myInfo = {
        uid: user?.uid || "",
        displayName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || ""
      };
      // localstorage에 유저 데이터를 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        })
      );
    });

    builder.addCase(thunkFetchSocialLogin.rejected, (state, action) => {
      if (action.payload) {
        state.logInError = action.payload.message;
      }
      state.logInLoading = false;
      if (
        state.logInError.includes(
          "auth/account-exists-with-different-credential"
        )
      ) {
        sweetToast("이미 가입된 이메일 계정입니다!", "warning");
      } else {
        sweetToast(
          "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
          "warning"
        );
        console.error(state.logInError);
      }
    });

    // 로그아웃
    builder.addCase(thunkFetchLogout.pending, (state) => {
      state.logOutLoading = true;
      state.logOutDone = false;
      state.logOutError = "";
    });
    builder.addCase(thunkFetchLogout.fulfilled, (state) => {
      state.logOutLoading = false;
      state.logOutDone = true;
      state.myInfo = {} as IUserData;
      localStorage.removeItem("user");
    });
    builder.addCase(thunkFetchLogout.rejected, (state, action) => {
      if (action.payload) {
        state.logOutError = action.payload.message;
      }
      state.logOutLoading = false;
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      console.error(state.logOutError);
    });

    // 회원가입
    builder.addCase(thunkFetchSignup.pending, (state) => {
      state.signupLoading = true;
      state.signupDone = false;
      state.signupError = "";
    });
    builder.addCase(thunkFetchSignup.fulfilled, (state) => {
      state.signupLoading = false;
      state.signupDone = true;
    });
    builder.addCase(thunkFetchSignup.rejected, (state, action) => {
      state.signupLoading = false;
      if (action.payload) {
        state.signupError = action.payload.toString();
      }
      if (state.signupError.includes("email-already-in-use")) {
        sweetToast("이미 사용중인 이메일 입니다!", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.signupError);
      }
    });

    // 이메일 찾기
    builder.addCase(thunkFetchFindEmail.pending, (state) => {
      state.findEmailLoading = true;
      state.findEmailDone = false;
      state.findEmailError = "";
    });
    builder.addCase(thunkFetchFindEmail.fulfilled, (state, action) => {
      state.findEmailLoading = false;
      state.findEmailDone = true;
      state.findEmailValue = action.payload;
    });
    builder.addCase(thunkFetchFindEmail.rejected, (state, action) => {
      state.findEmailLoading = false;
      if (action.payload) {
        state.findEmailError = action.payload.message;
      }
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      console.error(state.findEmailError);
    });

    // 사용자 정보 갱신
    builder.addCase(thunkFetchLoadMyInfo.pending, (state) => {
      state.loadMyInfoLoading = true;
      state.loadMyInfoDone = false;
      state.loadMyInfoError = "";
    });
    builder.addCase(thunkFetchLoadMyInfo.fulfilled, (state, action) => {
      state.loadMyInfoLoading = false;
      state.loadMyInfoDone = true;
      if (action.payload) state.myInfo = action.payload;
    });
    builder.addCase(thunkFetchLoadMyInfo.rejected, (state, action) => {
      state.loadMyInfoLoading = false;
      if (action.payload) {
        state.loadMyInfoError = action.payload.message;
      }
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      console.error(state.loadMyInfoError);
    });

    // 비밀번호 변경
    builder.addCase(thunkFetchChangePassowrd.pending, (state) => {
      state.changePassworLoading = true;
      state.changePasswordDone = false;
      state.changePasswordError = "";
    });
    builder.addCase(thunkFetchChangePassowrd.fulfilled, (state, action) => {
      state.changePassworLoading = false;
      state.changePasswordDone = true;
      state.findPasswordValue = action.payload;
    });
    builder.addCase(thunkFetchChangePassowrd.rejected, (state, action) => {
      state.changePassworLoading = false;
      if (action.payload) {
        state.changePasswordError = action.payload.message;
      }
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      console.error(state.changePasswordError);
    });

    // 자신의 프로필 데이터 조회
    builder.addCase(thunkFetchMyProfile.pending, (state) => {
      state.loadMyProfileLoading = true;
      state.loadMyProfileDone = false;
      state.loadMyProfileError = "";
    });
    builder.addCase(thunkFetchMyProfile.fulfilled, (state, action) => {
      state.loadMyProfileLoading = false;
      state.loadMyProfileDone = true;
      if (action.payload) {
        state.myProfile = action.payload;
      }
    });
    builder.addCase(thunkFetchMyProfile.rejected, (state, action) => {
      state.loadMyProfileLoading = false;
      if (action.payload) state.loadMyProfileError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadMyProfileError);
    });

    // 유저의 프로필 데이터 조회
    builder.addCase(thunkFetchUserProfile.pending, (state) => {
      state.loadUserProfileLoading = true;
      state.loadUserProfileDone = true;
      state.loadUserProfileError = "";
    });
    builder.addCase(thunkFetchUserProfile.fulfilled, (state, action) => {
      state.loadUserProfileLoading = false;
      if (action.payload) {
        state.invaildUserProfile = false;
        state.userProfile = action.payload;
      } else {
        state.invaildUserProfile = true;
      }
    });
    builder.addCase(thunkFetchUserProfile.rejected, (state, action) => {
      state.loadUserProfileLoading = false;
      if (action.payload) state.loadUserProfileError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadUserProfileError);
    });

    // 유저 팔로우
    builder.addCase(thunkFetchFollow.pending, (state) => {
      state.followLoading = true;
      state.followDone = false;
      state.followError = "";
    });
    // 나의 팔로잉 목록에 유저 추가
    // 유저 팔로우 목록에 나 추가
    builder.addCase(thunkFetchFollow.fulfilled, (state, action) => {
      state.followLoading = false;
      state.followDone = true;
      if (action.payload) {
        state.myProfile.followingList?.push(action.payload.userUid);
        // 팔로우/팔로잉 모달창이 닫힌 경우에는 현재 유저 프로필의 팔로워리스트 수정 (유저 프로필상에서 언팔로우/팔로우)
        if (!state.isOpenFollowerModal && !state.isOpenFollowingModal) {
          state.userProfile.followerList?.push(action.payload.myUid);
        }
      }
    });
    builder.addCase(thunkFetchFollow.rejected, (state, action) => {
      if (action.payload) state.followError = action.payload.message;
      state.followLoading = false;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.followError);
    });

    // 유저 언팔로우
    builder.addCase(thunkFetchUnfollow.pending, (state) => {
      state.unfollowLoading = true;
      state.unfollowDone = false;
      state.unfollowError = "";
    });
    // 나의 팔로잉 목록에서 유저 제거
    // 유저 팔로우 목록에서 나 제거
    builder.addCase(thunkFetchUnfollow.fulfilled, (state, action) => {
      state.unfollowLoading = false;
      state.unfollowDone = true;
      if (action.payload) {
        state.myProfile.followingList = state.myProfile.followingList?.filter(
          (item) => item !== action.payload?.userUid
        );

        // 팔로우/팔로잉 모달창이 닫힌 경우에는 현재 유저 프로필의 팔로워리스트 수정 (유저 프로필상에서 언팔로우/팔로우)
        if (!state.isOpenFollowerModal && !state.isOpenFollowingModal) {
          state.userProfile.followerList =
            state.userProfile.followerList?.filter(
              (item) => item !== action.payload?.myUid
            );
        }
      }
    });

    builder.addCase(thunkFetchUnfollow.rejected, (state, action) => {
      state.unfollowLoading = false;
      if (action.payload) state.unfollowError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.unfollowError);
    });

    // 유저 팔로우 첫 페이지 조회
    builder.addCase(thunkFetchFirstPageFollowerData.pending, (state) => {
      state.loadFollowsLoading = true;
      state.loadFollowsDone = false;
      state.loadFollowsError = "";
    });
    builder.addCase(
      thunkFetchFirstPageFollowerData.fulfilled,
      (state, action) => {
        state.loadFollowsLoading = false;
        state.loadFollowsDone = true;
        if (action.payload) {
          state.follows = action.payload.data;
          state.followsHasMore =
            (action.payload.data as IFollowData[]).length %
              state.followsPagePerData ===
            0;
          state.followsPage =
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
        state.loadFollowsLoading = false;
        state.loadFollowsError = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.loadFollowsError);
      }
    );

    // 유저 팔로우 페이징
    builder.addCase(thunkFetchPagingFollowerData.pending, (state) => {
      state.loadMoreFollowsLoading = true;
      state.loadFollowsDone = false;
      state.loadFollowsError = "";
    });
    builder.addCase(thunkFetchPagingFollowerData.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.loadMoreFollowsLoading = false;
      state.loadFollowsDone = true;
      state.follows.push(...(action.payload?.data as IFollowData[]));
      state.followsPage =
        action.payload.followerDocs.docs[
          action.payload.followerDocs.docs.length - 1
        ];
      state.followsHasMore =
        action.payload.data.length % state.followsPagePerData === 0;
    });
    builder.addCase(thunkFetchPagingFollowerData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadMoreFollowsLoading = false;
      state.loadFollowsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadFollowsError);
    });

    // 유저 팔로잉 첫 페이지 조회
    builder.addCase(thunkFetchFirstPageFollowingData.pending, (state) => {
      state.loadFollowsLoading = true;
      state.loadFollowsDone = false;
      state.loadFollowsError = "";
    });
    builder.addCase(
      thunkFetchFirstPageFollowingData.fulfilled,
      (state, action) => {
        state.loadFollowsLoading = false;
        state.loadFollowsDone = true;

        if (action.payload) {
          state.follows = action.payload.data;
          state.followsHasMore =
            (action.payload.data as IFollowData[]).length %
              state.followsPagePerData ===
            0;
          state.followsPage =
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
        state.loadFollowsLoading = false;
        state.loadFollowsError = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.loadFollowsError);
      }
    );

    // 유저 팔로잉 페이징
    builder.addCase(thunkFetchPagingFollowingData.pending, (state) => {
      state.loadMoreFollowsLoading = true;
      state.loadFollowsDone = false;
      state.loadFollowsError = "";
    });
    builder.addCase(
      thunkFetchPagingFollowingData.fulfilled,
      (state, action) => {
        if (!action.payload) return;
        state.loadMoreFollowsLoading = false;
        state.loadFollowsDone = true;
        state.follows.push(...(action.payload?.data as IFollowData[]));
        state.followsPage =
          action.payload.followingDocs.docs[
            action.payload.followingDocs.docs.length - 1
          ];
        state.followsHasMore =
          action.payload.data.length % state.followsPagePerData === 0;
      }
    );
    builder.addCase(thunkFetchPagingFollowingData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadMoreFollowsLoading = false;
      state.loadFollowsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadFollowsError);
    });

    // 프로필 수정
    builder.addCase(thunkFetchEditProfile.pending, (state) => {
      state.isOpenProfileEditModal = false;
      state.updateProfileLoading = true;
      state.updateProfileDone = false;
      state.updateProfileError = "";
    });
    builder.addCase(thunkFetchEditProfile.fulfilled, (state, action) => {
      state.updateProfileLoading = false;
      state.updateProfileDone = true;
      if (action.payload) state.myInfo = action.payload;
    });
    builder.addCase(thunkFetchEditProfile.rejected, (state, action) => {
      if (!action.payload) return;
      state.updateProfileLoading = false;
      state.updateProfileError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.updateProfileError);
    });
  }
});
