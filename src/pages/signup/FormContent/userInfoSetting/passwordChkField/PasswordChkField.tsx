import React, { useEffect } from "react";
import { InputField } from "../../../../../component/commons/UI/InputField/InputField";
import { useFormContext } from "react-hook-form";
import {
  passwordRegex,
  passwordRegexErrorMsg
} from "../../../../../library/validationRegex";

export default function PasswordChkField() {
  const { watch, trigger } = useFormContext();

  const passwordValue = watch("password");

  useEffect(() => {
    trigger("passwordChk");
  }, [passwordValue]);

  return (
    <InputField
      type='password'
      label={"비밀번호 확인 (필수)"}
      name={"passwordChk"}
      id={"passwordChk"}
      placeholder={"비밀번호 확인을 입력해주세요."}
      minLength={8}
      maxLength={16}
      pattern={{
        value: passwordRegex,
        message: passwordRegexErrorMsg
      }}
      required={true}
      validate={{
        passwordMatch: (value) =>
          passwordValue === value || "비밀번호가 일치하지 않습니다."
      }}
    />
  );
}
