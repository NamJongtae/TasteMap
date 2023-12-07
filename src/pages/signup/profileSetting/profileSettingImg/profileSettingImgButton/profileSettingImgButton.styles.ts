import styled from 'styled-components';

export const ProfileImgButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #bdbdbd;
  ::after {
    content: "";
    position: absolute;
    right: -12px;
    bottom: -3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  &::after {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-uploadProfile.webp"
          : "/assets/icon-uploadProfile.svg"
      }) no-repeat center / 20px #79a7ff`};
  }
`;

export const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

export const ProfileImgButtonWrapper = styled.div`
  position: relative;
  max-width: 130px;
  min-height: 110px;
  margin: 0 auto;
`;

export const ProfileImgResetBtn = styled.button`
  position: absolute;
  top: -3px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-close.webp"
        : "/assets/icon-close.svg"
    }) no-repeat center top 2px/ 16px #767676`};
`;