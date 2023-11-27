import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState: {
    searchKeyword: "",
    pagePerData: 20,
  },
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    }
  },
});
