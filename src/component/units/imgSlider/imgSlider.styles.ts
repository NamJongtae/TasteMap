import styled from "styled-components";

export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 16px;
  max-height: 228px;
  overflow: hidden;
`;

export const ImgList = styled.ul`
  width: 100%;
  display: flex;
  transition: all 0.5s;
  gap: 6px;
`;

export const ImgItem = styled.li`
  min-width: 320px;
  width: 100%;
  max-height: 228px;
  min-height: 228px;
  overflow: hidden;
`;

export const ImgBtnList = styled.ul`
  position: absolute;
  display: flex;
  gap: 6px;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
`;

export const ImgBtnItem = styled.li`
  width: 100%;
  height: 100%;
`;

export const ImgBtn = styled.button`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #bdbdbd;
  transition: all 0.5s;
  &.active {
    ::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background-color: #111;
    }
  }
`;

export const PrevBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-prev.webp"
        : "/assets/icon-prev.svg"
    }) no-repeat center left 6px / 15px #fff`};
  opacity: ${(props) => props.disabled && 0.5};
  z-index: 99;
`;

export const NextBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-next.webp"
        : "/assets/icon-next.svg"
    }) no-repeat center right 6px / 15px #fff`};
  opacity: ${(props) => props.disabled && 0.5};
  z-index: 99;
`;
