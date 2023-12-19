import { isMobile } from "react-device-detect";
import styled from "styled-components";

// ----------------Signup style----------------

export const Wrapper = styled.main`
  width: 100%;
  height: ${isMobile ? "calc(var(--vh, 1vh) * 100)" : "100vh"};
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  background-color: #f5f5f5;
`;

export const FormContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 450px;
  padding: 0px 40px;
  margin: 0 auto;
  @media screen and (max-width: 431px) {
    padding: 0px 30px;
  }
  background-color: #f5f5f5;
`;

export const Title = styled.h1`
  margin-top: 20px;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;

// ----------------ProgressBar style----------------

export const ProgressWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  margin-bottom: 40px;
`;
export const ProgressTitle = styled.h2``;

export const ProgressCheckWrapper = styled.div`
  position: relative;
`;

export const ProgressCheckText = styled.p`
  position: absolute;
  font-size: 14px;
  width: 100px;
  top: 50px;
  left: -15px;
  @media screen and (max-width: 431px) {
    font-size: 12px;
    left: -10px;
  }
`;
export const ProgressCheck = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${(props: { active: boolean; $isWebpSupported: boolean | null }) =>
    props.active ? "2px solid #627af5" : "2px solid #bdbdbd"};
  flex-shrink: 0;
  background: ${(props) =>
      props.active
        ? props.$isWebpSupported
          ? 'url("/assets/webp/icon-check-active.webp")'
          : 'url("/assets/icon-check-active.svg")'
        : props.$isWebpSupported
        ? 'url("/assets/webp/icon-check.webp")'
        : 'url("/assets/icon-check.svg")'}
    no-repeat center / 20px;
  transition: all 0.5s;

  &.defalut {
    transition-delay: ${(props) => (props.active ? "" : "0.3s")};
  }
  &.profile {
    transition-delay: ${(props) => (props.active ? "0.3s" : "")};
  }
`;

export const PercentageBar = styled.div`
  position: relative;
  height: 2px;
  background-color: #bdbdbd;
  width: 100%;
  ::after {
    position: absolute;
    content: "";
    width: ${(props: { percentage: number }) =>
      props.percentage ? props.percentage + "%" : 0};
    height: 2px;
    background-color: #627af5;
    transition: all 0.5s;
    transition-delay: ${(props: { percentage: number }) =>
      props.percentage === 50 ? "0.3s" : ""};

    @media screen and (max-width: 431px) {
      width: ${(props) => (props.percentage ? props.percentage : "0")};
    }
  }
`;

// ----------------commons----------------

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const FormBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  transition: all 0.5s;
`;

// ----------------UserInfoSetting style----------------

export const CancelBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

// ----------------ProfileSetting style----------------

export const PrevBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

// ----------------profileSettingImg style----------------

export const ProfileImgWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #bdbdbd;
  margin-bottom: 10px;
`;

export const ProfileImgInput = styled.input``;

export const ProfileImgLabel = styled.label`
  display: block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
`;

// ----------------profileSettingImgDesc style----------------

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

// ----------------profileSettingImgButton style----------------

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
