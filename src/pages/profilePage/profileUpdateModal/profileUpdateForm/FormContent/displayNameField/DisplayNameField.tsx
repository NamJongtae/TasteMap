import React from "react";
import { InputField } from "../../../../../../component/commons/UI/InputField/InputField";
import { displayNameRegex } from "../../../../../../library/validationRegex";

interface IProps {
  resetCheckDuplication: () => void;
  checkDuplicationHandler: (value: string) => void;
}
export default function DisplayNameField({
  resetCheckDuplication,
  checkDuplicationHandler
}: IProps) {
  return (
    <InputField
      type='text'
      label={"닉네임"}
      name={"displayName"}
      id={"displayName"}
      placeholder={"4-10자 영문, 영문 + 숫자"}
      inputStyle={{ backgroundColor: "#fff" }}
      minLength={4}
      maxLength={10}
      pattern={{
        value: displayNameRegex,
        message: "4-10자 영문 소문자, 영문 소문자+숫자를 입력해주세요."
      }}
      onChange={(e) => {
        resetCheckDuplication();
        checkDuplicationHandler(e.target.value);
      }}
      required={true}
    />
  );
}
