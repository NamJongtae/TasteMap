import { useEffect, useRef, useState } from "react";
import { IMapData } from "../../../api/apiType";
import { useLoadView } from "./useLoadView";
import { useMarkerAndCustomoverlays } from "./useMarkerAndCustomoverlays";
import { useLoadMyProfile } from "../../useLoadMyProfile";
import { useZoomController } from "./useZoomController";
import { useMapCenterOnSearchResult } from "./useMapCenterOnSearchResult";
import { useInitalizeMap } from "./useInitalizeMap";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  items: IMapData[];
  isTasteMapPage: boolean;
  isSharePage: boolean;
}

const INITAL_MAP_LEVEL = 14;

export const useKakaomap = ({ items, isTasteMapPage, isSharePage }: IProps) => {
  // 맛집 정보 데이터
  const [data, setData] = useState(items);
  // 생성한 map를 저장
  const [myMap, setMyMap] = useState<any>(null);

  const mapRef = useRef<HTMLDivElement>(null);

  const { myProfile } = useLoadMyProfile();
  
  // map loadview 관련 customhook
  const {
    roadview,
    toggleRoadviewHandler,
    setRoadview,
    resetRoadview,
    resetMarkers,
    rvWrapperRef,
    roadviewRef
  } = useLoadView({ data, myMap });

  // 맵 초기화 설정
  useInitalizeMap({
    data,
    myMap,
    setMyMap,
    mapRef,
    isTasteMapPage,
    initialMapLevel: INITAL_MAP_LEVEL,
    roadview,
    resetRoadview,
    resetMarkers
  });

  // map의 marker와 customoverlay 관리
  useMarkerAndCustomoverlays({
    myMap,
    data,
    isTasteMapPage,
    setRoadview
  });

  // 맵 검색후 선택한 맵을 중심좌표로 설정
  useMapCenterOnSearchResult({ myMap });

  // zoom 관련 로직 관리
  const { zoomIn, zoomOut } = useZoomController({ myMap });

  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  // 맛집 데이터 목록 출력 타입 (MAP, LIST)
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );

  // 선택한 마커 데이터 바뀌거나 컨텐츠 타입이 변경되는 경우 좌표 및 레벨, 로드뷰 초기화
  useEffect(() => {
    if (myMap && isTasteMapPage && clickMarkerData.mapx) {
      myMap.setLevel(3);
      const longitude = parseInt(clickMarkerData.mapx as string) / 10000000;
      const latitude = parseInt(clickMarkerData.mapy as string) / 10000000;
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      setRoadview(false);
      myMap.setCenter(position);
    }
  }, [clickMarkerData, contentType]);

  // 저장된 맵 변경시 data 변경, 지도 레벨 초기화
  useEffect(() => {
    if (isTasteMapPage && !isSharePage) {
      if (myProfile?.storedMapList.length || 0 > 0) {
        setData(myProfile!.storedMapList);
        if (myMap) myMap.setLevel(INITAL_MAP_LEVEL);
      }
      // 저장된 맛집 지도 데이터가 없는 경우 맵 초기화
      if (myProfile?.storedMapList.length === 0) {
        setMyMap(null);
      }
    }
  }, [myProfile?.storedMapList]);

  // 전달받은 items props 변경 시 data 변경
  useEffect(() => {
    if (!isTasteMapPage) {
      setData(items);
    }
  }, [items]);

  return {
    data,
    mapRef,
    roadview,
    toggleRoadviewHandler,
    zoomIn,
    zoomOut,
    rvWrapperRef,
    roadviewRef
  };
};
