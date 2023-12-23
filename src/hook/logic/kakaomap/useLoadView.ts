import { useEffect, useRef, useState } from "react";
import { IMapData } from "../../../api/apiType";
import { useLVMarkersAndCustomoverlays } from "./useLVMarkersAndCustomoverlays";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  data: IMapData[];
  myMap: any;
}

export const useLoadView = ({ data, myMap }: IProps) => {
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  // roadview의 유무
  const [roadview, setRoadview] = useState(false);
  const [roadWalker, setRoadWalker] = useState<any>(null);
  const roadviewRef = useRef<HTMLDivElement>(null);
  const rvWrapperRef = useRef<HTMLDivElement>(null);

  // loadview의 markers와 customOverlays 관리 customhook
  const { roadMarker, roadViewMarkers, roadViewCutsomOverlays, onLoadView } =
    useLVMarkersAndCustomoverlays({
      data,
      roadview,
      roadviewRef,
      setRoadWalker
    });

  const toggleRoadviewHandler = () => {
    setRoadview((prev) => !prev);
  };

  const resetRoadview = (position: any) => {
    myMap.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
    setRoadview(false);
    myMap.setCenter(position);
  };

  const resetMarkers = () => {
    if (roadMarker) {
      roadMarker.setMap(null);
    }
    if (roadWalker) {
      roadWalker.setMap(null);
    }
  };

  // 로드뷰를 비활성화 했을 때 roadWalker가 남아있을 경우 제거
  useEffect(() => {
    if (!roadview) {
      // maker 및 customOverlay 초기화
      if (roadViewMarkers.length > 0) {
        for (let i = 0; i < roadViewMarkers.length; i++) {
          roadViewMarkers[i].setMap(null);
          roadViewCutsomOverlays[i].setMap(null);
        }
      }
      roadWalker && roadWalker.setMap(null);
    }
  }, [rvWrapperRef.current]);

  useEffect(() => {
    // map이 없을 시 리턴 맵 중복 생성 방지
    if (myMap === null || data.length === 0) {
      return;
    }
    // 로드 뷰가 true 일시 로드 뷰 활성화
    if (roadview) {
      const longitude = clickMarkerData.mapx
        ? parseInt(clickMarkerData.mapx as string) / 10000000
        : parseInt(data[0].mapx as string) / 10000000;
      const latitude = clickMarkerData.mapy
        ? parseInt(clickMarkerData.mapy as string) / 10000000
        : parseInt(data[0].mapy as string) / 10000000;
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      onLoadView(myMap, position);
    } else {
      // 로드 뷰가 false 라면 로드 뷰 제거 및 로드뷰 markerm walker 제거
      myMap &&
        myMap.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
      roadMarker && roadMarker.setMap(null);
      roadWalker && roadWalker.setMap(null);
    }
  }, [roadview]);

  return {
    roadview,
    toggleRoadviewHandler,
    setRoadview,
    resetRoadview,
    roadWalker,
    roadMarker,
    resetMarkers,
    roadViewMarkers,
    roadViewCutsomOverlays,
    roadviewRef,
    rvWrapperRef
  };
};
