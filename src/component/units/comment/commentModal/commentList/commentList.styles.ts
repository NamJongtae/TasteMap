import styled from "styled-components";

export const CommentWrpper = styled.ul`
  position: relative;
  padding: 20px;
  padding-bottom: 115px;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 20px;
`;

export const RefreshBtn = styled.button`
  position: absolute;
  z-index: 99;
  top: 45px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-refresh.webp"
        : "/assets/icon-refresh.svg"
    }) no-repeat center / 25px`};
`;
