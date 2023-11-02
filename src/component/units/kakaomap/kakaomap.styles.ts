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
  body.no-webp & {
    background: url("/assets/webp/icon-searchMap.webp") no-repeat center 70px / 100px
      #f2f2f2;
  }
  body.webp & {
    background: url("/assets/icon-searchMap.svg") no-repeat center 70px / 100px
      #f2f2f2;
  }
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
  body.webp & {
    background: url("/assets/webp/icon-zoomIn.webp") no-repeat;
  }
  body.no-webp & {
    background: url("/assets/icon-zoomIn.svg") no-repeat;
  }
`;

export const ZoomOutBtn = styled(ZoomBtn)`
  body.webp & {
    background: url("/assets/webp/icon-zoomOut.webp") no-repeat;
  }
  body.no-webp & {
    background: url("/assets/icon-zoomOut.svg") no-repeat;
  }
`;

export const RoadViewBtn = styled(ZoomBtn)`
  transition: all 0.3s;
  background: ${(props: { roadview: boolean }) =>
    props.roadview
      ? document.body.classList.contains("webp")
        ? "url(/assets/webp/icon-roadViewActive.webp) no-repeat"
        : "url(/assets/icon-roadViewActive.svg) no-repeat"
      : document.body.classList.contains("webp")
      ? "url(/assets/webp/icon-roadView.webp) no-repeat"
      : "url(/assets/icon-roadView.svg) no-repeat"};
`;
