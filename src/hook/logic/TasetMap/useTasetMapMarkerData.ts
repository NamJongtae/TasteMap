import { useEffect } from "react";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { IMapData } from "../../../types/apiTypes";

export const useTasetMapMarkerData = () => {
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setClickMarkerData({} as IMapData));
    };
  }, []);

  return { clickMarkerData };
};
