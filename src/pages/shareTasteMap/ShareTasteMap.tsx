import React, { useEffect } from "react";
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
import Loading from "../../compoent/commons/loading/Loading";
import { useParams } from "react-router-dom";
import Kakaomap from "../../compoent/units/kakaomap/Kakaomap.container";
import MyTasteMapList from "../profile/myTasteMap/MyTasteMapList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { tasteMapSlice } from "../../slice/tasteMapSlice";
import {
  InvaildMap,
  InvaildMapImg,
  InvaildMapText,
  Title,
  TitleImg
} from "./ShareTasteMap.styles";
import { resolveWebp } from "../../library/webpSupport";
import { Helmet } from "react-helmet-async";
import Header from "../../compoent/commons/layouts/header/Header";
import { thunkFetchMyProfile } from "../../slice/userSlice";

export default function ShareTasteMap() {
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const myProfile = useSelector((state: RootState) => state.user.myProfile);
  const loadMyProfileLoading = useSelector((state: RootState) => state.user.loadMyProfileLoading);
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const dispatch = useDispatch<AppDispatch>();

  const onClickMapType = () => {
    dispatch(tasteMapSlice.actions.setContentType("map"));
  };

  const onClickListType = () => {
    dispatch(tasteMapSlice.actions.setContentType("list"));
  };

  useEffect(() => {
    if (uid) {
      dispatch(thunkFetchMyProfile(uid));
    }
  }, []);

  return (
    <>
      <Helmet>
        <meta
          property='og:title'
          content={(myProfile.displayName || "") + "님의 TasteMap"}
        />
        <meta property='og:type' content='webpsite' />
        <meta
          property='og:url'
          content={"https://tasteMap.site/tasteMap/share" + myProfile.uid}
        />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/tastemap-c9a2a.appspot.com/o/images%2Fog%2Fog-img.png?alt=media&token=d4503b8e-af9e-4d6b-9367-268973d3104d&_gl=1*179wgyn*_ga*MTY1NzkxNDYxOC4xNjg4NTU5ODMy*_ga_CW55HF8NVT*MTY5NjQyMTkyOS4yMDEuMS4xNjk2NDIxOTcyLjE3LjAuMA..'
        />
        <meta
          property='og:description'
          content={
            (myProfile.displayName || "") + "님이 공유하는 나만의 맛집 지도"
          }
          data-react-helmet='true'
        />
      </Helmet>
      {loadMyProfileLoading ? (
        <Loading />
      ) : (
        <>
          {!myProfile.storedMapList ? (
            <InvaildMap>
              <InvaildMapImg
                src={resolveWebp("/assets/webp/icon-cloche.webp", "svg")}
              />
              <InvaildMapText>유효하지 않은 맛집 지도입니다.</InvaildMapText>
            </InvaildMap>
          ) : (
            <>
              {myInfo && myInfo.uid && <Header type='profile' />}
              <Wrapper>
                <ContetnTypeBtnWrapper>
                  <MapBtn
                    onClick={onClickMapType}
                    contentType={contentType}
                    style={{ top: "0px" }}
                  >
                    지도
                  </MapBtn>
                  <ListBtn
                    onClick={onClickListType}
                    contentType={contentType}
                    style={{ top: "0px" }}
                  >
                    목록
                  </ListBtn>
                </ContetnTypeBtnWrapper>
                <Title>
                  <TitleImg src={"/assets/icon-searchMap.svg"} alt='맛집지도' />
                  {myProfile.displayName}님의 맛집 지도
                </Title>
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
                  </ItemSingleList>
                )}
                {contentType === "list" && (
                  <MyTasteMapList
                    items={myProfile.storedMapList}
                    isShareTasteMap={true}
                  />
                )}
              </Wrapper>
            </>
          )}
        </>
      )}
    </>
  );
}
