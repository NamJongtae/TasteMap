import React, { useCallback } from "react";
import {
  IMapData,
  IMyProfileData,
  IUserProfileData
} from "../../../api/apiType";
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
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { EMapContentType, tasteMapSlice } from "../../../slice/tasteMapSlice";
import { useRemoveTasteMapMutation } from "../../../hook/query/profile/useRemoveTasteMapMutation";
import { useSupportedWebp } from '../../../hook/useSupportedWebp';

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
  const dispatch = useDispatch<AppDispatch>();
  const { mutate: removeTasteMapMutate } = useRemoveTasteMapMutation();
  const removeMap = useCallback(() => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      removeTasteMapMutate(item);
      sweetToast("삭제가 완료되었습니다.", "success");
      dispatch(tasteMapSlice.actions.setClickMarkerData({}));
      if (profile.storedMapList.length === 1) {
        dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
      }
    });
  }, [profile.storedMapList]);

  const onClickFocusMap = () => {
    dispatch(tasteMapSlice.actions.setClickMarkerData(item));
    dispatch(tasteMapSlice.actions.setContentType(EMapContentType.MAP));
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
          <FocusMapBtn
            onClick={onClickFocusMap}
            title={"지도로 보기"}
            $isWebpSupported={isWebpSupported}
          />
          {!isShareTasteMap && (
            <RemoveBtn
              onClick={removeMap}
              title={"삭제"}
              $isWebpSupported={isWebpSupported}
            />
          )}
        </BtnWrapper>
      </ItemList>
    </MapInfoItem>
  );
}
