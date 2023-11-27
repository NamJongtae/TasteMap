import { createSlice } from '@reduxjs/toolkit';
import { IMapData } from '../api/apiType';

export const enum EMapContentType {
  MAP="MAP",
  LIST="LIST"
}
export const tasteMapSlice = createSlice({
  name: "tasteMapSlice",
  initialState:{
    clickMarkerData: {} as IMapData,
    contentType: EMapContentType.MAP as EMapContentType,
  },
  reducers:{
    setClickMarkerData: (state, action) => {
      state.clickMarkerData = action.payload
    },
    setContentType: (state, action:{payload: EMapContentType}) => {
      state.contentType = action.payload;
    }
  }
})