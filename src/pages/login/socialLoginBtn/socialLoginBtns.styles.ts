import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

export const SocialLoginWrapper = styled.ul`
  position: relative;
  justify-content: center;
  border-top: 1px solid #111;
  padding-top: 30px;
  margin-top: 20px;
  ::after {
    content: "3초만에 시작하기";
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    background-color: #f5f5f5;
    font-size: 13px;
    padding: 0 10px;
  }
`;

export const SocialLoginItem = styled.li`
  margin-bottom: 20px;
  text-align: center;
`;

export const SocialLoginBtn = styled.button`
  width: 100%;
  max-width: 300px;
  border-radius: 5px;
  font-weight: 400;
  padding: 15px 0;
  border: px solid #bdbdbd;
  transition: all 0.2s;
  &.google {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-google.webp"
          : "/assets/icon-google.svg"
      }) no-repeat center left 15px / 24px #fff`};
  }
  &.github {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-github.webp"
          : "/assets/icon-github.svg"
      }) no-repeat center left 15px / 24px #fff`};
  }
  &:hover {
    background-color: ${isMobile ? "" : "#ddd"};
  }
`;