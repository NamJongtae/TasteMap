import { useEffect } from "react";
import { IMapData } from "../../../api/apiType";

interface IProps {
  data: IMapData[];
  myMap: any;
  setMyMap: React.Dispatch<any>;
  mapRef: React.RefObject<HTMLDivElement>;
  isTasteMapPage: boolean;
  initialMapLevel: number;
  roadview: boolean;
  resetRoadview: (position: any) => void;
  resetMarkers: () => void;
}

export const useInitalizeMap = ({
  data,
  myMap,
  setMyMap,
  mapRef,
  isTasteMapPage,
  initialMapLevel,
  roadview,
  resetRoadview,
  resetMarkers
}: IProps) => {

  const initializeMap = (latitude: number, longitude: number) => {
    if (!myMap) {
      const container = mapRef.current;
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: isTasteMapPage ? initialMapLevel : 3
      };
      const map = new window.kakao.maps.Map(container, options);
      map.setZoomable(isTasteMapPage);
      setMyMap(map);
    } else {
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      if (roadview) {
        resetRoadview(position);
      }
      if (!isTasteMapPage) {
        myMap.setCenter(position);
      }
      resetMarkers();
    }
  };

  useEffect(() => {
    if (data.length === 0 || !data[0]?.mapx || !data[0]?.mapy) {
      return;
    }

    const longitude = parseInt(data[0].mapx as string) / 10000000;
    const latitude = parseInt(data[0].mapy as string) / 10000000;

    initializeMap(latitude, longitude);
  }, [data]);
};
