import React from "react";
import { StyledLoginBtn } from "../../../login.styles";
import { useFormContext } from "react-hook-form";

interface IProps {
  loginIsPending: boolean;
}
export default function LoginBtn({ loginIsPending }: IProps) {
  const { formState } = useFormContext();

  return (
    <StyledLoginBtn
      type='submit'
      disabled={!formState.isValid || loginIsPending}
    >
      {loginIsPending ? "로그인중..." : "로그인"}
    </StyledLoginBtn>
  );
}
