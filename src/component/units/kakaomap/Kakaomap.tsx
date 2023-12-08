import React from "react";
import "./mapWalker.style.css";
import { IMapData } from "../../../api/apiType";
import { useKakaomap } from "../../../hook/logic/kakaomap/useKakaomap";
import {
  MapBtnWrapper,
  MapContainer,
  RoadViewBtn,
  Title,
  Wrapper,
  ZoomInBtn,
  ZoomOutBtn
} from "./kakaomap.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import NoMapData from "./NoMapData/NoMapData";
import Roadview from "./roadview/Roadview";
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
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
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
            <Roadview rvWrapperRef={rvWrapperRef} roadviewRef={roadviewRef} />
          )}
        </Wrapper>
      ) : (
        <NoMapData isTasteMapPage={isTasteMapPage} />
      )}
    </>
  );
}

function kakaomapEqual(prev: IProps, next: IProps) {
  return prev.items[0]?.mapx === next.items[0]?.mapx;
}
export default React.memo(Kakaomap, kakaomapEqual);
