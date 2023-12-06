import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const SignupLinkWrapper = styled.div`
  display: inline-block;
  font-size: 12px;
  color: #111;
  text-align: center;
`;

export const StyledSignupLink = styled(Link)`
  font-size: 12px;
  margin-left: 5px;
  font-weight: 500;
`;

export default function SignupLink() {
  return (
    <SignupLinkWrapper>
      아직 회원이 아닌가요?
      <StyledSignupLink to={"/signup"}>회원가입</StyledSignupLink>
    </SignupLinkWrapper>
  );
}
