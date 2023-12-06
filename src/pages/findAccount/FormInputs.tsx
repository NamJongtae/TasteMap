import React from "react";
import { InputField } from "../../component/commons/UI/InputField";

interface IProps {
  activeMenu: "email" | "password";
  emailValue: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailErrorMsg: string;
  displayNameValue: string;
  onChangeDisplayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayNameErrorMsg: string;
  phoneValue: string;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneErrorMsg: string;
}
export default function FormInputs({
  activeMenu,
  emailValue,
  onChangeEmail,
  emailErrorMsg,
  displayNameValue,
  onChangeDisplayName,
  displayNameErrorMsg,
  phoneValue,
  onChangePhone,
  phoneErrorMsg
}: IProps) {
  return (
    <>
      {activeMenu === "email" ? (
        <InputField
          label={"닉네임"}
          placeholder={"4-10자 영문, 영문+숫자 포함"}
          name={"nickname"}
          type={"text"}
          value={displayNameValue}
          onChange={onChangeDisplayName}
          minLength={4}
          maxLength={10}
          errorMsg={displayNameErrorMsg}
        />
      ) : (
        <InputField
          type='text'
          label={"이메일"}
          name={"email"}
          id={"input-email"}
          placeholder={"이메일을 입력해주세요."}
          value={emailValue}
          onChange={onChangeEmail}
          errorMsg={emailErrorMsg}
        />
      )}
      <InputField
        label={"휴대폰"}
        placeholder={"휴대폰 번호 ( - 제외 )"}
        name={"phone"}
        type={"text"}
        value={phoneValue
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
        onChange={onChangePhone}
        maxLength={13}
        errorMsg={phoneErrorMsg}
      />
    </>
  );
}
