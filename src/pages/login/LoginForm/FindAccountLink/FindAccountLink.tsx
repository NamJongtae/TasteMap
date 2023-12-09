import React from "react";
import { Line, StyledFindAccountLink } from '../../login.styles';

export default function FindAccountLink() {
  return (
    <StyledFindAccountLink to={"/findAccount"}>
      이메일 <Line /> 비밀번호 찾기
    </StyledFindAccountLink>
  );
}
