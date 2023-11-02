import React from "react";
import {
  FindAccountBtn,
  FindAccountForm,
  FindInfoDate,
  FindInfoText,
  FindInfoWrapper,
  FormMenu,
  FormMenuBtn,
  FormMenuLi,
  FormWrapper,
  LoginLink,
  Title,
  Wrapper
} from "./findAccount.style";
import UserInput from "../../component/commons/userInput/UserInput";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";

interface IProps {
  findPasswordMenu: boolean;
  onClickFindEmailMenu: () => void;
  onClickFindPwMenu: (e: React.MouseEvent) => void;
  onClickFindPassword: (e: React.FormEvent<HTMLFormElement>) => void;
  onClickFindEmail: (e: React.FormEvent<HTMLFormElement>) => void;
  findEmailValue: { email?: string; createdAt?: string };
  emailValue: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailValid: {
    errorMsg: string;
    valid: boolean;
  };
  displayNameValue: string;
  onChangeDisplayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  phoneValue: string;
  onChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneValid: {
    errorMsg: string;
    valid: boolean;
  };
  findPasswordValue: boolean;
  disabled: boolean;
}
export default function FindAccountUI({
  findPasswordMenu,
  onClickFindEmailMenu,
  onClickFindPwMenu,
  onClickFindPassword,
  onClickFindEmail,
  findEmailValue,
  emailValue,
  onChangeEmail,
  emailValid,
  displayNameValue,
  onChangeDisplayName,
  displayNameValid,
  phoneValue,
  onChangePhone,
  phoneValid,
  findPasswordValue,
  disabled
}: IProps) {
  return (
    <Wrapper>
      <Title className='a11y-hidden'>이메일 비밀번호 찾기</Title>
      <FormWrapper>
        <FormMenu>
          <FormMenuLi active={!findPasswordMenu}>
            <FormMenuBtn
              active={!findPasswordMenu}
              type='button'
              onClick={onClickFindEmailMenu}
            >
              이메일 찾기
            </FormMenuBtn>
          </FormMenuLi>
          <FormMenuLi active={findPasswordMenu}>
            <FormMenuBtn
              active={findPasswordMenu}
              type='button'
              onClick={onClickFindPwMenu}
            >
              비밀번호 찾기
            </FormMenuBtn>
          </FormMenuLi>
        </FormMenu>
        <FindAccountForm
          onSubmit={findPasswordMenu ? onClickFindPassword : onClickFindEmail}
        >
          {findEmailValue.email || findPasswordValue ? (
            <FindInfoWrapper>
              {findEmailValue.email ? (
                <>
                  <FindInfoText>
                    휴대폰 번호와 일치하는 이메일 정보입니다.
                  </FindInfoText>
                  <FindInfoText>
                    {`이메일 : ${findEmailValue.email}`}
                  </FindInfoText>
                  <FindInfoText>
                    가입일 :{" "}
                    <FindInfoDate dateTime={findEmailValue.createdAt}>
                      {findEmailValue.createdAt}
                    </FindInfoDate>
                  </FindInfoText>
                </>
              ) : (
                <FindInfoText>
                  {
                    "가입된 메일로 비밀번호 변경 메일을 발송하였습니다.\n메일이 없을 경우 스팸 메일함을 확인해주세요."
                  }
                </FindInfoText>
              )}
            </FindInfoWrapper>
          ) : (
            <>
              {findPasswordMenu ? (
                <>
                  <UserInput
                    type='text'
                    label={"이메일"}
                    id={"input-email"}
                    placeholder={"이메일을 입력해주세요."}
                    value={emailValue}
                    onChange={onChangeEmail}
                  />
                  {emailValid.errorMsg && (
                    <ErrorMsg message={emailValid.errorMsg} />
                  )}
                </>
              ) : (
                <>
                  <UserInput
                    label={"닉네임"}
                    placeholder={"4-10자 영문, 영문+숫자 포함"}
                    type={"text"}
                    value={displayNameValue}
                    onChange={onChangeDisplayName}
                    minLength={4}
                    maxLength={10}
                  />
                  {displayNameValid.errorMsg && (
                    <ErrorMsg message={displayNameValid.errorMsg} />
                  )}
                </>
              )}
              <UserInput
                label={"휴대폰"}
                placeholder={"휴대폰 번호 ( - 제외 )"}
                type={"text"}
                value={phoneValue
                  .replace(/[^0-9]/g, "")
                  .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`)}
                onChange={onChangePhone}
                maxLength={13}
              />
              {phoneValid.errorMsg && (
                <ErrorMsg message={phoneValid.errorMsg} />
              )}
            </>
          )}
          {findEmailValue.email || findPasswordValue ? (
            <LoginLink to='/login'>로그인 하러가기</LoginLink>
          ) : (
            <FindAccountBtn type='submit' disabled={disabled}>
              {findPasswordMenu ? "비밀번호 찾기" : "이메일 찾기"}
            </FindAccountBtn>
          )}
        </FindAccountForm>
      </FormWrapper>
    </Wrapper>
  );
}
