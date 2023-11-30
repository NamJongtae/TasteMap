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
import { IMapData } from "../../../api/apiType";

interface IProps {
  data: IMapData[];
  mapRef: React.RefObject<HTMLDivElement>;
  roadview: boolean;
  setRoadview: React.Dispatch<React.SetStateAction<boolean>>;
  zoomIn: () => void;
  zoomOut: () => void;
  rvWrapperRef: React.RefObject<HTMLDivElement>;
  roadViewRef: React.RefObject<HTMLDivElement>;
  isTasteMapPage: boolean;
  isWebpSupported: boolean | null;
}
export default function KakaomapUI({
  data,
  mapRef,
  roadview,
  setRoadview,
  zoomIn,
  zoomOut,
  rvWrapperRef,
  roadViewRef,
  isTasteMapPage,
  isWebpSupported
}: IProps) {
  return (
    <>
      {data.length > 0 ? (
        <Wrapper>
          <Title className='a11y-hidden'>맛집 지도</Title>
          <MapContainer ref={mapRef}>
            <MapBtnWrapper>
              <RoadViewBtn
                title='로드뷰'
                onClick={() => setRoadview(!roadview)}
                aria-label='로드뷰'
                roadview={roadview}
                $isWebpSupported={isWebpSupported}
              />
              <ZoomInBtn
                title='확대'
                onClick={zoomIn}
                aria-label='확대'
                $isWebpSupported={isWebpSupported}
              />
              <ZoomOutBtn
                title='축소'
                onClick={zoomOut}
                aria-label='축소'
                $isWebpSupported={isWebpSupported}
              />
            </MapBtnWrapper>
          </MapContainer>
          {roadview && (
            <RvWrapper ref={rvWrapperRef}>
              <Roadview ref={roadViewRef}></Roadview>
            </RvWrapper>
          )}
        </Wrapper>
      ) : (
        <NoKakaoMap $isWebpSupported={isWebpSupported}>
          <NoKakaoMapText>
            {isTasteMapPage
              ? "저장된 맛집이 없습니다.\n맛집 추가을 통해 맛집을 추가해주세요."
              : "선택된 맛집이 없습니다.\n맛집 검색을 통해 맛집을 선택해주세요."}
          </NoKakaoMapText>
        </NoKakaoMap>
      )}
    </>
  );
}
