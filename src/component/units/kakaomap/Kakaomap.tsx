import React from "react";
import "./mapWalker.style.css";
import { IMapData } from "../../../api/apiType";
import { useKakaomap } from "../../../hook/logic/kakaomap/useKakaomap";
import { MapContainer, Title, Wrapper } from "./kakaomap.styles";
import NoMapData from "./noMapData/NoMapData";
import Roadview from "./roadview/Roadview";
import MapBtns from "./mapBtns/MapBtns";
declare global {
  interface Window {
    kakao: any;
  }
}

interface IProps {
  items: IMapData[];
  isTasteMapPage: boolean;
  isSharePage: boolean;
}

function Kakaomap({ items, isTasteMapPage, isSharePage }: IProps) {
  const {
    data,
    mapRef,
    roadview,
    toggleRoadviewHandler,
    zoomIn,
    zoomOut,
    rvWrapperRef,
    roadviewRef
  } = useKakaomap({ items, isTasteMapPage, isSharePage });

  return data.length > 0 ? (
    <Wrapper>
      <Title className='a11y-hidden'>맛집 지도</Title>
      <MapContainer ref={mapRef}>
        <MapBtns
          toggleRoadviewHandler={toggleRoadviewHandler}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          roadview={roadview}
        />
      </MapContainer>
      {roadview && (
        <Roadview rvWrapperRef={rvWrapperRef} roadviewRef={roadviewRef} />
      )}
    </Wrapper>
  ) : (
    <NoMapData isTasteMapPage={isTasteMapPage} />
  );
}

function kakaomapEqual(prev: IProps, next: IProps) {
  return prev.items[0]?.mapx === next.items[0]?.mapx;
}
export default React.memo(Kakaomap, kakaomapEqual);
