import { useCallback, useState } from "react";
import { IMapData } from "../../../types/apiTypes";

interface IProps {
  data: IMapData[];
  roadview: boolean;
  roadviewRef: React.RefObject<HTMLDivElement>;
  setRoadWalker: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useLVMarkersAndCustomoverlays = ({
  data,
  roadview,
  roadviewRef,
  setRoadWalker
}: IProps) => {
  const [roadMarker, setRoadMarker] = useState<any>(null);
  const [roadViewMarkers, setRoadViewMarkers] = useState<any[]>([]);
  const [roadViewCutsomOverlays, setRoadViewCutsomOverlays] = useState<any[]>(
    []
  );

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

  function MapWalker(position: any) {
    // 커스텀 오버레이에 사용할 map walker 엘리먼트
    const content = document.createElement("div");
    const figure = document.createElement("div");
    const angleBack = document.createElement("div");

    // map walker를 구성하는 각 노드들의 class명을 지정 - style셋팅을 위해 필요
    content.className = "MapWalker";
    figure.className = "figure";
    angleBack.className = "angleBack";

    content.appendChild(angleBack);
    content.appendChild(figure);

    // 커스텀 오버레이 객체를 사용하여, map walker 아이콘을 생성
    const walker = new window.kakao.maps.CustomOverlay({
      position: position,
      content: content,
      yAnchor: 1
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.walker = walker;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.content = content;
  }

  const createLoadviewMarkerAndCustomoverlay = useCallback(
    (rv: any) => {
      // 로드 뷰에 마커 및 커스텀 오버레이 생성
      for (let i = 0; i < data.length; i++) {
        // data의 mapx, mapy는 문자열 형태로 소수점 형식이 아닌 10000000 단위로 제공
        // parseInt로 문자열을 숫자로 변환 후 10000000으로 나눔
        const longitude = parseInt(data[i].mapx as string) / 10000000;
        const latitude = parseInt(data[i].mapy as string) / 10000000;
        const position = new window.kakao.maps.LatLng(latitude, longitude);
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          map: rv,
          position: position
        });

        // 지도에 마커 적용
        marker.setMap(rv);
        // 마커 저장
        setRoadViewMarkers((prev) => [...prev, marker]);
        // 커스텀 오버레이를 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: getCustomOverlayContent(data[i])
        });

        // 커스텀 오버레이를 로드맵에 적용
        customOverlay.setMap(rv);
        // viewpoint(화면좌표)값을 추출할 수 있는 projection 객체를 가져옵니다.
        const projection = rv.getProjection();

        // 커스텀오버레이의 position과 altitude값을 통해 viewpoint값(화면좌표)를 추출합니다.
        const viewpoint = projection.viewpointFromCoords(
          customOverlay.getPosition(),
          customOverlay.getAltitude()
        );
        // 커스텀 오버레이를 로드뷰의 가운데에 오도록 로드뷰의 시점을 변화 시킵니다.
        rv.setViewpoint(viewpoint);
        // 커스텀 오버레이 저장
        setRoadViewCutsomOverlays((prev) => [...prev, customOverlay]);
      }
    },
    [data]
  );

  const toggleRoadview = useCallback(
    (position: any, rvClient: any, rvContainer: any, map: any, rv: any) => {
      rvClient.getNearestPanoId(position, 50, function (panoId: any) {
        if (panoId === null) {
          (rvContainer as HTMLElement).style.display = "none";
          map.relayout();
        } else {
          map.relayout();
          (rvContainer as HTMLElement).style.display = "block";
          rv.setPanoId(panoId, position);
          rv.relayout();
        }
      });
    },
    []
  );

  const onLoadView = useCallback(
    (map: any, position: any) => {
      // loadView가 없을 시 return 타입 가드
      if (!roadview) {
        return;
      }

      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
      const rvContainer = roadviewRef.current;
      const rv = new window.kakao.maps.Roadview(rvContainer);
      const rvClient = new window.kakao.maps.RoadviewClient();
      // 로드뷰의 pan(좌우 각도)값에 따라 map walker의 백그라운드 이미지를 변경 시키는 함수
      // background로 사용할 sprite 이미지에 따라 계산 식은 달라 질 수 있음
      MapWalker.prototype.setAngle = function (angle: any) {
        const threshold = 22.5; // 이미지가 변화되어야 되는(각도가 변해야되는) 임계 값
        for (let i = 0; i < 16; i++) {
          // 각도에 따라 변화되는 앵글 이미지의 수가 16개
          if (angle > threshold * i && angle < threshold * (i + 1)) {
            // 각도(pan)에 따라 아이콘의 class명을 변경
            const className = "m" + i;
            this.content.className = this.content.className.split(" ")[0];
            this.content.className += " " + className;
            break;
          }
        }
      };

      // map walker의 위치를 변경시키는 함수
      MapWalker.prototype.setPosition = function (position: any) {
        this.walker.setPosition(position);
      };

      // map walker를 지도위에 올리는 함수
      MapWalker.prototype.setMap = function (map: any) {
        this.walker.setMap(map);
      };

      // 로드뷰의 초기화 되었을때 map walker를 생성한다.
      window.kakao.maps.event.addListener(rv, "init", function () {
        let mapWalker: any | null = null;
        // map walker를 생성한다. 생성시 지도의 중심좌표를 넘긴다.

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        // mapwalker 생성
        mapWalker = new MapWalker(position);
        // map walker를 지도에 설정
        mapWalker && mapWalker.setMap(map);
        setRoadWalker(mapWalker);
        // 로드뷰가 초기화 된 후, 추가 이벤트를 등록
        // 로드뷰를 상,하,좌,우,줌인,줌아웃을 할 경우 발생
        // 로드뷰를 조작할때 발생하는 값을 받아 map walker의 상태를 변경
        window.kakao.maps.event.addListener(
          rv,
          "viewpoint_changed",
          function () {
            // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
            const viewpoint = rv.getViewpoint();
            mapWalker.setAngle(viewpoint.pan);
          }
        );

        createLoadviewMarkerAndCustomoverlay(rv);

        // 로드뷰내의 화살표나 점프를 하였을 경우 발생
        // position값이 바뀔 때마다 map walker의 상태를 변경
        window.kakao.maps.event.addListener(
          rv,
          "position_changed",
          function () {
            // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영
            const position = rv.getPosition();
            mapWalker.setPosition(position);
            if (roadviewRef.current) {
              map.setCenter(position);
            }
          }
        );
      });

      toggleRoadview(position, rvClient, rvContainer, map, rv);

      // 마커 이미지를 생성
      const markImage = new window.kakao.maps.MarkerImage(
        "https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png",
        new window.kakao.maps.Size(26, 46),
        {
          // 스프라이트 이미지를 사용
          // 스프라이트 이미지 전체의 크기를 지정
          spriteSize: new window.kakao.maps.Size(1666, 168),
          // 사용하고 싶은 영역의 좌상단 좌표를 입력
          // background-position으로 지정하는 값이며 부호는 반대
          spriteOrigin: new window.kakao.maps.Point(705, 114),
          offset: new window.kakao.maps.Point(13, 46)
        }
      );

      // 드래그가 가능한 마커를 생성
      const rvMarker = new window.kakao.maps.Marker({
        image: markImage,
        position: position,
        draggable: true,
        map: map
      });

      // 마커 저장
      setRoadMarker(rvMarker);

      // 마커에 드래그 이벤트 추가
      window.kakao.maps.event.addListener(rvMarker, "dragend", function () {
        const position = rvMarker.getPosition();
        toggleRoadview(position, rvClient, rvContainer, map, rv);
      });

      // 마커에 클릭 이벤트 추가 클릭시 해당 위치 좌표로 좌표설정
      window.kakao.maps.event.addListener(
        map,
        "click",
        function (mouseEvent: any) {
          // 현재 클릭한 부분의 좌표를 리턴
          const position = mouseEvent.latLng;
          rvMarker.setPosition(position);
          toggleRoadview(position, rvClient, rvContainer, map, rv);
        }
      );
    },
    [roadview]
  );

  return { roadMarker, roadViewMarkers, roadViewCutsomOverlays, onLoadView };
};
