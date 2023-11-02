import React, { useCallback, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

import { thunkFetchRemovePostMap } from "../../../slice/postSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import MyTasteMapUI from "./MyTasteMap.presenter";
import { thunkFetchMyProfile, userSlice } from '../../../slice/userSlice';

export default function MyTasteMap() {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const myProfile = useSelector(
    (state: RootState) => state.user.myProfile
  );
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const dispatch = useDispatch<AppDispatch>();
  // 검색 모달창 오픈 여부
  const [isOpenModal, setIsOpenModal] = useState(false);
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  useEffect(() => {
    if (myInfo.uid) {
      dispatch(thunkFetchMyProfile(myInfo.uid));
      // 초기 clickMarkerData 섷정 저장된 값중 제일 첫번째 요소로 지정
    }
  }, []);

  const openSearchModal = () => {
    setIsOpenModal(true);
  };

  const closeSearchModal = () => {
    setIsOpenModal(false);
  };

  const onClickMapType = () => {
    dispatch(tasteMapSlice.actions.setContentType("MAP"));
  };

  const onClickListType = () => {
    dispatch(tasteMapSlice.actions.setContentType("LIST"));
  };

  const onClickShare = useCallback(async () => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    const url =
      window.document.location.host + `/tasteMap/share/${myProfile.uid}`;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    sweetToast("맛집 지도 공유 링크가 복사되었습니다.", "success");
  },[]);

  const removeMap = useCallback(() => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      dispatch(thunkFetchRemovePostMap(clickMarkerData));
      const newData = {
        ...myProfile,
        storedMapList: myProfile.storedMapList.filter(
          (item) =>
            item.mapx !== clickMarkerData.mapx &&
            item.mapy !== clickMarkerData.mapy
        )
      };
      dispatch(userSlice.actions.setMyprofile(newData));
      sweetToast("삭제가 완료되었습니다.", "success");
      dispatch(tasteMapSlice.actions.setClickMarkerData({}));
    });
  },[]);

  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setClickMarkerData({}));
    };
  }, []);

  return (
    <MyTasteMapUI
      myProfile={myProfile}
      onClickMapType={onClickMapType}
      contentType={contentType}
      onClickListType={onClickListType}
      openSearchModal={openSearchModal}
      clickMarkerData={clickMarkerData}
      isOpenModal={isOpenModal}
      closeSearchModal={closeSearchModal}
      removeMap={removeMap}
      onClickShare={onClickShare}
    />
  );
}
