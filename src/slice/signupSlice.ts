import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signup } from "../api/firebase/signupAPI";
import { userSlice } from "./userSlice";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
interface IKnownError {
  message: string;
}
interface ISignupParms {
  displayNameValue: string;
  uploadImg: File | "";
  emailValue: string;
  passwordValue: string;
  phoneValue: string;
  introduce: string;
}
// 회원가입
export const fetchSignup = createAsyncThunk<
  void,
  ISignupParms,
  { rejectValue: IKnownError }
>(
  "signupSlice/fetchSignup",
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
      await signup(
        displayNameValue,
        uploadImg,
        emailValue,
        passwordValue,
        phoneValue,
        introduce
      );
      thunkAPI.dispatch(userSlice.actions.refreshUser());
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signupSlice = createSlice({
  name: "signupSlice",
  initialState: {
    isLoading: false,
    error: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSignup.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSignup.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchSignup.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        state.error = action.payload.toString();
      }
      if (state.error.includes("email-already-in-use")) {
        sweetToast("이미 사용중인 이메일 입니다!", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.",
          "warning"
        );
      }
    });
  }
});
