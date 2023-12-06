import React from "react";
import { InputWrapper } from "./ProfileUpdateModal.styles";
import UserInput from "../../../component/commons/userInput/UserInput";
import ErrorMsg from "../../../component/commons/errorMsg/ErrorMsg";

interface IProps {
  displayNameValue: string;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  onChangeDisplayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ProfileUpdateDisplayName({
  
  displayNameValue,
  displayNameValid,
  onChangeDisplayName,
}: IProps) {
  return (
    <InputWrapper>
      <UserInput
        type='text'
        label={"닉네임"}
        name={"nickname"}
        id={"input-nickname"}
        placeholder={"4-10자 영문, 영문 + 숫자"}
        value={displayNameValue}
        onChange={onChangeDisplayName}
        minLength={4}
        maxLength={10}
      />
      {displayNameValid.errorMsg && (
        <ErrorMsg message={displayNameValid.errorMsg} />
      )}
    </InputWrapper>
  );
}
