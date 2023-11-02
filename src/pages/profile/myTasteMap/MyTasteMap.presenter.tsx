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
  ShareBtn,
  Wrapper
} from "./myTasteMap.styles";
import { SearchModalBtn } from "../../postUpload/postUpload.styles";
import Header from "../../../component/commons/layouts/header/Header";
import Kakaomap from "../../../component/units/kakaomap/Kakaomap.container";
import MyTasteMapList from "./MyTasteMapList";
import SearchModal from "../../postUpload/SearchModal.container";
import Loading from "../../../component/commons/loading/Loading";
import { IProfileData, ISearchMapData } from "../../../api/apiType";
import { EContentType } from '../../../slice/tasteMapSlice';
interface IProps {
  myProfile: IProfileData;
  onClickMapType: () => void;
  contentType: EContentType
  onClickListType: () => void;
  openSearchModal: () => void;
  clickMarkerData: ISearchMapData;
  isOpenModal: boolean;
  closeSearchModal: () => void;
  removeMap: () => void;
  onClickShare: () => Promise<void>;
}

export default function MyTasteMapUI({
  myProfile,
  onClickMapType,
  contentType,
  onClickListType,
  openSearchModal,
  clickMarkerData,
  isOpenModal,
  closeSearchModal,
  removeMap,
  onClickShare
}: IProps) {
  return (
    <>
      {!myProfile.storedMapList ? (
        <Loading />
      ) : (
        <>
          <Header type='tasteMap' />
          <Wrapper>
            <h2 className='a11y-hidden'>나의 맛집 지도</h2>
            <ContetnTypeBtnWrapper>
              <MapBtn onClick={onClickMapType} contentType={contentType}>
                지도
              </MapBtn>
              <ListBtn onClick={onClickListType} contentType={contentType}>
                목록
              </ListBtn>
              {contentType === EContentType.MAP && (
                <SearchModalBtn onClick={openSearchModal}>
                  맛집 추가
                </SearchModalBtn>
              )}
              {contentType === EContentType.MAP && (
                <ShareBtn onClick={onClickShare} aria-label='공유' />
              )}
            </ContetnTypeBtnWrapper>
            <KakaomapWrapper contentType={contentType}>
              <Desc>마커 클릭 시 맛집 정보가 지도 아래 표시 됩니다.</Desc>
              {myProfile.storedMapList && (
                <Kakaomap
                  items={myProfile.storedMapList}
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
            {contentType === EContentType.LIST && (
              <MyTasteMapList
                items={myProfile.storedMapList}
                isShareTasteMap={false}
              />
            )}
            {isOpenModal && <SearchModal closeSearchModal={closeSearchModal} />}
          </Wrapper>
        </>
      )}
    </>
  );
}
