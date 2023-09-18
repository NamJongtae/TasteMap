import React from "react";
import {
  MapBtnWrapper,
  MapContainer,
  NoKakaoMap,
  NoKakaoMapText,
  RoadViewBtn,
  Roadview,
  RvWrapper,
  Title,
  Wrapper,
  ZoomInBtn,
  ZoomOutBtn
} from "./kakaomap.styles";
import { ISearchMapData } from "../../../api/apiType";

interface IProps {
  items: ISearchMapData[];
  mapRef: React.RefObject<HTMLDivElement>;
  roadview: boolean;
  setRoadview: React.Dispatch<React.SetStateAction<boolean>>;
  zoomIn: () => void;
  zoomOut: () => void;
  rvWrapperRef: React.RefObject<HTMLDivElement>;
  roadViewRef: React.RefObject<HTMLDivElement>;
}
export default function KakaomapUI({
  items,
  mapRef,
  roadview,
  setRoadview,
  zoomIn,
  zoomOut,
  rvWrapperRef,
  roadViewRef
}: IProps) {
  return (
    <>
      {items.length > 0 ? (
        <Wrapper>
          <Title className='a11y-hidden'>맛집 지도</Title>
          <MapContainer ref={mapRef}>
            <MapBtnWrapper>
              <RoadViewBtn
                title='로드뷰'
                onClick={() => setRoadview(!roadview)}
                aria-label='로드뷰'
                roadview={roadview}
              />
              <ZoomInBtn title='확대' onClick={zoomIn} aria-label='확대' />
              <ZoomOutBtn title='축소' onClick={zoomOut} aria-label='축소' />
            </MapBtnWrapper>
          </MapContainer>
          {roadview && (
            <RvWrapper ref={rvWrapperRef}>
              <Roadview ref={roadViewRef}></Roadview>
            </RvWrapper>
          )}
        </Wrapper>
      ) : (
        <NoKakaoMap>
          <NoKakaoMapText>
            {"선택된 맛집이 없습니다.\n맛집 검색을 통해 맛집을 선택해주세요."}
          </NoKakaoMapText>
        </NoKakaoMap>
      )}
    </>
  );
}
