import React from "react";
import { IMapData, IMyProfileData, IUserProfileData } from "../../api/apiType";
import {
  BtnWrapper,
  FocusMapBtn,
  Item,
  ItemLink,
  ItemList,
  ItemTag,
  ItemText,
  MapInfoItem,
  RemoveBtn
} from "./myTasteMap.styles";
import { useSupportedWebp } from "../../hook/useSupportedWebp";
import { useMyTasteMapItem } from "../../hook/logic/MyTasetMap/useMyTasteMapItem";

interface IProps {
  item: IMapData;
  isShareTasteMap: boolean;
  profile: IMyProfileData | IUserProfileData;
}
export default function MyTasteMapItem({
  item,
  isShareTasteMap,
  profile
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const { removeMapHandler, activeMapTypeHandler } = useMyTasteMapItem({
    item,
    profile
  });

  return (
    <MapInfoItem>
      <ItemList>
        <Item>
          <ItemTag>가게명</ItemTag>
          <ItemText>{item.title}</ItemText>
        </Item>
        <Item>
          <ItemTag>도로명 주소</ItemTag>
          <ItemText>{item.roadAddress}</ItemText>
        </Item>
        <Item>
          <ItemTag>지번 주소</ItemTag>
          <ItemText>{item.address}</ItemText>
        </Item>
        <Item>
          <ItemTag>카테고리</ItemTag>
          <ItemText>{item.category}</ItemText>
        </Item>
        <Item>
          <ItemTag>홈페이지</ItemTag>
          <ItemLink to={item.link || "#"} target='_blank'>
            {item.link}
          </ItemLink>
        </Item>
        <BtnWrapper>
          <FocusMapBtn
            onClick={activeMapTypeHandler}
            title={"지도로 보기"}
            $isWebpSupported={isWebpSupported}
          />
          {!isShareTasteMap && (
            <RemoveBtn
              onClick={removeMapHandler}
              title={"삭제"}
              $isWebpSupported={isWebpSupported}
            />
          )}
        </BtnWrapper>
      </ItemList>
    </MapInfoItem>
  );
}
