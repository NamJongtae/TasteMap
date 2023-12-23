import React from "react";
import {
  MapBtnWrapper,
  RoadViewBtn,
  ZoomInBtn,
  ZoomOutBtn
} from "../kakaomap.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IProps {
  toggleRoadviewHandler: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  roadview: boolean;
}
export default function MapBtns({
  toggleRoadviewHandler,
  zoomIn,
  zoomOut,
  roadview
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <MapBtnWrapper>
      <RoadViewBtn
        title='로드뷰'
        onClick={toggleRoadviewHandler}
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
  );
}
