import styled from "styled-components";

// -------------------ProfileUpdateModal style-------------------

export const ProfileUpdateModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 550px;
  max-height: 900px;
  background-color: #fff;
  z-index: 999;
  animation: ProfileEditModalmoveUp 1s;
  @keyframes ProfileEditModalmoveUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes ProfileUpdateModalmoveDown {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: translate(-50%, 80%);
      opacity: 0;
    }
  }
`;

export const ModalTitleBar = styled.div`
  padding: 12px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ModalTitle = styled.h2`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-back.webp"
        : "/assets/icon-back.svg"
    }) no-repeat center / 16px`};
  transform: rotate(180deg);
`;

// -------------------ProfileUpdateForm style-------------------

export const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc(100% - 30px);
  max-width: 360px;
  margin: 0 auto;
  padding: 30px 0;
`;

export const UpdateBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

// -------------------ProfileUpdateImg style-------------------

export const ProfileUpdateImgWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #bdbdbd;
  margin-bottom: 10px;
`;

// -------------------ProfileUpdateImgInput style-------------------

export const ProfileImgInputLabel = styled.label`
  display: block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 15px;
  pointer-events: none;
`;

export const ProfileImgInput = styled.input``;

// -------------------ProfileUpdateImgBtns style-------------------

export const ProfileUpdateBtnsWrapper = styled.div`
  position: relative;
  max-width: 130px;
  min-height: 110px;
  margin: 0 auto;
`;

// -------------------ProfileUpdateImgBtn style-------------------

export const ImgButton = styled.button`
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

// -------------------PrfilleUpdateImgBtn style-------------------

export const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

// -------------------ProfileUpdateImgResetBtn style-------------------

export const ResetBtn = styled.button`
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
    })  no-repeat center top 2px/ 16px #767676`};
`;

// -------------------ProfileUpdateImgDesc style-------------------

export const ProfileImgDescList = styled.ul`
  padding: 20px 10px;
  display: table;
  margin: 0 auto;
`;

export const ProfileImgDescItem = styled.li`
  color: #4c4d4f;
  line-height: 1.5;
  font-size: 12px;
  word-break: keep-all;
  @media screen and (max-width: 362px) {
    font-size: 11px;
  }
`;
