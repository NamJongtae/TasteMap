import React from "react";
import { InputField } from "../../component/commons/UI/InputField";
import LoginFormTitle from "./LoginFormTitle";
import FindAccountLink from "./FindAccountLink";
import SignupLink from "./SignupLink";
import { SocialLoginBtns } from "./SocialLoginBtns";
import styled from "styled-components";
import { useLoginDataFetch } from "../../hook/logic/login/useLoginDataFetch";
import { useSocialLoginDataFetch } from "../../hook/logic/login/useSocialLoginDataFetch";
import { useLoginEmailInput } from "../../hook/logic/login/useLoginEmailInput";
import Loading from "../../component/commons/loading/Loading";
import { useLoginPasswordInput } from "../../hook/logic/login/useLoginPasswordInput";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: 20px;
  max-width: 400px;
  width: calc(100% - 60px);
  padding: 100px 40px 0 40px;
  @media screen and (max-width: 431px) {
    width: calc(100% - 40px);
    padding: 30px 20px;
  }
`;
export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;
export const LoginBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

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
