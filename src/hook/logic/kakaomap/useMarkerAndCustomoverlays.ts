import { useEffect, useState } from "react";
import { IMapData } from "../../../api/apiType";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
interface IProps {
  myMap: any;
  data: IMapData[];
  isTasteMapPage: boolean;
  setRoadview: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useMarkerAndCustomoverlays = ({
  myMap,
  data,
  isTasteMapPage,
  setRoadview
}: IProps) => {
  // markers 저장
  const [markers, setMarkers] = useState<any[]>([]);
  // customoverlays 저장
  const [cutsomOverlays, setCustomOverlays] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const getCustomOverlayContent = (data: IMapData) => {
    // prettier-ignore
    return `<div style="position:absolute; bottom:50px; left:50%; transform:translateX(-50%);">
    <div style="display:flex; width:100%; max-width: 150px; flex-direction:column; gap:4px; justify-content:center; align-items:center; border: 2px solid #bdbdbd; padding:6px;border-radius:5px; font-weight:500; background-color:#fff; font-size:12px;">
        <p style="max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-all;">${data.title}</p>
        ${data.link&& `<a href="${data.link}" target=blank; style="display:block; width:100%; font-size:11px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis; word-break: break-all; color: blue; text-decoration: underline; padding-bottom: 1px;">${data.link}</a>`}
    </div>
    <div style="position: absolute; width: 11px; height: 9px; background: url(&quot;http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/triangle.png&quot;) 0% 0% / 11px 9px no-repeat; left: 51%; transform:translateX(-50%); bottom: -7px;"></div>
  </div>`;
  };

  const createMapMarkerAndCustomoverlays = () => {
    for (let i = 0; i < data.length; i++) {
      // data의 mapx, mapy는 문자열 형태로 소수점 형식이 아닌 10000000 단위로 제공
      // parseInt로 문자열을 숫자로 변환 후 10000000으로 나눔
      const longitude = parseInt(data[i].mapx as string) / 10000000;
      const latitude = parseInt(data[i].mapy as string) / 10000000;
      const position = new window.kakao.maps.LatLng(latitude, longitude);
      // 마커 생성
      const marker = new window.kakao.maps.Marker({
        map: myMap,
        position: position,
        title: data[i].title,
        clickable: isTasteMapPage
      });

      // 맛집 지도 페이지에서는 마커 클릭시 해당 마커로 지도 좌표 변경 및 지도 축소
      if (isTasteMapPage) {
        // 마커에 클릭이벤트를 등록합니다
        window.kakao.maps.event.addListener(marker, "click", function () {
          // 마커 틀릭시 로드 뷰 초기화
          setRoadview(false);
          // 맵 3레벨로 축소
          myMap.setLevel(3);
          // 앱 중심 좌표 마커의 좌표로 변경
          myMap.setCenter(position);
          // 클릭한 좌표 데이터 업데이트
          dispatch(tasteMapSlice.actions.setClickMarkerData(data[i]));
        });
      }
      // 마커 저장
      setMarkers((prev) => [...prev, marker]);
      // 마커에 위에 표시되는 오버레이 설정

      // 커스텀 오버레이를 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: getCustomOverlayContent(data[i])
      });

      // 커스텀 오버레이를 지도에 적용
      customOverlay.setMap(myMap);
      // 커스텀 오버레이 저장
      setCustomOverlays((prev) => [...prev, customOverlay]);
    }
  };

  useEffect(() => {
    if (myMap === null || data.length === 0) {
      return;
    }
    // maker 및 customOverlay 초기화
    if (markers.length > 0) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
        cutsomOverlays[i].setMap(null);
      }
    }
    createMapMarkerAndCustomoverlays();
  }, [myMap, data]);
};
