import React from "react";
import { SearchItem } from "../../../../../searchMapModal.styles";
import { IMapData } from "../../../../../../../../api/apiType";
import SelectedMapBtn from "./selectedMapBtn/SelectedMapBtn";
import SearchMapResultItemContent from "./SearchMapResultItemContent/SearchMapResultItemContent";

interface IProps {
  isTasteMapPage: boolean;
  data: IMapData;
  isLastSelectBtn: boolean;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
}

export default function SearchMapResultItem({
  isTasteMapPage,
  data,
  isLastSelectBtn,
  lastResultSelectBtnRef
}: IProps) {
  return (
    <SearchItem>
      <SearchMapResultItemContent data={data} />
      <SelectedMapBtn
        isTasteMapPage={isTasteMapPage}
        isLastSelectBtn={isLastSelectBtn}
        data={data}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
      />
    </SearchItem>
  );
}
