import React from "react";
import { OpenModalBtn } from "../../../TasteMap.styles";
import { useSearchMapModalController } from "../../../../../../hook/logic/searchMapModal/useSearchMapModalController";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";

export default function OpenSearchMapModalBtn() {
  const { openSearchModalHandler } = useSearchMapModalController();
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <OpenModalBtn
      onClick={openSearchModalHandler}
      $isWebpSupported={isWebpSupported}
    >
      맛집 추가
    </OpenModalBtn>
  );
}
