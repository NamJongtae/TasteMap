import React from "react";
import { SignupLinkWrapper, StyledSignupLink } from '../login.styles';

export default function SignupLink() {
  return (
    <SignupLinkWrapper>
      아직 회원이 아닌가요?
      <StyledSignupLink to={"/signup"}>회원가입</StyledSignupLink>
    </SignupLinkWrapper>
  );
}
