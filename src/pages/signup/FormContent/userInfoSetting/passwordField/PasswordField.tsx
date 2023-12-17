import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  passwordRegex,
  passwordRegexErrorMsg
} from "../../../../../library/validationRegex";

export default function PasswordField() {
  return (
    <InputField
      type='password'
      label={"비밀번호 (필수)"}
      name={"password"}
      id={"password"}
      placeholder={"8-16자 특수문자, 숫자, 영문 포함"}
      minLength={8}
      maxLength={16}
      pattern={{
        value: passwordRegex,
        message: passwordRegexErrorMsg
      }}
      required={true}
    />
  );
}
