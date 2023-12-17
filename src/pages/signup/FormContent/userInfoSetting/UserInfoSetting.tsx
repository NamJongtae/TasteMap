import React from "react";
import { FieldWrapper } from "../../signup.styles";
import EmailField from "./emailField/EmailField";
import PasswordField from "./passwordField/PasswordField";
import PasswordChkField from "./passwordChkField/PasswordChkField";
import PhoneField from "./phoneField/PhoneField";
import NextBtn from "./nextBtn/NextBtn";

interface IProps {
  nextStepHandler: () => void;
}
export default function UserInfoSetting({ nextStepHandler }: IProps) {

  return (
    <FieldWrapper>
      <EmailField />

      <PasswordField />

      <PasswordChkField />

      <PhoneField />

      <NextBtn
        nextStepHandler={nextStepHandler}
      />
    </FieldWrapper>
  );
}
