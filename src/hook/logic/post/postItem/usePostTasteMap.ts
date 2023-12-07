import { useCallback } from "react";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { useAddTasteMapMutation } from "../../../query/profile/useAddTasteMapMutation";
import { useRemoveTasteMapMutation } from "../../../query/profile/useRemoveTasteMapMutation";
import { IMapData, IMyProfileData, IPostData } from "../../../../api/apiType";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
}

export const usePostTasteMap = ({ data, myProfile }: IProps) => {
  // 맛집 지도 추가 유무
  const isStoredMap = !!myProfile.storedMapList.find(
    (v) => v.mapx === data.mapData?.mapx && v.mapy === data.mapData?.mapy
  );

  const { mutate: addTasteMapMutate } = useAddTasteMapMutation();
  const { mutate: removeTasteMapMutate } = useRemoveTasteMapMutation();

  const addTasteMap = useCallback(
    (mapData: IMapData) => {
      if (mapData) {
        if (myProfile.storedMapList.length > 20) {
          sweetToast("저장 가능한 맛집 수를 초과하였습니다\n(최대 20개)");
        }
        addTasteMapMutate(mapData);
      }
    },
    [myProfile]
  );

  const removeTasteMap = useCallback((mapData: IMapData) => {
    if (mapData) {
      removeTasteMapMutate(mapData);
    }
  }, []);

  const toggleTasteMapHandler = useCallback(
    (postData: IPostData) => {
      if (!postData || !myProfile.storedMapList) return;

      if (!isStoredMap) {
        addTasteMap(postData.mapData);
      } else {
        removeTasteMap(postData.mapData);
      }
    },
    [myProfile, isStoredMap]
  );

  return { isStoredMap, toggleTasteMapHandler };
};
