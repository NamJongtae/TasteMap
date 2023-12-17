import { createSlice } from "@reduxjs/toolkit";

export const signupSlice = createSlice({
  name: "signupSlice",
  initialState: {
    percentage: 0,
    checkEmailDuplication: false,
    checkPhoneDuplication: false,
    checkDisplayNameDuplication: false
  },
  reducers: {
    addPercentage: (state, action: { payload: number }) => {
      state.percentage = state.percentage + action.payload;
    },
    minusPercentage: (state, action: { payload: number }) => {
      state.percentage = state.percentage - action.payload;
    },
    setCheckEmailDuplication: (state, action: { payload: boolean }) => {
      state.checkEmailDuplication = action.payload;
    },
    setCheckPhoneDuplication: (state, action: { payload: boolean }) => {
      state.checkPhoneDuplication = action.payload;
    },
    setCheckDisplayNameDuplication: (state, action: { payload: boolean }) => {
      state.checkDisplayNameDuplication = action.payload;
    }
  }
});
