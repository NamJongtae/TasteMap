import React from "react";
import { FieldWrapper, PrevBtn } from "../../signup.styles";
import IntroduceField from "./intorduceField/IntroduceField";
import DisplayNameField from "./displayNameField/DisplayNameField";
import ProfileImgField from "./profileImgField/ProfileImgField";
import SignupBtn from './signupBtn/SignupBtn';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { signupSlice } from "../../../../slice/signupSlice";

interface IProps {
  prevStepHandler: () => void;
}

export default function ProfileSetting({ prevStepHandler }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const minusPercentageHandler = () => {
    dispatch(signupSlice.actions.minusPercentage(50));
  };
  return (
    <>
      <FieldWrapper>
        <ProfileImgField />

        <DisplayNameField />

        <IntroduceField />

        <PrevBtn
          onClick={() => {
            prevStepHandler();
            minusPercentageHandler();
          }}
        >
          이전
        </PrevBtn>
        <SignupBtn />
      </FieldWrapper>
    </>
  );
}
