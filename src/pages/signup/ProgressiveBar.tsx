import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styled from "styled-components";

const ProgressWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 450px;
  margin-bottom: 50px;
`;
const ProgressTitle = styled.h2``;
const ProgressCheckWrapper = styled.div`
  position: relative;
`;

const ProgressCheckText = styled.p`
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
const ProgressCheck = styled.div`
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
const ProgressBar = styled.div`
  position: relative;
  height: 2px;
  background-color: #bdbdbd;
  width: 100%;
  ::after {
    position: absolute;
    content: "";
    width: ${(props: { percentage: string }) =>
      props.percentage ? props.percentage : "0"};
    height: 2px;
    background-color: #627af5;
    transition: all 0.5s;
    transition-delay: ${(props: { percentage: string }) =>
      props.percentage === "50%" ? "0.3s" : ""};

    @media screen and (max-width: 431px) {
      width: ${(props) => (props.percentage ? props.percentage : "0")};
    }
  }
`;

interface IProps {
  percentage: string;
  completedUserInfoSetting: boolean;
  completedProfileSetting: boolean;
}

export default function ProgressiveBar({
  percentage,
  completedUserInfoSetting,
  completedProfileSetting
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <ProgressWrapper>
      <ProgressTitle className='a11y-hidden'>회원가입 진행바</ProgressTitle>
      <ProgressCheckWrapper>
        <ProgressCheck
          className='defalut'
          active={completedUserInfoSetting}
          $isWebpSupported={isWebpSupported}
        ></ProgressCheck>
        <ProgressCheckText>기본정보 입력</ProgressCheckText>
      </ProgressCheckWrapper>
      <ProgressBar percentage={percentage}></ProgressBar>
      <ProgressCheckWrapper>
        <ProgressCheck
          className='profile'
          active={completedProfileSetting}
          $isWebpSupported={isWebpSupported}
        ></ProgressCheck>
        <ProgressCheckText>프로필 설정</ProgressCheckText>
      </ProgressCheckWrapper>
    </ProgressWrapper>
  );
}
