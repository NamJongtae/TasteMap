import React from "react";
import { FormContentWrapper } from "../signup.styles";
import { useFunnel } from "../../../hook/useFunnel";
import UserInfoSetting from "./userInfoSetting/UserInfoSetting";
import ProfileSetting from "./profileSetting/ProfileSetting";
import ProgressBar from "../progressBar/ProgressBar";

export default function FormContent() {
  const steps = ["userInfoSetting", "profileSetting"];
  const { Funnel, Step, currentStep, prevStepHandler, nextStepHandler } = useFunnel(steps);

  return (
    <FormContentWrapper>
      <ProgressBar currentStep={currentStep} steps={steps}
      />
      <Funnel>
        <Step name='userInfoSetting'>
          <UserInfoSetting nextStepHandler={nextStepHandler} />
        </Step>

        <Step name='profileSetting'>
          <ProfileSetting prevStepHandler={prevStepHandler} />
        </Step>
      </Funnel>
    </FormContentWrapper>
  );
}
