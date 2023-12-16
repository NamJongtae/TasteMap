import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback } from "react";
import { sweetConfirm } from "../../../library/sweetAlert/sweetAlert";
import { useRemoveTasteMapMutation } from "../../query/profile/useRemoveTasteMapMutation";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { IMapData } from "../../../api/apiType";

export const useTasteMapRemove = () => {
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  const { mutate: removeTasstMapMutate } = useRemoveTasteMapMutation();
  const dispatch = useDispatch<AppDispatch>();

  const removeTasteMapHanlder = useCallback(
    (mapData: IMapData) => {
      sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
        removeTasstMapMutate(mapData);
        dispatch(tasteMapSlice.actions.setClickMarkerData({} as IMapData));
      });
    },
    [clickMarkerData]
  );

  return { removeTasteMapHanlder };
};
