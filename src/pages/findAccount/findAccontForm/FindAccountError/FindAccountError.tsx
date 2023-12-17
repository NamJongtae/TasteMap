import React from "react";
import ErrorMsg from "../../../../component/commons/errorMsg/ErrorMsg";

import { useFormContext } from "react-hook-form";
import { useFindAccountError } from "../../../../hook/logic/findAccount/findAccountForm/useFindAccountError";

interface IProps {
  isError: Error | null;
}

export default function FindAccountError({ isError }: IProps) {
  const { getValues, reset } = useFormContext();
  const nickname = getValues("nickname");
  const email = getValues("email");
  const phone = getValues("phone");
  const { error } = useFindAccountError({
    nicknameOrEmail: nickname || email,
    phone,
    isError,
    reset
  });

  return error ? <ErrorMsg message={error} /> : null;
}
