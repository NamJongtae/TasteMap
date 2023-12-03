import React from "react";
import {
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
  Wrapper
} from "../profile/myTasteMap/myTasteMap.styles";
import Loading from "../../component/commons/loading/Loading";
import Kakaomap from "../../component/units/kakaomap/Kakaomap";
import MyTasteMapList from "../profile/myTasteMap/MyTasteMapList";
import { EMapContentType } from "../../slice/tasteMapSlice";
import {
  InvaildMap,
  InvaildMapImg,
  InvaildMapText,
  Title,
  TitleImg
} from "./ShareTasteMap.styles";
import { Helmet } from "react-helmet-async";
import Header from "../../component/commons/layouts/header/Header";
import { IMapData, IUserProfileData } from "../../api/apiType";
import { useSupportedWebp } from "../../hook/useSupportedWebp";
import { useShareTasteMap } from "../../hook/logic/shareTasteMap/useShareTasteMap";

export default function ShareTasteMap() {
  const { resolveWebp } = useSupportedWebp();
  const {
    myInfo,
    userProfile,
    userIsFetching,
    clickedMarkerData,
    contentType,
    activeMapTypeHandler,
    activeListTypeHandler,
    isInvalidMap
  } = useShareTasteMap();

  if (userIsFetching) {
    return <Loading />;
  }

  if (isInvalidMap) {
    return (
      <InvaildMap>
        <InvaildMapImg
          src={resolveWebp("/assets/webp/icon-cloche.webp", "svg")}
        />
        <InvaildMapText>유효하지 않은 맛집 지도입니다.</InvaildMapText>
      </InvaildMap>
    );
  }

  return (
    <>
      <Helmet>
        <meta
          property='og:title'
          content={userProfile?.displayName + "님의 TasteMap"}
        />
        <meta property='og:type' content='webpsite' />
        <meta
          property='og:url'
          content={"https://tasteMap.site/tasteMap/share" + userProfile!.uid}
        />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/tastemap-c9a2a.appspot.com/o/images%2Fog%2Fog-img.png?alt=media&token=d4503b8e-af9e-4d6b-9367-268973d3104d&_gl=1*179wgyn*_ga*MTY1NzkxNDYxOC4xNjg4NTU5ODMy*_ga_CW55HF8NVT*MTY5NjQyMTkyOS4yMDEuMS4xNjk2NDIxOTcyLjE3LjAuMA..'
        />
        <meta
          property='og:description'
          content={
            (userProfile?.displayName || "") + "님이 공유하는 나만의 맛집 지도"
          }
          data-react-helmet='true'
        />
      </Helmet>
      <>
        <>
          {myInfo.uid && <Header type='profile' />}
          <Wrapper>
            <ContetnTypeBtnWrapper>
              <MapBtn
                onClick={activeMapTypeHandler}
                contentType={contentType}
                style={{ top: "0px" }}
              >
                지도
              </MapBtn>
              <ListBtn
                onClick={activeListTypeHandler}
                contentType={contentType}
                style={{ top: "0px" }}
              >
                목록
              </ListBtn>
            </ContetnTypeBtnWrapper>
            <Title>
              <TitleImg src={"/assets/icon-searchMap.svg"} alt='맛집지도' />
              {userProfile?.displayName}님의 맛집 지도
            </Title>
            <KakaomapWrapper contentType={contentType}>
              <Desc>마커 클릭 시 맛집 정보가 지도 아래 표시 됩니다.</Desc>
              <Kakaomap
                items={userProfile?.storedMapList || ({} as IMapData[])}
                isTasteMapPage={true}
              />
            </KakaomapWrapper>
            {clickedMarkerData.title && (
              <ItemSingleList contentType={contentType}>
                <Item>
                  <ItemTag>가게명</ItemTag>
                  <ItemText>{clickedMarkerData.title}</ItemText>
                </Item>
                <Item>
                  <ItemTag>도로명 주소</ItemTag>
                  <ItemText>{clickedMarkerData.roadAddress}</ItemText>
                </Item>
                <Item>
                  <ItemTag>지번 주소</ItemTag>
                  <ItemText>{clickedMarkerData.address}</ItemText>
                </Item>
                <Item>
                  <ItemTag>카테고리</ItemTag>
                  <ItemText>{clickedMarkerData.category}</ItemText>
                </Item>
                <Item>
                  <ItemTag>홈페이지</ItemTag>
                  <ItemLink
                    to={clickedMarkerData.link || "#"}
                    target='
              _blank'
                  >
                    {clickedMarkerData.link}
                  </ItemLink>
                </Item>
              </ItemSingleList>
            )}
            {contentType === EMapContentType.LIST && (
              <MyTasteMapList
                profile={userProfile || ({} as IUserProfileData)}
                items={userProfile!.storedMapList}
                isShareTasteMap={true}
              />
            )}
          </Wrapper>
        </>
      </>
    </>
  );
}
