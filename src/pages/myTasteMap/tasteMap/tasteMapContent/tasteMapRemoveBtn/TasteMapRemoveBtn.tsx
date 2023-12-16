import React from "react";
import { BtnWrapper, RemoveBtn } from "../../TasteMap.styles";
import { useTasteMapRemove } from "../../../../../hook/logic/TasetMap/useTasteMapRemove";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

export default function TasteMapRemoveBtn() {
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  const { removeTasteMapHanlder } = useTasteMapRemove();
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <BtnWrapper>
      <RemoveBtn
        aria-label='삭제'
        onClick={() => removeTasteMapHanlder(clickMarkerData)}
        $isWebpSupported={isWebpSupported}
      />
    </BtnWrapper>
  );
}
