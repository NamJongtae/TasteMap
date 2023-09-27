import { createSlice } from '@reduxjs/toolkit';
import { ISearchMapData } from '../api/apiType';

export const tasteMapSlice = createSlice({
  name: "tasteMapSlice",
  initialState:{
    clickMarkerData: {} as ISearchMapData,
    contentType: "map" as "map"|"list",
  },
  reducers:{
    setClickMarkerData: (state, action) => {
      state.clickMarkerData = action.payload
    },
    setContentType: (state, action) => {
      state.contentType = action.payload;
    }
  }
})