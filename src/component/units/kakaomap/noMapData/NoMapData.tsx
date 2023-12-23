import React from "react";
import { Message, NoMapDataWrapper } from "../kakaomap.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IProps {
  isTasteMapPage: boolean;
}

export default function NoMapData({ isTasteMapPage }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <NoMapDataWrapper $isWebpSupported={isWebpSupported}>
      <Message>
        {isTasteMapPage
          ? "저장된 맛집이 없습니다.\n맛집 추가을 통해 맛집을 추가해주세요."
          : "선택된 맛집이 없습니다.\n맛집 검색을 통해 맛집을 선택해주세요."}
      </Message>
    </NoMapDataWrapper>
  );
}
