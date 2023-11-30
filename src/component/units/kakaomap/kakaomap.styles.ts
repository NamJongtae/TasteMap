import styled from "styled-components";

export const Wrapper = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h2``;

export const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

export const NoKakaoMap = styled(MapContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  white-space: pre-wrap;
  text-align: center;
  line-height: 1.5;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-searchMap.webp"
        : "/assets/icon-searchMap.svg"
    }) no-repeat center 70px / 100px #f2f2f2`};
  @media screen and (max-width: 468px) {
    font-size: 14px;
  }
`;

export const NoKakaoMapText = styled.p`
  padding-top: 100px;
`;

export const RvWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

export const Roadview = styled.div`
  width: 100%;
  height: 100%;
`;

export const MapBtnWrapper = styled.div`
  position: absolute;
  left: 15px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  z-index: 99;
`;

const ZoomBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
`;

export const ZoomInBtn = styled(ZoomBtn)`
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-zoomIn.webp"
        : "/assets/icon-zoomIn.svg"
    }) no-repeat`};
`;

export const ZoomOutBtn = styled(ZoomBtn)`
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-zoomOut.webp"
        : "/assets/icon-zoomOut.svg"
    }) no-repeat`};
`;

export const RoadViewBtn = styled(ZoomBtn)`
  transition: all 0.3s;
  background: ${(props: {
    roadview: boolean;
    $isWebpSupported: boolean | null;
  }) =>
    props.roadview
      ? `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-roadViewActive.webp"
            : "/assets/icon-roadViewActive.svg"
        }) no-repeat`
      : `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-roadView.webp"
            : "/assets/icon-roadView.svg"
        }) no-repeat`};
`;
