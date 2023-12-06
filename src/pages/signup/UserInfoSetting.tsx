import React from "react";
import { InputField } from "../../component/commons/UI/InputField";
import styled from "styled-components";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SignupBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

const CancelBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

interface IProps {
  emailValue: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailValid: {
    errorMsg: string;
    valid: boolean;
  };
  passwordValue: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordValid: {
    errorMsg: string;
    valid: boolean;
  };
  checkPwMatchValidation: (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordChkValue: string
  ) => void;
  passwordChkValue: string;
  onChangePasswordChk: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordChkValid: {
    errorMsg: string;
    valid: boolean;
  };
  checkPwChkMatchValidation: (
    e: React.ChangeEvent<HTMLInputElement>,
    passwordValue: string
  ) => void;
  phoneValue: string;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneValid: {
    errorMsg: string;
    valid: boolean;
  };
  nextStepHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  nextDisabled: boolean;
  cancelHandler: () => void;
}

export default function UserInfoSetting({
  emailValue,
  onChangeEmail,
  emailValid,
  passwordValue,
  onChangePassword,
  checkPwMatchValidation,
  passwordValid,
  passwordChkValue,
  onChangePasswordChk,
  checkPwChkMatchValidation,
  passwordChkValid,
  phoneValue,
  onChangePhone,
  phoneValid,
  nextStepHandler,
  nextDisabled,
  cancelHandler
}: IProps) {
  return (
    <SignupForm onSubmit={nextStepHandler}>
      <InputField
        type='text'
        label={"이메일 (필수)"}
        name={"email"}
        id={"input-email"}
        placeholder={"이메일 주소를 입력해주세요."}
        value={emailValue}
        onChange={onChangeEmail}
        errorMsg={emailValid.errorMsg}
      />
      <InputField
        type='password'
        label={"비밀번호 (필수)"}
        name={"password"}
        id={"input-password"}
        placeholder={"8-16자 특수문자, 숫자, 영문 포함"}
        value={passwordValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangePassword(e);
          checkPwMatchValidation(e, passwordChkValue);
        }}
        minLength={8}
        maxLength={16}
        errorMsg={passwordValid.errorMsg}
      />
      <InputField
        type='password'
        label={"비밀번호 확인 (필수)"}
        name={"password"}
        id={"input-passwordChk"}
        placeholder={"비밀번호 확인을 입력해주세요."}
        value={passwordChkValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChangePasswordChk(e);
          checkPwChkMatchValidation(e, passwordValue);
        }}
        minLength={8}
        maxLength={16}
        errorMsg={passwordChkValid.errorMsg}
      />
      <InputField
        type='text'
        label={"휴대폰 (필수)"}
        name={"phone"}
        id={"input-phone"}
        placeholder={"휴대폰 번호를 입력해주세요. ( - 제외 )"}
        value={phoneValue
          .replace(/[^0-9]/g, "")
          .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
        onChange={onChangePhone}
        maxLength={13}
        errorMsg={phoneValid.errorMsg}
      />
      <SignupBtn type='submit' disabled={nextDisabled}>
        다음
      </SignupBtn>
      <CancelBtn type='button' onClick={cancelHandler}>
        취소
      </CancelBtn>
    </SignupForm>
  );
}
