import React from "react";
import UserInput from "../../component/commons/userInput/UserInput";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import {
  CancelBtn,
  InputWrapper,
  SignupBtn,
  SignupForm
} from "./DefaultInfo.styles";

interface IProps {
  emailValue: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailValid: {
    errorMsg: string;
    valid: boolean;
  };
  passwordValue: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passowrdValid: {
    errorMsg: string;
    valid: boolean;
  };
  passwordChkValue: string;
  onChangePasswordChk: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChkValid: {
    errorMsg: string;
    valid: boolean;
  };
  phoneValue: string;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneValid: {
    errorMsg: string;
    valid: boolean;
  };
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  nextDisabled: boolean;
  cancelHandler: () => void;
}

export default function UserInfoSetting({
  emailValue,
  onChangeEmail,
  emailValid,
  passwordValue,
  onChangePassword,
  passowrdValid,
  passwordChkValue,
  onChangePasswordChk,
  passwordChkValid,
  phoneValue,
  onChangePhone,
  phoneValid,
  setNext,
  nextDisabled,
  cancelHandler
}: IProps) {
  return (
    <SignupForm>
      <InputWrapper>
        <UserInput
          type='text'
          label={"이메일 (필수)"}
          id={"input-email"}
          placeholder={"이메일 주소를 입력해주세요."}
          value={emailValue}
          onChange={onChangeEmail}
        />
        {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
      </InputWrapper>
      <InputWrapper>
        <UserInput
          type='password'
          label={"비밀번호 (필수)"}
          id={"input-password"}
          placeholder={"8-16자 특수문자, 숫자, 영문 포함"}
          value={passwordValue}
          onChange={onChangePassword}
          minLength={8}
          maxLength={16}
        />
        {passowrdValid.errorMsg && (
          <ErrorMsg message={passowrdValid.errorMsg} />
        )}
      </InputWrapper>
      <InputWrapper>
        <UserInput
          type='password'
          label={"비밀번호 확인 (필수)"}
          id={"input-passwordChk"}
          placeholder={"비밀번호 확인을 입력해주세요."}
          value={passwordChkValue}
          onChange={onChangePasswordChk}
          minLength={8}
          maxLength={16}
        />
        {passwordChkValid.errorMsg && (
          <ErrorMsg message={passwordChkValid.errorMsg} />
        )}
      </InputWrapper>
      <InputWrapper>
        <UserInput
          type='text'
          label={"휴대폰 (필수)"}
          id={"input-phone"}
          placeholder={"휴대폰 번호를 입력해주세요. ( - 제외 )"}
          value={phoneValue
            .replace(/[^0-9]/g, "")
            .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
          onChange={onChangePhone}
          maxLength={13}
        />
        {phoneValid.errorMsg && <ErrorMsg message={phoneValid.errorMsg} />}
      </InputWrapper>
      <SignupBtn
        type='button'
        disabled={nextDisabled}
        onClick={() => setNext(true)}
      >
        다음
      </SignupBtn>
      <CancelBtn type='button' onClick={cancelHandler}>
        취소
      </CancelBtn>
    </SignupForm>
  );
}
