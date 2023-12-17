import React from "react";
import { InputField } from "../../../../../../component/commons/UI/InputField/InputField";
import {
  emailRegex,
  emailRegexErrorMsg
} from "../../../../../../library/validationRegex";

export default function FindPasswordEmailField() {
  return (
    <InputField
      type='text'
      label={"이메일"}
      name={"email"}
      id={"input-email"}
      placeholder={"이메일을 입력해주세요."}
      required={true}
      pattern={{
        value: emailRegex,
        message: emailRegexErrorMsg
      }}
    />
  );
}
