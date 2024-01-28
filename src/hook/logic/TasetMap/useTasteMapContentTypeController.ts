import { useDispatch, useSelector } from "react-redux";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { AppDispatch, RootState } from "../../../store/store";
import { useEffect } from "react";
import { EMapContentType } from "../../../types/types";

export const usetasteMapContentTypeController = () => {
  const dispatch = useDispatch<AppDispatch>();

  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );

  const activeMapTypeHanlder = () => {
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
  };

  const activeListTypeHanlder = () => {
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.LIST));
  };

  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
    };
  }, []);

  return { contentType, activeMapTypeHanlder, activeListTypeHanlder };
};
