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
  SocialLoginItem,
} from "./login.styels";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { useValidationInput } from '../../hook/useValidationInput';
import Loading from '../../compoent/commons/loading/Loading';
import ErrorMsg from '../../compoent/commons/errorMsg/ErrorMsg';
import UserInput from '../../compoent/commons/userInput/UserInput';
import { fetchLogin, fetchSocialLogin } from '../../slice/userSlice';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState)=>state.user.isLoading);
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailValue, emailValid, onChangeEmail, setEmailValue] =
    useValidationInput("", "email", false);
  const [passwordValue, passwordValid, onChangePassword, setPasswordValue] =
    useValidationInput("", "password", false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValid.valid && passwordValid.valid) {
      dispatch(fetchLogin({emailValue, passwordValue}));
      setEmailValue("");
      setPasswordValue("");
      setDisabled(true);
    }
  };

  useEffect(() => {
    emailRef.current&&emailRef.current.focus();
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
      <Title className="a11y-hidden">로그인 페이지</Title>
      <Wrapper>
        <LoginForm onSubmit={handleSubmit}>
          <LoginFormTitle><img src='/assets/icon-loginLogo.svg' /></LoginFormTitle>
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
          <LoginBtn type="submit" disabled={disabled}>
            로그인
          </LoginBtn>

          <SignupText>
            아직 회원이 아닌가요?
            <SignupLink to={"/signup"}>회원가입</SignupLink>
          </SignupText>
          <SocialLoginWrapper>
            <SocialLoginItem>
              <SocialLoginBtn
                className="google"
                type="button"
                onClick={() => dispatch(fetchSocialLogin("google"))}
              >
                구글 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
            <SocialLoginItem>
              <SocialLoginBtn
                className="github"
                type="button"
                onClick={() => dispatch(fetchSocialLogin("github"))}
              >
                깃 허브 계정으로 로그인
              </SocialLoginBtn>
            </SocialLoginItem>
          </SocialLoginWrapper>
        </LoginForm>
      </Wrapper>
      {isLoading && <Loading />}
    </>
  );
}
