import React from "react";
import {
  MarkerDataItem,
  MarkerDataLink,
  MarkerDataTag,
  MarkerDataText,
  MapTypeMarkerDataUl
} from "../../TasteMap.styles";
import TasteMapRemoveBtn from "../tasteMapRemoveBtn/TasteMapRemoveBtn";
import { useTasetMapMarkerData } from "../../../../../hook/logic/TasetMap/useTasetMapMarkerData";

interface IProps {
  isSharePage: boolean;
}
export default function MapTypeMarkerData({ isSharePage }: IProps) {
  const { clickMarkerData } = useTasetMapMarkerData();

  return clickMarkerData.title ? (
    <MapTypeMarkerDataUl>
      <MarkerDataItem>
        <MarkerDataTag>가게명</MarkerDataTag>
        <MarkerDataText>{clickMarkerData.title}</MarkerDataText>
      </MarkerDataItem>
      <MarkerDataItem>
        <MarkerDataTag>도로명 주소</MarkerDataTag>
        <MarkerDataText>{clickMarkerData.roadAddress}</MarkerDataText>
      </MarkerDataItem>
      <MarkerDataItem>
        <MarkerDataTag>지번 주소</MarkerDataTag>
        <MarkerDataText>{clickMarkerData.address}</MarkerDataText>
      </MarkerDataItem>
      <MarkerDataItem>
        <MarkerDataTag>카테고리</MarkerDataTag>
        <MarkerDataText>{clickMarkerData.category}</MarkerDataText>
      </MarkerDataItem>
      <MarkerDataItem>
        <MarkerDataTag>홈페이지</MarkerDataTag>
        <MarkerDataLink
          to={clickMarkerData.link || "#"}
          target='
      _blank'
        >
          {clickMarkerData.link}
        </MarkerDataLink>
      </MarkerDataItem>

      {!isSharePage && <TasteMapRemoveBtn />}
    </MapTypeMarkerDataUl>
  ) : null;
}
