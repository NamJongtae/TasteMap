import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect } from "react";

interface IProps {
  myMap: any;
}

export const useMapCenterOnSearchResult = ({ myMap }: IProps) => {
  // 맛집 검색 결과 선택한 맛집 데이터
  const searchSelectedMap = useSelector(
    (state: RootState) => state.tasteMap.searchSelectedMap
  );

  useEffect(() => {
    // 선택한 맛집 데이터의 좌표를 중심 좌표로 설정
    const longitude = parseInt(searchSelectedMap.mapx as string) / 10000000;
    const latitude = parseInt(searchSelectedMap.mapy as string) / 10000000;
    const position = new window.kakao.maps.LatLng(latitude, longitude);
    if (myMap) myMap.setCenter(position);
  }, [searchSelectedMap]);
};
