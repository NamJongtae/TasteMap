import { createSlice } from "@reduxjs/toolkit";
import {
  IUserData,
  IMyProfileData,
  IUserProfileData,
} from "../api/apiType";

const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString || "{}");

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    myInfo: userData as IUserData,
    myProfile: {} as IMyProfileData,
    userProfile: {} as IUserProfileData,
    followsPagePerData: 20,
    isOpenFollowerModal: false,
    isOpenFollowingModal: false,
  },
  reducers: {
    setMyInfo: (state, action) => {
      state.myInfo = action.payload;
    },
    // 유저 데이터 초기화
    resetMyInfo: (state) => {
      state.myInfo = {} as IUserData;
    },
    setMyprofile: (state, action) => {
      state.myProfile = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  }
});
