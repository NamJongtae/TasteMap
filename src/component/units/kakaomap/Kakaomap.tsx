import React from "react";
import "./kakaomap.styles.css";
import { IMapData } from "../../../api/apiType";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useKakaomap } from "../../../hook/logic/kakaomap/useKakaomap";
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
declare global {
  interface Window {
    kakao: any;
  }
}

interface IProps {
  items: IMapData[];
  isTasteMapPage: boolean;
}

function Kakaomap({ items, isTasteMapPage }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    data,
    mapRef,
    roadview,
    setRoadview,
    zoomIn,
    zoomOut,
    rvWrapperRef,
    roadviewRef
  } = useKakaomap({ items, isTasteMapPage });

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
              <Roadview ref={roadviewRef}></Roadview>
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

function kakaomapEqual(prev: IProps, next: IProps) {
  return prev.items[0]?.mapx === next.items[0]?.mapx;
}
export default React.memo(Kakaomap, kakaomapEqual);
