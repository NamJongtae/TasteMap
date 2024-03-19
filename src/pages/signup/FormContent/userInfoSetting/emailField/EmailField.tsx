import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import {
  emailRegex,
  emailRegexErrorMsg
} from "../../../../../library/validationRegex";
import { useSignupCheckDuplication } from "../../../../../hook/logic/signup/useSignupCheckDuplication";

export default function EmailField() {
  const {
    checkDuplicationHandler: checkEmailDuplicationHandler,
    resetCheckDuplication: resetCheckEmailDuplication
  } = useSignupCheckDuplication({
    type: "email"
  });

  return (
    <InputField
      type='text'
      label={"이메일 (필수)"}
      name={"email"}
      id={"email"}
      placeholder={"이메일 주소를 입력해주세요."}
      pattern={{
        value: emailRegex,
        message: emailRegexErrorMsg
      }}
      required={true}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        checkEmailDuplicationHandler(e.target.value);
        resetCheckEmailDuplication();
      }}
    />
  );
}
