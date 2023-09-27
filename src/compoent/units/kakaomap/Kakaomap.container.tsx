import React, { useEffect, useRef, useState } from "react";
import "./kakaomap.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { postSlice, thunkFetchAddPostMap } from "../../../slice/postSlice";
import KakaomapUI from "./Kakaomap.presenter";
import { ISearchMapData } from "../../../api/apiType";
import { profileSlice } from "../../../slice/profileSlice";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
declare global {
  interface Window {
    kakao: any;
  }
}

interface IProps {
  items: ISearchMapData[];
  isTasteMapPage: boolean;
}

function Kakaomap({ items, isTasteMapPage }: IProps) {
  const [data, setData] = useState(items);
  const seletedMapData = useSelector(
    (state: RootState) => state.post.seletedMapData
  );
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const clickMarkerData = useSelector(
    (state: RootState) => state.tasteMap.clickMarkerData
  );
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );
  const dispatch = useDispatch<AppDispatch>();
  // 생성한 map를 저장
  const [myMap, setMyMap] = useState<any>(null);
  // 생성한 roadviewMark를 저장
  const [roadMarker, setRoadMarker] = useState<any>(null);
  // 생성한 mapWalker를 저장
  const [roadWalker, setRoadWalker] = useState<any>(null);
  // roadview의 유무
  const [roadview, setRoadview] = useState(false);
  // marker 저장
  const [markers, setMaeksers] = useState<any[]>([]);
  // customoverlay 저장
  const [cutsomOverlays, SetCustomOverlays] = useState<any[]>([]);
  // roadview marker 저장
  const [roadViewMarkers, setRoadViewMarkers] = useState<any[]>([]);
  // roadviewCustomoverlay 저장
  const [roadViewCutsomOverlays, setRoadViewCutsomOverlays] = useState<any[]>(
    []
  );
  const mapRef = useRef<HTMLDivElement>(null);
  const rvWrapperRef = useRef<HTMLDivElement>(null);
  const roadViewRef = useRef<HTMLDivElement>(null);
  // 지도위에 현재 로드뷰의 위치와, 각도를 표시하기 위한 map walker 아이콘 생성 클래스
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

  const onLoadView = (map: any, position: any) => {
    // loadView가 없을 시 return 타입 가드
    if (!roadview) {
      return;
    }

    map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
    const rvContainer = roadViewRef.current;
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
      window.kakao.maps.event.addListener(rv, "viewpoint_changed", function () {
        // 이벤트가 발생할 때마다 로드뷰의 viewpoint값을 읽어, map walker에 반영
        const viewpoint = rv.getViewpoint();
        mapWalker.setAngle(viewpoint.pan);
      });

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
        // 마커에 위에 표시되는 오버레이 설정
        const content =
          // prettier-ignore
          `<div style="position:absolute; bottom:50px; left:50%; transform:translateX(-50%);">
          <div style="display:flex; width:100%; max-width: 150px; flex-direction:column; gap:4px; justify-content:center; align-items:center; border: 2px solid #bdbdbd; padding:6px;border-radius:5px; font-weight:500; background-color:#fff; font-size:12px;">
              <p style="max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-all;">${data[i].title}</p>
              ${data[i].link&& `<a href="${data[i].link}" target=blank; style="display:block; width:100%; font-size:11px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis; word-break: break-all; color: blue; text-decoration: underline; padding-bottom: 1px;">${data[i].link}</a>`}
          </div>
          <div style="position: absolute; width: 11px; height: 9px; background: url(&quot;http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/triangle.png&quot;) 0% 0% / 11px 9px no-repeat; left: 51%; transform:translateX(-50%); bottom: -7px;"></div>
        </div>`;

        // 커스텀 오버레이를 생성
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: position,
          content: content
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

      // 로드뷰내의 화살표나 점프를 하였을 경우 발생
      // position값이 바뀔 때마다 map walker의 상태를 변경
      window.kakao.maps.event.addListener(rv, "position_changed", function () {
        // 이벤트가 발생할 때마다 로드뷰의 position값을 읽어, map walker에 반영
        const position = rv.getPosition();
        mapWalker.setPosition(position);
        if (roadViewRef.current) {
          map.setCenter(position);
        }
      });
    });

    toggleRoadview(position);

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
      toggleRoadview(position);
    });

    // 마커에 클릭 이벤트 추가 클릭시 해당 위치 좌표로 좌표설정
    window.kakao.maps.event.addListener(
      map,
      "click",
      function (mouseEvent: any) {
        // 현재 클릭한 부분의 좌표를 리턴
        const position = mouseEvent.latLng;
        rvMarker.setPosition(position);
        toggleRoadview(position);
      }
    );

    function toggleRoadview(position: any) {
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
    }
  };

  useEffect(() => {
    // 선댁한 검색한 결과 데이터 초기화
    dispatch(postSlice.actions.resetSelectedMapData());
  }, []);

  useEffect(() => {
    // map이 없을 시 리턴 맵 중복 생성 방지
    if (myMap === null || data.length === 0) {
      return;
    }
    // 로드 뷰가 true 일시 로드 뷰 활성화
    if (roadview) {
      // const mapPos = myMap.getCenter();
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
    // 지도에 data 데이터 수 만큼 마커 및 커스텀 오버레이 생성
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
      setMaeksers((prev) => [...prev, marker]);
      // 마커에 위에 표시되는 오버레이 설정
      const content =
        // prettier-ignore
        `<div style="position:absolute; bottom:50px; left:50%; transform:translateX(-50%);">
        <div style="display:flex; width:100%; max-width: 150px; flex-direction:column; gap:4px; justify-content:center; align-items:center; border: 2px solid #bdbdbd; padding:6px;border-radius:5px; font-weight:500; background-color:#fff; font-size:12px;">
            <p style="max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-break: break-all;">${data[i].title}</p>
            ${data[i].link&& `<a href="${data[i].link}" target=blank; style="display:block; width:100%; font-size:11px; overflow:hidden; white-space: nowrap; text-overflow: ellipsis; word-break: break-all; color: blue; text-decoration: underline; padding-bottom: 1px;">${data[i].link}</a>`}
        </div>
        <div style="position: absolute; width: 11px; height: 9px; background: url(&quot;http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/triangle.png&quot;) 0% 0% / 11px 9px no-repeat; left: 51%; transform:translateX(-50%); bottom: -7px;"></div>
      </div>`;

      // 커스텀 오버레이를 생성
      const customOverlay = new window.kakao.maps.CustomOverlay({
        position: position,
        content: content
      });

      // 커스텀 오버레이를 지도에 적용
      customOverlay.setMap(myMap);
      // 커스텀 오버레이 저장
      SetCustomOverlays((prev) => [...prev, customOverlay]);
    }
  }, [myMap, data]);

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
    // 맛집 지도 페이지 일 때
    if (isTasteMapPage) {
      if (seletedMapData.length > 0) {
        // 저장된 맛집 데이터가 20개 이상일 경우 맛집 저장 제한
        if (
          myProfileData.storedMapList &&
          myProfileData.storedMapList.length > 20
        ) {
          sweetToast(
            "저장 가능한 맛집 수를 초과하였습니다.\n(최대 20개)",
            "warning",
            1500
          );
          return;
        }
        // 저장된 맛집 데이터에 추가할 맛집 데이터가 있다면 저장 제한
        if (
          myProfileData.storedMapList?.find(
            (item) => item.address === seletedMapData[0].address
          )
        ) {
          sweetToast("이미 추가된 맛집입니다!", "warning");
          return;
        }
        // 선택한 맛집 데이터를 api 함수를 통해 db에 저장
        dispatch(thunkFetchAddPostMap(seletedMapData[0]));
        // 추가한 맛집 상세정보를 표시하기 clickMapData를 선택한 맛집 데이터로 업데이트
        dispatch(tasteMapSlice.actions.setClickMarkerData(seletedMapData[0]));
        // 선택한 맛집 데이터의 좌표를 중심 좌표로 설정
        const longitude = parseInt(seletedMapData[0].mapx as string) / 10000000;
        const latitude = parseInt(seletedMapData[0].mapy as string) / 10000000;
        const position = new window.kakao.maps.LatLng(latitude, longitude);
        if (myMap) myMap.setCenter(position);
        // 추가한 맛집 데이터를 기존 myProfile 데이터에 업데이트
        const newData = {
          ...myProfileData,
          storedMapList: [
            ...(myProfileData.storedMapList || []),
            ...seletedMapData
          ]
        };
        dispatch(profileSlice.actions.setMyprofile(newData));
        sweetToast("맛집이 추가 되었습니다.", "success");
      }
    }
  }, [seletedMapData]);

  useEffect(() => {
    if (isTasteMapPage) {
      if (myProfileData.storedMapList) {
        setData(myProfileData.storedMapList);
        if (myMap) myMap.setLevel(14);
      }
      // 저장된 맛집 지도 데이터가 없는 경우 맵 초기화
      if (myProfileData.storedMapList?.length === 0) {
        setMyMap(null);
      }
    }
  }, [myProfileData]);

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

  return (
    <KakaomapUI
      data={data}
      mapRef={mapRef}
      roadview={roadview}
      setRoadview={setRoadview}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      rvWrapperRef={rvWrapperRef}
      roadViewRef={roadViewRef}
      isTasteMapPage={isTasteMapPage}
    />
  );
}

function kakaomapEqual(prev: IProps, next: IProps) {
  return prev.items[0]?.mapx === next.items[0]?.mapx;
}
export default React.memo(Kakaomap, kakaomapEqual);
