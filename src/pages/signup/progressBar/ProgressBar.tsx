import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  PercentageBar,
  ProgressCheck,
  ProgressCheckText,
  ProgressCheckWrapper,
  ProgressTitle,
  ProgressWrapper
} from "../signup.styles";
import { useStepProgressController } from "../../../hook/logic/signup/useSetpPercentageController";

interface IProps {
  currentStep: string;
  steps: string[];
}

export default function ProgressBar({ currentStep, steps }: IProps) {
  const { percentage } = useStepProgressController({ currentStep, steps });

  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <ProgressWrapper>
      <ProgressTitle className='a11y-hidden'>회원가입 진행바</ProgressTitle>
      <ProgressCheckWrapper>
        <ProgressCheck
          className='defalut'
          active={percentage >= 50}
          $isWebpSupported={isWebpSupported}
        ></ProgressCheck>
        <ProgressCheckText>기본정보 입력</ProgressCheckText>
      </ProgressCheckWrapper>
      <PercentageBar percentage={percentage}></PercentageBar>
      <ProgressCheckWrapper>
        <ProgressCheck
          className='profile'
          active={percentage === 100}
          $isWebpSupported={isWebpSupported}
        ></ProgressCheck>
        <ProgressCheckText>프로필 설정</ProgressCheckText>
      </ProgressCheckWrapper>
    </ProgressWrapper>
  );
}
