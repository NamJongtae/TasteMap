import React, { useEffect, useState } from "react";
import Kakaomap from "../../../compoent/units/kakaomap/Kakaomap.container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import Header from "../../../compoent/commons/layouts/header/Header";
import MyTasteMapList from "./MyTasteMapList";
import {
  BtnWrapper,
  ContetnTypeBtnWrapper,
  Desc,
  Item,
  ItemLink,
  ItemSingleList,
  ItemTag,
  ItemText,
  KakaomapWrapper,
  ListBtn,
  MapBtn,
  RemoveBtn,
  Wrapper
} from "./myTasteMap.styles";
import { profileSlice, thunkFetchMyProfile } from "../../../slice/profileSlice";
import { SearchModalBtn } from "../../postUpload/postUpload.styles";
import SearchModal from "../../postUpload/SearchModal";
import Loading from "../../../compoent/commons/loading/Loading";
import { thunkFetchRemovePostMap } from "../../../slice/postSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";

export default function MyTasteMap() {
  const userData = useSelector((state: RootState) => state.user.data);
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const dispatch = useDispatch<AppDispatch>();
  // 검색 모달창 오픈 여부
  const [isOpenModal, setIsOpenModal] = useState(false);
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  useEffect(() => {
    if (userData.uid) {
      dispatch(thunkFetchMyProfile(userData.uid));
      // 초기 clickMarkerData 섷정 저장된 값중 제일 첫번째 요소로 지정
    }
  }, []);

  const openSearchModal = () => {
    setIsOpenModal(true);
  };

  const closeSearchModal = () => {
    setIsOpenModal(false);
  };

  const onClickMapType = () => {
    dispatch(tasteMapSlice.actions.setContentType("map"));
  };

  const onClickListType = () => {
    dispatch(tasteMapSlice.actions.setContentType("list"));
  };

  const removeMap = () => {
    sweetConfirm("정말 삭제하시겠습니까?", "삭제", "취소", () => {
      dispatch(thunkFetchRemovePostMap(clickMarkerData));
      const newData = {
        ...myProfileData,
        storedMapList: myProfileData.storedMapList?.filter(
          (item) =>
            item.mapx !== clickMarkerData.mapx &&
            item.mapy !== clickMarkerData.mapy
        )
      };
      dispatch(profileSlice.actions.setMyprofile(newData));
      sweetToast("삭제가 완료되었습니다.", "success");
      dispatch(tasteMapSlice.actions.setClickMarkerData({}));
    });
  };

  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setClickMarkerData({}));
    };
  }, []);

  return (
    <>
      {!myProfileData.storedMapList ? (
        <Loading />
      ) : (
        <>
          <Header type='tasteMap' />
          {myProfileData.storedMapList.length > 0 && (
            <ContetnTypeBtnWrapper>
              <MapBtn onClick={onClickMapType} contentType={contentType}>
                지도
              </MapBtn>
              <ListBtn onClick={onClickListType} contentType={contentType}>
                목록
              </ListBtn>
            </ContetnTypeBtnWrapper>
          )}

          <Wrapper>
            <h2 className='a11y-hidden'>나의 맛집 지도</h2>

            <KakaomapWrapper contentType={contentType}>
              <SearchModalBtn onClick={openSearchModal}>
                맛집 추가
              </SearchModalBtn>
              <Desc>마커 클릭 시 맛집 정보가 지도 아래 표시 됩니다.</Desc>
              {myProfileData.storedMapList && (
                <Kakaomap
                  items={myProfileData.storedMapList}
                  isTasteMapPage={true}
                />
              )}
            </KakaomapWrapper>
            {clickMarkerData.title && (
              <ItemSingleList contentType={contentType}>
                <Item>
                  <ItemTag>가게명</ItemTag>
                  <ItemText>{clickMarkerData.title}</ItemText>
                </Item>
                <Item>
                  <ItemTag>도로명 주소</ItemTag>
                  <ItemText>{clickMarkerData.roadAddress}</ItemText>
                </Item>
                <Item>
                  <ItemTag>지번 주소</ItemTag>
                  <ItemText>{clickMarkerData.address}</ItemText>
                </Item>
                <Item>
                  <ItemTag>카테고리</ItemTag>
                  <ItemText>{clickMarkerData.category}</ItemText>
                </Item>
                <Item>
                  <ItemTag>홈페이지</ItemTag>
                  <ItemLink
                    to={clickMarkerData.link || "#"}
                    target='
                  _blank'
                  >
                    {clickMarkerData.link}
                  </ItemLink>
                </Item>
                <BtnWrapper>
                  <RemoveBtn aria-label='삭제' onClick={removeMap} />
                </BtnWrapper>
              </ItemSingleList>
            )}
            {}
            {contentType === "list" && (
              <MyTasteMapList items={myProfileData.storedMapList} />
            )}
            {isOpenModal && <SearchModal closeSearchModal={closeSearchModal} />}
          </Wrapper>
        </>
      )}
    </>
  );
}
