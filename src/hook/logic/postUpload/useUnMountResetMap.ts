import { useEffect } from "react";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { IMapData } from "../../../api/apiType";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";

export const useUnMountResetMap = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setSearchSelectedMap({} as IMapData));
    };
  }, []);
};
