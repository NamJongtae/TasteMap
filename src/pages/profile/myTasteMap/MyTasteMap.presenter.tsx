import React from "react";
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
import { SearchModalBtn } from "../../postUpload/postUpload.styles";
import Header from "../../../compoent/commons/layouts/header/Header";
import Kakaomap from "../../../compoent/units/kakaomap/Kakaomap.container";
import MyTasteMapList from "./MyTasteMapList";
import SearchModal from "../../postUpload/SearchModal.container";
import Loading from "../../../compoent/commons/loading/Loading";
import { IProfileData, ISearchMapData } from "../../../api/apiType";
interface IProps {
  myProfileData: IProfileData;
  onClickMapType: () => void;
  contentType: "map" | "list";
  onClickListType: () => void;
  openSearchModal: () => void;
  clickMarkerData: ISearchMapData;
  isOpenModal: boolean;
  closeSearchModal: () => void;
  removeMap: () => void;
}

export default function MyTasteMapUI({
  myProfileData,
  onClickMapType,
  contentType,
  onClickListType,
  openSearchModal,
  clickMarkerData,
  isOpenModal,
  closeSearchModal,
  removeMap,
}: IProps) {
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
