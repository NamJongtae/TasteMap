import React from "react";
import Loading from "../../component/commons/loading/Loading";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import UserInput from "../../component/commons/userInput/UserInput";
import {
  LoginBtn,
  LoginForm,
  LoginFormTitle,
  Title,
  Wrapper,
  SignupLink,
  FindAccountLink,
  SignupText,
  SocialLoginWrapper,
  SocialLoginBtn,
  InputWrapper,
  SocialLoginItem
} from "./login.styels";
import { useLogin } from "../../hook/logic/login/useLogin";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resolveWebp } from '../../library/resolveWebp';

export default function Login() {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  const {
    loginHandler,
    socialLoginHandler,
    disabled,
    onChangeEmail,
    onChangePassword,
    loginIsPending,
    socialLoginIsPending,
    emailValue,
    emailRef,
    emailValid,
    passwordValue,
    passwordValid
  } = useLogin();

  return (
    <>
      <Title className='a11y-hidden'>로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={loginHandler}>
          <LoginFormTitle>
            <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
          </LoginFormTitle>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"이메일"}
              id={"input-email"}
              placeholder={"Email"}
              type={"text"}
              value={emailValue}
              onChange={onChangeEmail}
              InputRef={emailRef}
            />
            {emailValid.errorMsg && <ErrorMsg message={emailValid.errorMsg} />}
          </InputWrapper>
          <InputWrapper>
            <UserInput
              label_hidden={true}
              label={"비밀번호"}
              id={"input-password"}
              placeholder={"Password"}
              type={"password"}
              onChange={onChangePassword}
              value={passwordValue}
            />
            {passwordValid.errorMsg && (
              <ErrorMsg message={passwordValid.errorMsg} />
            )}
          </InputWrapper>

          <FindAccountLink to={"/findAccount"}>
            이메일{" "}
            <span style={{ fontSize: "10px", verticalAlign: "top" }}>|</span>{" "}
            비밀번호 찾기
          </FindAccountLink>
          <LoginBtn type='submit' disabled={disabled}>
            로그인
          </LoginBtn>

          <SignupText>
            아직 회원이 아닌가요?
            <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
          <SocialLoginWrapper>
            <SocialLoginItem>
              <SocialLoginBtn
                className='google'
                type='button'
                onClick={() => socialLoginHandler("google")}
                $isWebpSupported={isWebpSupported}
              >
                구글 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
            <SocialLoginItem>
              <SocialLoginBtn
                className='github'
                type='button'
                onClick={() => socialLoginHandler("github")}
                $isWebpSupported={isWebpSupported}
              >
                깃 허브 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
          </SocialLoginWrapper>
        </LoginForm>
      </Wrapper>
      {(loginIsPending || socialLoginIsPending) && <Loading />}
    </>
  );
}
