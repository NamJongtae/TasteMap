import React from "react";
import {
  ProgressBar,
  ProgressCheck,
  ProgressCheckText,
  ProgressCheckWrapper,
  ProgressTitle,
  ProgressWrapper
} from "./ProgressiveBar.styles";
import { useSupportedWebp } from "../../hook/useSupportedWebp";
interface IProps {
  completedUserInfo: boolean;
  percentage: string;
  profile: boolean;
}

export default function ProgressiveBar({
  completedUserInfo,
  percentage,
  profile
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  return (
    <ProgressWrapper>
      <ProgressTitle className='a11y-hidden'>회원가입 진행바</ProgressTitle>
      <ProgressCheckWrapper>
        <ProgressCheck
          className='defalut'
          active={completedUserInfo}
          $isWebpSupported={isWebpSupported}
        ></ProgressCheck>
        <ProgressCheckText>기본정보 입력</ProgressCheckText>
      </ProgressCheckWrapper>
      <ProgressBar percentage={percentage}></ProgressBar>
      <ProgressCheckWrapper>
        <ProgressCheck
          className='profile'
          active={profile}
          $isWebpSupported={isWebpSupported}
        ></ProgressCheck>
        <ProgressCheckText>프로필 설정</ProgressCheckText>
      </ProgressCheckWrapper>
    </ProgressWrapper>
  );
}
