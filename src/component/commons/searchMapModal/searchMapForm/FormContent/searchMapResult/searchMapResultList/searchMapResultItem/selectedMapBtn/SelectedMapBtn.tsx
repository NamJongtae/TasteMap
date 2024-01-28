import React from "react";
import { SelectedBtn } from "../../../../../../searchMapModal.styles";
import useSelectedResultMap from "../../../../../../../../../hook/logic/searchMapModal/useSelectedResultMap";
import { IMapData } from "../../../../../../../../../types/apiTypes";

interface IProps {
  isTasteMapPage: boolean;
  isLastSelectBtn: boolean;
  data: IMapData;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function SelectedMapBtn({
  isTasteMapPage,
  isLastSelectBtn,
  data,
  lastResultSelectBtnRef
}: IProps) {
  const { selectedResultMapHandler } = useSelectedResultMap({ isTasteMapPage });

  return (
    <SelectedBtn
      type='button'
      onClick={() => selectedResultMapHandler(data)}
      ref={isLastSelectBtn ? lastResultSelectBtnRef : null}
    >
      선택
    </SelectedBtn>
  );
}
