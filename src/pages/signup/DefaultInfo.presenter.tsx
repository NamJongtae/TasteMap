import React from "react";
import {
  CancelBtn,
  FormWrapper,
  InputWrapper,
  ProgressBar,
  ProgressCheck,
  ProgressCheckText,
  ProgressCheckWrapper,
  ProgressTitle,
  ProgressWrapper,
  SignupBtn,
  SignupForm,
  Title,
  Wrapper
} from "./DefaultInfo.styles";
import UserInput from "../../component/commons/userInput/UserInput";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import ProfileSetting from "./ProfileSetting.container";
import Loading from "../../component/commons/loading/Loading";
import { UseMutateFunction } from "@tanstack/react-query";

interface IProps {
  defaultInfo: boolean;
  percentage: string;
  profile: boolean;
  next: boolean;
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
  disabled: boolean;
  setProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  signupLoading: boolean;
  onClickCancel: () => void;
  mutate: UseMutateFunction<
    {
      uid: string;
      email: string | null;
      displayName: string | null;
      photoURL: string | undefined;
    },
    Error,
    {
      displayName: string;
      file: "" | File;
      email: string;
      password: string;
      phone: string;
      introduce: string;
    },
    unknown
  >;
  isWebpSupported: boolean | null;
}

export default function DefaultInfoUI({
  defaultInfo,
  percentage,
  profile,
  next,
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
  disabled,
  setProfile,
  setPercentage,
  setNext,
  signupLoading,
  onClickCancel,
  mutate,
  isWebpSupported
}: IProps) {
  return (
    <Wrapper>
      <FormWrapper>
        <Title>회원가입</Title>
        <ProgressWrapper>
          <ProgressTitle className='a11y-hidden'>회원가입 진행바</ProgressTitle>
          <ProgressCheckWrapper>
            <ProgressCheck
              className='defalut'
              active={defaultInfo}
              $isWebpSupported={isWebpSupported}
            ></ProgressCheck>
            <ProgressCheckText>기본정보 입력</ProgressCheckText>
          </ProgressCheckWrapper>
          <ProgressBar percentage={percentage}></ProgressBar>
          <ProgressCheckWrapper>
            <ProgressCheck
              className='profile'
              active={profile}
              $isWebpSupported={isWebpSupported}
            ></ProgressCheck>
            <ProgressCheckText>프로필 설정</ProgressCheckText>
          </ProgressCheckWrapper>
        </ProgressWrapper>
        {!next ? (
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
              {emailValid.errorMsg && (
                <ErrorMsg message={emailValid.errorMsg} />
              )}
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
              {phoneValid.errorMsg && (
                <ErrorMsg message={phoneValid.errorMsg} />
              )}
            </InputWrapper>
            <SignupBtn
              type='button'
              disabled={disabled}
              onClick={() => setNext(true)}
            >
              다음
            </SignupBtn>
            <CancelBtn type='button' onClick={onClickCancel}>
              취소
            </CancelBtn>
          </SignupForm>
        ) : (
          <ProfileSetting
            setProfile={setProfile}
            emailValue={emailValue}
            passwordValue={passwordValue}
            phoneValue={phoneValue}
            setPercentage={setPercentage}
            setNext={setNext}
            mutate={mutate}
          />
        )}
      </FormWrapper>
      {signupLoading && <Loading />}
    </Wrapper>
  );
}
