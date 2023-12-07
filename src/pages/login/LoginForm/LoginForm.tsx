import React from "react";
import { InputField } from "../../../component/commons/UI/InputField";
import LoginFormTitle from "./LoginFormTitle/LoginFormTitle";
import FindAccountLink from "../FindAccountLink/FindAccountLink";
import SignupLink from "../SignupLink/SignupLink";
import { SocialLoginBtns } from "../socialLoginBtn/SocialLoginBtns";
import { useLoginDataFetch } from "../../../hook/logic/login/useLoginDataFetch";
import { useSocialLoginDataFetch } from "../../../hook/logic/login/useSocialLoginDataFetch";
import { useLoginEmailInput } from "../../../hook/logic/login/useLoginEmailInput";
import Loading from "../../../component/commons/loading/Loading";
import { useLoginPasswordInput } from "../../../hook/logic/login/useLoginPasswordInput";
import { Form, LoginBtn } from './loginForm.style';

export default function LoginForm() {
  const { emailValue, emailValid, onChangeEmail, emailRef } =
    useLoginEmailInput();

  const { passwordValue, passwordValid, onChangePassword } =
    useLoginPasswordInput();

  const { loginIsPending, loginHandler } = useLoginDataFetch();

  const { socialLoginHandler, socialLoginIsPending } =
    useSocialLoginDataFetch();

  if (loginIsPending || socialLoginIsPending) {
    return <Loading />;
  }

  return (
    <Form onSubmit={loginHandler}>
      <LoginFormTitle />
      <InputField
        label_hidden={true}
        label={"이메일"}
        name={"email"}
        id={"input-email"}
        placeholder={"Email"}
        type={"email"}
        onChange={onChangeEmail}
        value={emailValue}
        InputRef={emailRef}
        errorMsg={emailValid.errorMsg}
      />
      <InputField
        label_hidden={true}
        label={"비밀번호"}
        name={"password"}
        id={"input-password"}
        placeholder={"Password"}
        type={"password"}
        onChange={onChangePassword}
        value={passwordValue}
        errorMsg={passwordValid.errorMsg}
      />

      <FindAccountLink />
      <LoginBtn
        type='submit'
        disabled={!(emailValid.valid && passwordValid.valid)}
      >
        로그인
      </LoginBtn>
      <SignupLink />

      <SocialLoginBtns
        buttonTypeArr={["google", "github"]}
        textArr={["구글 계정으로 로그인", "깃 허브 계정으로 로그인"]}
        onClickArr={[
          () => socialLoginHandler("google"),
          () => socialLoginHandler("github")
        ]}
      />
    </Form>
  );
}
