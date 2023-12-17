import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  displayNameRegex,
  displayNameRegexErrorMsg
} from "../../../../../library/validationRegex";
import { useSignupCheckDuplication } from "../../../../../hook/logic/signup/useSignupCheckDuplication";

export default function DisplayNameField() {
  const { checkDuplicationHandler, resetCheckDuplication } =
    useSignupCheckDuplication({
      type: "displayName"
    });

  return (
    <InputField
      type='text'
      label={"닉네임 (필수)"}
      name={"displayName"}
      id={"displayName"}
      placeholder={"닉네임을 입력해주세요."}
      pattern={{
        value: displayNameRegex,
        message: displayNameRegexErrorMsg
      }}
      required={true}
      onChange={(e) => {
        checkDuplicationHandler(e.target.value);
        resetCheckDuplication();
      }}
    />
  );
}
