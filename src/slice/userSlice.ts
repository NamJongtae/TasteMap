import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";
import { fetchLogin, fetchSocialLogin } from "../api/firebase/loginAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import {
  fetchChangePassword,
  fetchFindEmail
} from "../api/firebase/findAccountAPI";
import { IUserData, IKnownError } from "../api/apiType";

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
export const thuckFetchLogin = createAsyncThunk<
  void,
  Pick<IParms, "emailValue" | "passwordValue">,
  { rejectValue: IKnownError }
>(
  "userSlice/thuckFetchLogin",
  async ({ emailValue, passwordValue }, thunkAPI) => {
    try {
      await fetchLogin(emailValue, passwordValue);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 소셜 로그인
export const thuckFetchSocialLogin = createAsyncThunk<
  void,
  string,
  { rejectValue: IKnownError }
>("userSlice/thuckFetchSocialLogin", async (type, thunkAPI) => {
  try {
    await fetchSocialLogin(type);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

// 이메일 찾기
export const thuckFetchFindEmail = createAsyncThunk<
  { email?: string; createdAt?: string },
  Pick<IParms, "displayNameValue" | "phoneValue">,
  { rejectValue: IKnownError }
>(
  "userSlice/fetchFindEmail",
  async ({ displayNameValue, phoneValue }, thunkAPI) => {
    try {
      const res = await fetchFindEmail(displayNameValue, phoneValue);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 비밀번호 찾기 시 비밀번호 변경
export const thuckFetchChangePassowrd = createAsyncThunk<
  boolean,
  Pick<IParms, "emailValue" | "phoneValue">,
  { rejectValue: IKnownError }
>(
  "userSlice/fetchChangePassowrd",
  async ({ emailValue, phoneValue }, thunkAPI) => {
    try {
      const res = await fetchChangePassword(emailValue, phoneValue);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString || "{}");

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    data: userData as IUserData,
    isLoading: false,
    error: "",
    findEmailValue: {} as { email?: string; createdAt?: string },
    findPasswordValue: false
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    // 유저 데이터 초기화
    resetUser: (state) => {
      state.data = {} as IUserData;
    },
    // 유저 데이터 업데이트
    refreshUser: (state) => {
      // 유저의 정보를 불러옴
      const user = getAuth().currentUser;
      // locatlstroage에 유저 정보 저장
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        })
      );
      // 현재 유저 데이터를 data 저장
      state.data = {
        uid: user?.uid || "",
        displayName: user?.displayName || "",
        email: user?.email || "",
        photoURL: user?.photoURL || ""
      };
    },
    // 이메일 및 비밀번호 찾은 값 초기화
    resetFindAccountValue: (state) => {
      state.findEmailValue = {};
      state.findPasswordValue = false;
    }
  },
  extraReducers: (builder) => {
    // 로그인
    builder.addCase(thuckFetchLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(thuckFetchLogin.fulfilled, (state) => {
      state.isLoading = false;
      // 현재 유저 정보를 불러옴
      const user = getAuth().currentUser;
      // 현재 유저 데이터를 data에 저장
      state.data = {
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
    builder.addCase(thuckFetchLogin.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.toString();
      }
      // firebase에서 보내는 에러 메세지를 통해 로그인 발생하는 에러 메세지 출력
      if (state.error.includes("auth/invalid-email")) {
        sweetToast("유효하지 않은 이메일 형식 입니다!", "warning");
      } else if (state.error.includes("auth/missing-email")) {
        sweetToast("존재하지 않는 이메일 입니다!", "warning");
      } else if (state.error.includes("auth/user-not-found")) {
        sweetToast("일치 하는 로그인 정보가 없습니다!", "warning");
        return;
      } else if (state.error.includes("auth/wrong-password")) {
        sweetToast("아이디 또는 비밀번호가 일치하지 않습니다!", "warning");
        return;
      } else if (state.error.includes("auth/too-many-requests")) {
        sweetToast(
          "많은 로그인 시도로 로그인이 일시적으로 제한됩니다!",
          "warning"
        );
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
    });

    // 소셜 로그인
    builder.addCase(thuckFetchSocialLogin.fulfilled, (state) => {
      // 현재 유저 정보를 불러옴
      const user = getAuth().currentUser;
      // 현재 유저 데이터를 data에 저장
      state.data = {
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
    builder.addCase(thuckFetchSocialLogin.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.toString();
      }
      if (
        state.error.includes("auth/account-exists-with-different-credential")
      ) {
        sweetToast("이미 가입된 이메일 계정입니다!", "warning");
      }
    });

    // 이메일 찾기
    builder.addCase(thuckFetchFindEmail.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(thuckFetchFindEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.findEmailValue = action.payload;
    });
    builder.addCase(thuckFetchFindEmail.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.message;
      }
      console.log(state.error);
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
    });

    // 비밀번호 변경
    builder.addCase(thuckFetchChangePassowrd.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(thuckFetchChangePassowrd.fulfilled, (state, action) => {
      state.isLoading = false;
      state.findPasswordValue = action.payload;
    });
    builder.addCase(thuckFetchChangePassowrd.rejected, (state, action) => {
      if (action.payload) {
        state.error = action.payload.message;
      }
      sweetToast(
        "알 수 없는 오류가 발생하였습니다.\n잠시 후 다시 시도해주세요.",
        "warning"
      );
      state.isLoading = false;
    });
  }
});
