import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin: 0 auto;
  border-bottom: 2px solid #b5b5b5;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background-color: #fff;
  min-height: 54px;
`;

export const UploadLink = styled(Link)`
  width: 24px;
  height: 24px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-uploadPost.webp"
        : "/assets/icon-uploadPost.svg'"
    }) no-repeat center / 24px`};
`;

export const LeftSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const CancelBtn = styled.button`
  padding-bottom: 5px;
  font-size: 16px;
  font-weight: 400;
  color: #888;
  background: none;
`;

export const BackBtn = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-back.webp"
        : "/assets/icon-back.svg'"
    }) no-repeat center / 20px`};
`;

export const LogoLink = styled(Link)``;

export const Title = styled.h1``;

export const LogoImg = styled.img`
  width: 110px;
`;

export const RightSideWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const SearchLink = styled(Link)`
  width: 24px;
  height: 24px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-search.webp"
        : "/assets/icon-search.svg'"
    }) no-repeat center / 24px`};
`;

export const ProfileLink = styled(Link)`
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-defaultProfile.webp"
        : "/assets/icon-defaultProfile.svg"
    }) no-repeat center / 30px`};
`;

export const LogoutBtn = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-logout.webp"
        : "/assets/icon-logout.svg"
    }) no-repeat center / cover`};
`;

export const SubmitBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  background-color: gold;
  border-radius: 20px;
  padding: 6px 20px;
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled && "#eee"};
  transition: all 0.3s;
`;
