import styled from "styled-components";

export const ModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  height: 600px;
  background-color: #fff;
  z-index: 999;
`;

export const ModalTitleBar = styled.div`
  padding: 10px;
  background-color: #bdbdbd;
`;

export const ModalTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-close.webp"
        : "/assets/icon-close.svg"
    }) no-repeat center / 24px`};
`;