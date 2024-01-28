import React from "react";
import { IMapData } from "../../../../../../types/apiTypes";
import {
  BtnWrapper,
  FocusMapBtn,
  MarkerDataLink,
  MarkerDataTag,
  MarkerDataText,
  RemoveBtn,
  MarkerDataItem,
  MarkerDataList,
  ListTypeMarkDataLi
} from "../../../TasteMap.styles";
import { useSupportedWebp } from "../../../../../../hook/useSupportedWebp";
import { useTasteMapRemove } from "../../../../../../hook/logic/TasetMap/useTasteMapRemove";
import { useTasteMapFocus } from "../../../../../../hook/logic/TasetMap/useTasteMapFocus";

interface IProps {
  item: IMapData;
  isSharePage: boolean;
}

export default function ListTypeMarkerDataItem({ item, isSharePage }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const { removeTasteMapHanlder } = useTasteMapRemove();
  const { focusMapeHandler } = useTasteMapFocus({ mapData: item });

  return (
    <ListTypeMarkDataLi>
      <MarkerDataList>
        <MarkerDataItem>
          <MarkerDataTag>가게명</MarkerDataTag>
          <MarkerDataText>{item.title}</MarkerDataText>
        </MarkerDataItem>
        <MarkerDataItem>
          <MarkerDataTag>도로명 주소</MarkerDataTag>
          <MarkerDataText>{item.roadAddress}</MarkerDataText>
        </MarkerDataItem>
        <MarkerDataItem>
          <MarkerDataTag>지번 주소</MarkerDataTag>
          <MarkerDataText>{item.address}</MarkerDataText>
        </MarkerDataItem>
        <MarkerDataItem>
          <MarkerDataTag>카테고리</MarkerDataTag>
          <MarkerDataText>{item.category}</MarkerDataText>
        </MarkerDataItem>
        <MarkerDataItem>
          <MarkerDataTag>홈페이지</MarkerDataTag>
          <MarkerDataLink to={item.link || "#"} target='_blank'>
            {item.link}
          </MarkerDataLink>
        </MarkerDataItem>
        <BtnWrapper>
          <FocusMapBtn
            onClick={focusMapeHandler}
            title={"지도로 보기"}
            $isWebpSupported={isWebpSupported}
          />
          {!isSharePage && (
            <RemoveBtn
              onClick={() => removeTasteMapHanlder(item)}
              title={"삭제"}
              $isWebpSupported={isWebpSupported}
            />
          )}
        </BtnWrapper>
      </MarkerDataList>
    </ListTypeMarkDataLi>
  );
}
