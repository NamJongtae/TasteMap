import React from "react";
import { InputField } from "../../../../../../component/commons/UI/InputField/InputField";
import {
  displayNameRegex,
  displayNameRegexErrorMsg
} from "../../../../../../library/validationRegex";

export default function FindEmailNicknameField() {
  return (
    <InputField
      label={"닉네임"}
      placeholder={"4-10자 영문, 영문+숫자 포함"}
      id={"nickname"}
      name={"nickname"}
      type={"text"}
      minLength={4}
      maxLength={10}
      required={true}
      pattern={{
        value: displayNameRegex,
        message: displayNameRegexErrorMsg
      }}
    />
  );
}
