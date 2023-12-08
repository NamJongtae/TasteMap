import { useDispatch } from "react-redux";
import { IMapData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useAddTasteMapMutation } from "../../query/profile/useAddTasteMapMutation";
import { useLoadMyProfile } from "../../useLoadMyProfile";
import { AppDispatch } from "../../../store/store";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";

export const useAddTasteMapDataFetch = () => {
  const { mutate: addTasteMapMutate } = useAddTasteMapMutation();
  const { myProfile, myProfileIsError } = useLoadMyProfile();
  const dispatch = useDispatch<AppDispatch>();

  const isMaxiumStoredMap = myProfile!.storedMapList.length > 20;

  const isCheckStoredMap = myProfile!.storedMapList?.find(
    (data: IMapData) => data.address === data.address
  );

  const addTasteMapHandler = (data: IMapData) => {
    if (myProfileIsError) {
      sweetToast(
        "프로필 정보를 불러올 수 없습니다!/n잠시후 다시 시도해주세요.",
        "warning"
      );
      return;
    }
    // 저장된 맛집 데이터가 20개 이상일 경우 맛집 저장 제한
    if (isMaxiumStoredMap) {
      sweetToast(
        "저장 가능한 맛집 수를 초과하였습니다.\n(최대 20개)",
        "warning",
        1500
      );
      return;
    }
    // 저장된 맛집 데이터에 추가할 맛집 데이터가 있다면 저장 제한
    if (isCheckStoredMap) {
      sweetToast("이미 추가된 맛집입니다!", "warning");
      return;
    }
    // 선택한 맛집 데이터를 api 함수를 통해 db에 저장
    addTasteMapMutate(data);
    // 추가한 맛집 상세정보를 표시하기 clickMapData를 선택한 맛집 데이터로 업데이트
    dispatch(tasteMapSlice.actions.setClickMarkerData(data));
  };

  return { addTasteMapHandler };
};
