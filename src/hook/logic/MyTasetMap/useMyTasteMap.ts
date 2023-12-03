import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback, useEffect } from "react";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { userSlice } from "../../../slice/userSlice";
import { useRemoveTasteMapMutation } from "../../query/profile/useRemoveTasteMapMutation";
import { EMapContentType, tasteMapSlice } from "../../../slice/tasteMapSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { searchSlice } from "../../../slice/searchSlice";
import { IMapData } from "../../../api/apiType";

export const useMyTasteMap = () => {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const dispatch = useDispatch<AppDispatch>();
  // 검색 모달창 오픈 여부
  const isOpenSearchMapModal = useSelector(
    (state: RootState) => state.search.isOpenSearchMapModal
  );

  const { data: myProfile, isPending: myProfileIsPending } = useMyProfileQuery(
    myInfo.uid
  );

  useEffect(() => {
    if (myProfile) {
      dispatch(userSlice.actions.setMyprofile(myProfile));
    }
  }, [myProfile]);

  const { mutate: removeTasstMapMutate } = useRemoveTasteMapMutation();

  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );

  const openSearchModal = () => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(true));
  };

  const closeSearchModalHandler = () => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(false));
  };

  const onClickMapType = () => {
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
  };

  const onClickListType = () => {
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.LIST));
  };

  const onClickShare = useCallback(async () => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    const url =
      window.document.location.host + `/tasteMap/share/${myProfile?.uid}`;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    sweetToast("맛집 지도 공유 링크가 복사되었습니다.", "success");
  }, []);

  const removeMap = useCallback(() => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      removeTasstMapMutate(clickMarkerData);
      dispatch(tasteMapSlice.actions.setClickMarkerData({} as IMapData));
    });
  }, [clickMarkerData]);

  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setSearchSelectedMap({} as IMapData));
      dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
      dispatch(tasteMapSlice.actions.setClickMarkerData({} as IMapData));
    };
  }, []);

  return {
    myProfile,
    onClickMapType,
    contentType,
    onClickListType,
    openSearchModal,
    clickMarkerData,
    isOpenSearchMapModal,
    closeSearchModalHandler,
    removeMap,
    onClickShare,
    myProfileIsPending
  };
};
