import React from "react";
import { resolveWebp } from "../../../../../library/resolveWebp";
import { FormTitle } from "../../../login.styles";

export default function LoginFormTitle() {
  return (
    <FormTitle>
      <img src={resolveWebp("/assets/webp/icon-loginLogo.webp", "svg")} />
    </FormTitle>
  );
}
