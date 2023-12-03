import { createSlice } from "@reduxjs/toolkit";

// 검색 관련 슬라이스 ( 유저 검색, 지도 검색 )
export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchKeyword: "",
    pagePerData: 20,
    isOpenSearchMapModal: false,
  },
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setIsOpenSearchMapModal : (state, action:{payload: boolean})=> {
      if(action.payload){
        document.body.style.overflow = "hidden";
      }  else {
        document.body.style.overflow = "auto";
      }
      state.isOpenSearchMapModal = action.payload;
    }
  },
});
