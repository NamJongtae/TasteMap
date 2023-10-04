import React, { useEffect, useState } from "react";
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
import { thunkFetchMyProfile } from "../../slice/profileSlice";
import {
  InvaildMap,
  InvaildMapImg,
  InvaildMapText,
  Title,
  TitleImg
} from "./ShareTasteMap.styles";
import { resolveWebp } from "../../library/webpSupport";

export default function ShareTasteMap() {
  const { uid } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
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
      (async () => {
        setIsLoading(true);
        await dispatch(thunkFetchMyProfile(uid));
        setIsLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    console.log(myProfileData);
  }, [myProfileData]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!myProfileData.storedMapList ? (
            <InvaildMap>
              <InvaildMapImg
                src={resolveWebp("/assets/webp/icon-cloche.webp", "svg")}
              />
              <InvaildMapText>유효하지 않은 맛집 지도입니다.</InvaildMapText>
            </InvaildMap>
          ) : (
            <>
              <Wrapper>
                <ContetnTypeBtnWrapper>
                  <MapBtn
                    onClick={onClickMapType}
                    contentType={contentType}
                    style={{ top: "15px" }}
                  >
                    지도
                  </MapBtn>
                  <ListBtn
                    onClick={onClickListType}
                    contentType={contentType}
                    style={{ top: "15px" }}
                  >
                    목록
                  </ListBtn>
                </ContetnTypeBtnWrapper>
                <Title>
                  <TitleImg src={"/assets/icon-searchMap.svg"} alt='맛집지도' />
                  {myProfileData.displayName}님의 맛집 지도
                </Title>
                <KakaomapWrapper contentType={contentType}>
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
                  </ItemSingleList>
                )}
                {contentType === "list" && (
                  <MyTasteMapList
                    items={myProfileData.storedMapList}
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
