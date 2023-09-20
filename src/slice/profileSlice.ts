import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IKnownError, IProfileData } from "../api/apiType";
import { fetchProfile } from "../api/firebase/profileAPI";
import { sweetToast } from "../library/sweetAlert/sweetAlert";

export const thunkFetchUserProfile = createAsyncThunk<
  IProfileData | undefined,
  void,
  { rejectValue: IKnownError }
>("profileSlice/thunkFetchUserProfile", async (_, thuckAPI) => {
  try {
    const res = await fetchProfile();
    return res;
  } catch (error: any) {
    return thuckAPI.rejectWithValue(error);
  }
});

export const profileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    profileData: {} as IProfileData,
    error: ""
  },
  reducers: {
    setprofile: (state, action) => {
      state.profileData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(thunkFetchUserProfile.fulfilled, (state, action) => {
      if (action.payload) state.profileData = action.payload;
    });
    builder.addCase(thunkFetchUserProfile.rejected, (state, action) => {
      if (action.payload) state.error = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.error);
    });
  }
});
