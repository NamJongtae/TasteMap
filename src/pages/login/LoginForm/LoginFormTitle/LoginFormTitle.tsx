import React from "react";
import { resolveWebp } from "../../../../library/resolveWebp";
import { Title } from './loginFormTitle.styles';

export default function LoginFormTitle() {
  return (
    <Title>
      <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
    </Title>
  );
}
