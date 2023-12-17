import React, { ReactElement, ReactNode, useState } from "react";

export interface StepProps {
  name: string;
  children: ReactNode;
}

export interface FunnelProps {
  children: Array<ReactElement<StepProps>>;
}

export const useFunnel = (steps: string[]) => {
  // state를 통해 현재 스텝을 관리한다.
  // setStep 함수를 통해 현재 스텝을 변경할 수 있다.
  const [step, setStep] = useState(steps[0]);

  // step index를 관리한다.
  const [setpIndex, setStepIndex] = useState(0);

  // 이전 스텝으로 돌아간다.
  const prevStepHandler = () => {
    setStepIndex((prev) => prev - 1);
    setStep(steps[setpIndex - 1]);
  };

  // 다음 스텝으로 넘어간다.
  const nextStepHandler = () => {
    setStepIndex((prev) => prev + 1);
    setStep(steps[setpIndex + 1]);
  };

  // 각 단계를 나타내는 Step 컴포넌트
  // children을 통해 각 스텝의 컨텐츠를 렌더링 한다.
  const Step = (props: StepProps): ReactElement => {
    return <>{props.children}</>;
  };

  // 여러 단계의 Step 컴포넌트 중 현재 활성화된 스텝을 렌더링하는 Funnel
  // find를 통해 Step 중 현재 Step을 찾아 렌더링
  const Funnel = ({ children }: FunnelProps) => {
    const targetStep = children.find(
      (childStep) => childStep.props.name === step
    );

    return <>{targetStep}</>;
  };

  return {
    Funnel,
    Step,
    setStep,
    currentStep: step,
    nextStepHandler,
    prevStepHandler
  } as const;
};
