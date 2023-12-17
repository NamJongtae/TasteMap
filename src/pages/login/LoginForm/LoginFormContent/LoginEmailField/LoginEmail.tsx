import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  emailRegex,
  emailRegexErrorMsg
} from "../../../../../library/validationRegex";

export default function LoginEmail() {
  return (
    <InputField
      label_hidden={true}
      label={"이메일"}
      name={"email"}
      id={"input-email"}
      placeholder={"Email"}
      type={"email"}
      pattern={{
        value: emailRegex,
        message: emailRegexErrorMsg
      }}
      duplicationErrorMsg={"중복된 이메일 입니다."}
      required={true}
    />
  );
}
