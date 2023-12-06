import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledFindAccountLink = styled(Link)`
  font-size: 12px;
  align-self: flex-end;
`;

export default function FindAccountLink() {
  return (
    <StyledFindAccountLink to={"/findAccount"}>
      이메일 <span style={{ fontSize: "10px", verticalAlign: "top" }}>|</span>{" "}
      비밀번호 찾기
    </StyledFindAccountLink>
  );
}
