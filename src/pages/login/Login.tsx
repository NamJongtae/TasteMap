import React, { useEffect, useRef, useState } from "react";
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

import { useValidationInput } from "../../hook/useValidationInput";
import Loading from "../../component/commons/loading/Loading";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import UserInput from "../../component/commons/userInput/UserInput";
import { resolveWebp } from "../../library/webpSupport";
import { useLoginMutation } from "../../hook/query/auth/useLoginMutation";
import { useSocialLoginMutation } from "../../hook/query/auth/useSocialLoginMutation";

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailValue, emailValid, onChangeEmail, setEmailValue] =
    useValidationInput("", "email", false);
  const [passwordValue, passwordValid, onChangePassword, setPasswordValue] =
    useValidationInput("", "password", false);

  const { mutate: loginMutate, isPending: loginIsPending } = useLoginMutation();
  const { mutate: socialLoginMutate, isPending: socialLoginIsPending } =
    useSocialLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValid.valid && passwordValid.valid) {
      loginMutate({ email: emailValue, password: passwordValue });
      setEmailValue("");
      setPasswordValue("");
      setDisabled(true);
    }
  };

  const socialLoginHandler = (type: "google" | "github") => {
    socialLoginMutate(type);
  };

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (emailValid.valid && passwordValid.valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, passwordValid]);

  return (
    <>
      <Title className='a11y-hidden'>로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={handleSubmit}>
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
              >
                구글 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
            <SocialLoginItem>
              <SocialLoginBtn
                className='github'
                type='button'
                onClick={() => socialLoginHandler("github")}
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
