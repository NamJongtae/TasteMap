import { createSlice } from "@reduxjs/toolkit";
import { IUserData, IMyProfileData, IUserProfileData } from "../types/apiTypes";

// locatlStroage에 저장된 유저 데이터 불러오기
const userDataString = localStorage.getItem("user");
const userData = JSON.parse(userDataString || "{}");

// user data, profile 페이지 관련 data 및 state 관리
export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    myInfo: userData as IUserData,
    myProfile: {} as IMyProfileData,
    userProfile: {} as IUserProfileData,
    followsPagePerData: 20,
    isOpenFollowerModal: false,
    isOpenFollowingModal: false,
    isOpenUpdateProfileModal: false
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
    setIsOpenFollowerModal: (state, action: { payload: boolean }) => {
      if (action.payload) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      state.isOpenFollowerModal = action.payload;
    },
    setIsOpenFollowingModal: (state, action: { payload: boolean }) => {
      if (action.payload) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      state.isOpenFollowingModal = action.payload;
    },
    setIsOpenUpdateProfileModal: (state, action: { payload: boolean }) => {
      if (action.payload) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      state.isOpenUpdateProfileModal = action.payload;
    }
  }
});
