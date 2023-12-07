import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { PercentageBar, ProgressCheck, ProgressCheckText, ProgressCheckWrapper, ProgressTitle, ProgressWrapper } from './ProgressBar.styles';

interface IProps {
  percentage: string;
  completedUserInfoSetting: boolean;
  completedProfileSetting: boolean;
}

export default function ProgressBar({
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
      <PercentageBar percentage={percentage}></PercentageBar>
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
