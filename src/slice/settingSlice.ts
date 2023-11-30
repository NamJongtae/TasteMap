import { createSlice } from "@reduxjs/toolkit";

// webp 지원여부가 localstorage에 저장되어 있다면 불러옴
// 값이 없다면 null로 값을 처리
const storeWebpSuported = JSON.parse(
  localStorage.getItem("webpSupported") || "null"
);

export const settingSlice = createSlice({
  name: "settingSlice",
  initialState: {
    isWebpSupported: storeWebpSuported as boolean | null,
  },
  reducers: {
    setIsWebpSupproted: (state, action: { payload: boolean }) => {
      state.isWebpSupported = action.payload;
    }
  }
});
