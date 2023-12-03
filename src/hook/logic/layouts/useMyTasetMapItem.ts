import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useRemoveTasteMapMutation } from "../../query/profile/useRemoveTasteMapMutation";
import { useCallback } from "react";
import { sweetConfirm } from "../../../library/sweetAlert/sweetAlert";
import { EMapContentType, tasteMapSlice } from "../../../slice/tasteMapSlice";
import {
  IMapData,
  IMyProfileData,
  IUserProfileData
} from "../../../api/apiType";

interface IProps {
  item: IMapData;
  profile: IMyProfileData | IUserProfileData;
}

export const useMyTasteMapItem = ({ item, profile }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: removeTasteMapMutate } = useRemoveTasteMapMutation();
  const removeMapHandler = useCallback(() => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      removeTasteMapMutate(item);
      dispatch(tasteMapSlice.actions.setClickMarkerData({} as IMapData));
      if (profile.storedMapList.length === 1) {
        dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
      }
    });
  }, [profile.storedMapList, item]);

  const activeMapTypeHandler = () => {
    dispatch(tasteMapSlice.actions.setClickMarkerData(item));
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
  };

  return { removeMapHandler, activeMapTypeHandler };
};
