import React from "react";
import styled from "styled-components";
import { resolveWebp } from "../../library/resolveWebp";

export const Title = styled.h2`
  text-align: center;
  font-weight: 500;
`;

export default function LoginFormTitle() {
  return (
    <Title>
      <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
    </Title>
  );
}
