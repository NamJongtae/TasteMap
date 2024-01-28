import { createSlice } from "@reduxjs/toolkit";
import { IMapData } from "../types/apiTypes";
import { EMapContentType } from "../types/types";

export const tasteMapSlice = createSlice({
  name: "tasteMapSlice",
  initialState: {
    searchSelectedMap: {} as IMapData,
    clickMarkerData: {} as IMapData,
    contentType: EMapContentType.MAP as EMapContentType
  },
  reducers: {
    setSearchSelectedMap: (state, action: { payload: IMapData }) => {
      state.searchSelectedMap = action.payload;
    },
    setClickMarkerData: (state, action: { payload: IMapData }) => {
      state.clickMarkerData = action.payload;
    },
    setContentType: (state, action: { payload: EMapContentType }) => {
      state.contentType = action.payload;
    }
  }
});
