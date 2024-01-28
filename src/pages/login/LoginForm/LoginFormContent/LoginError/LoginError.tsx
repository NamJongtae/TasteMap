import React from "react";
import ErrorMsg from "../../../../../component/commons/errorMsg/ErrorMsg";
import { useLoginError } from "../../../../../hook/logic/login/useLoginError";
import { useFormContext } from "react-hook-form";
import { TError } from "../../../../../types/types";

interface IProps {
  isError: TError;
}

export default function LoginError({ isError }: IProps) {
  const { getValues, reset } = useFormContext();
  const email = getValues("email");
  const password = getValues("password");
  const { error } = useLoginError({ email, password, reset, isError });

  return error ? <ErrorMsg message={error} /> : null;
}
