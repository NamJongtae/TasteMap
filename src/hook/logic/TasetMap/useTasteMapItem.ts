import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useRemoveTasteMapMutation } from "../../query/profile/useRemoveTasteMapMutation";
import { useCallback } from "react";
import { sweetConfirm } from "../../../library/sweetAlert/sweetAlert";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import {
  IMapData,
  IMyProfileData,
  IUserProfileData
} from "../../../types/apiTypes";
import { EMapContentType } from "../../../types/types";

interface IProps {
  item: IMapData;
  profile: IMyProfileData | IUserProfileData | undefined;
}

export const useTasteMapItem = ({ item, profile }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: removeTasteMapMutate } = useRemoveTasteMapMutation();
  const removeMapHandler = useCallback(() => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      removeTasteMapMutate(item);
      dispatch(tasteMapSlice.actions.setClickMarkerData({} as IMapData));
      if (profile?.storedMapList.length === 1) {
        dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
      }
    });
  }, [profile?.storedMapList, item]);

  const focusMapeHandler = () => {
    dispatch(tasteMapSlice.actions.setClickMarkerData(item));
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
  };

  return { removeMapHandler, focusMapeHandler };
};
