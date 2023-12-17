import React from "react";
import { FormContentWrapper } from "../../login.styles";
import LoginFormTitle from "./LoginFormTitle/LoginFormTitle";
import LoginEmail from "./LoginEmailField/LoginEmail";
import LoginPassword from "./LoginPasswordField/LoginPassword";
import FindAccountLink from "./FindAccountLink/FindAccountLink";
import LoginError from "./LoginError/LoginError";
import LoginBtn from "./LoginBtn/LoginBtn";
import SignupLink from "./SignupLink/SignupLink";
import { SocialLogin } from "./socialLogin/SocialLogin";

interface IProps {
  loginError: Error | null;
  loginIsPending: boolean;
}
export default function LoginFormContent({
  loginError,
  loginIsPending
}: IProps) {
  return (
    <FormContentWrapper>
      <LoginFormTitle />

      <LoginEmail />

      <LoginPassword />

      <FindAccountLink />

      {<LoginError isError={loginError} />}

      <LoginBtn loginIsPending={loginIsPending} />

      <SignupLink />

      <SocialLogin />
    </FormContentWrapper>
  );
}
