import { createSlice } from '@reduxjs/toolkit';
import { ISearchMapData } from '../api/apiType';

export const enum EContentType {
  MAP="MAP",
  LIST="LIST"
}
export const tasteMapSlice = createSlice({
  name: "tasteMapSlice",
  initialState:{
    clickMarkerData: {} as ISearchMapData,
    contentType: EContentType.MAP as EContentType,
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