import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { IMapData } from "../../../api/apiType";
import { useLoadView } from "./useLoadView";
import { useMarkerAndCustomoverlays } from "./useMarkerAndCustomoverlays";

interface IProps {
  items: IMapData[];
  isTasteMapPage: boolean;
}

export const useKakaomap = ({ items, isTasteMapPage }: IProps) => {
  // 맛집 정보 데이터
  const [data, setData] = useState(items);
  // 생성한 map를 저장
  const [myMap, setMyMap] = useState<any>(null);

  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  // 현재 클릭한 마커의 맛집 정보
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  // 맛집 검색 결과 선택한 맛집 데이터
  const searchSelectedMap = useSelector(
    (state: RootState) => state.tasteMap.searchSelectedMap
  );
  // 맛집 데이터 목록 출력 타입 (MAP, LIST)
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const mapRef = useRef<HTMLDivElement>(null);

  // map loadview 관련 customhook
  const {
    roadview,
    setRoadview,
    roadWalker,
    roadMarker,
    rvWrapperRef,
    roadviewRef
  } = useLoadView({ data, myMap, clickMarkerData });

  // map의 marker와 customoverlay 관리 customhook
  useMarkerAndCustomoverlays({
    myMap,
    data,
    isTasteMapPage,
    setRoadview
  });

  const { data: myProfile } = useMyProfileQuery(myInfo.uid);

  useEffect(() => {
    if (data.length === 0 || !data[0]?.mapx || !data[0]?.mapy) {
      return;
    }
    // 초기 좌표값
    const longitude = parseInt(data[0].mapx as string) / 10000000;
    const latitude = parseInt(data[0].mapy as string) / 10000000;

    // 카카오맵은 하나만 생성해야 맵이 중복으로 생성되지 않음
    // 따라서 맵을 생성한 뒤에는 좌표값를 변경시켜 지도 위치를 바꿔주어야함
    // maps
    if (myMap === null) {
      const container = mapRef.current;
      // 생성할 지도의 중심 좌표 설정 및 지도 level(크기) 지정
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: isTasteMapPage ? 14 : 3
      };
      // 지도 생성
      const map = new window.kakao.maps.Map(container, options);
      // 중 비활성화, 버튼 사용
      map.setZoomable(isTasteMapPage);
      // map 저장
      setMyMap(map);
    } else if (myMap) {
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      // roadview 초기화
      if (roadview) {
        myMap.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
        setRoadview(false);
        myMap.setCenter(position);
      }
      if (!isTasteMapPage) {
        myMap.setCenter(position);
      }

      // roadMaker 초기화
      roadMarker && roadMarker.setMap(null);
      // roadWalker 초기화
      roadWalker && roadWalker.setMap(null);
    }
  }, [data]);

  // 지도 레벨은 지도의 확대 수준을 의미
  function zoomIn() {
    // 현재 지도의 레벨을 얻어옵니다
    const level = myMap.getLevel();

    // 지도를 1레벨 내림 (지도가 확대)
    myMap.setLevel(level - 1);
  }

  function zoomOut() {
    // 현재 지도의 레벨을 얻어옵니다
    const level = myMap.getLevel();

    // 지도를 1레벨 올림 (지도가 축소)
    myMap.setLevel(level + 1);
  }

  useEffect(() => {
    // 선택한 맛집 데이터의 좌표를 중심 좌표로 설정
    const longitude = parseInt(searchSelectedMap.mapx as string) / 10000000;
    const latitude = parseInt(searchSelectedMap.mapy as string) / 10000000;
    const position = new window.kakao.maps.LatLng(latitude, longitude);
    if (myMap) myMap.setCenter(position);
  }, [searchSelectedMap]);

  useEffect(() => {
    if (isTasteMapPage) {
      if (myProfile?.storedMapList) {
        setData(myProfile!.storedMapList);
        if (myMap) myMap.setLevel(14);
      }
      // 저장된 맛집 지도 데이터가 없는 경우 맵 초기화
      if (myProfile?.storedMapList?.length === 0) {
        setMyMap(null);
      }
    }
  }, [myProfile?.storedMapList]);

  useEffect(() => {
    if (!isTasteMapPage) {
      setData(items);
    }
  }, [items]);

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

  return {
    data,
    mapRef,
    roadview,
    setRoadview,
    zoomIn,
    zoomOut,
    rvWrapperRef,
    roadviewRef
  };
};
