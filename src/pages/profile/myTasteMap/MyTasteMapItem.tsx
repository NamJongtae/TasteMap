import React from "react";
import { ISearchMapData } from "../../../api/apiType";
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
import { thunkFetchRemovePostMap } from "../../../slice/postSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { profileSlice } from "../../../slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";

interface IProps {
  item: ISearchMapData;
  isShareTasteMap: boolean;
}
export default function MyTasteMapItem({ item, isShareTasteMap }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const removeMap = () => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      dispatch(thunkFetchRemovePostMap(item));
      const newData = {
        ...myProfileData,
        storedMapList: myProfileData.storedMapList?.filter(
          (data) => data.mapx !== item.mapx && data.mapy !== item.mapy
        )
      };
      dispatch(profileSlice.actions.setMyprofile(newData));
      sweetToast("삭제가 완료되었습니다.", "success");
      dispatch(tasteMapSlice.actions.setClickMarkerData({}));
      if (newData.storedMapList && newData.storedMapList.length === 0) {
        dispatch(tasteMapSlice.actions.setContentType("map"));
      }
    });
  };

  const onClickFocusMap = () => {
    dispatch(tasteMapSlice.actions.setClickMarkerData(item));
    dispatch(tasteMapSlice.actions.setContentType("map"));
  };
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
          <FocusMapBtn onClick={onClickFocusMap} title={"지도로 보기"} />
          {!isShareTasteMap&&<RemoveBtn onClick={removeMap} title={"삭제"} />}
        </BtnWrapper>
      </ItemList>
    </MapInfoItem>
  );
}
