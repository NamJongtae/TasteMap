import { useEffect } from "react";
import { useFindPasswordMuataion } from "../../../query/auth/useFindPasswordMutation";
import { FieldValues } from 'react-hook-form';
export const useFindAccountPwDataFetch = () => {
  const {
    mutate: findPasswordMuate,
    isPending: findPasswordIsPending,
    data: isFindPassword,
    reset: findPasswordReset,
    error: findPasswordError,
  } = useFindPasswordMuataion();

  const findPasswordHandler = async (data: FieldValues) => {
    findPasswordMuate({
      email: data.email,
      phone: data.phone.replace(/-/g, "")
    });
  };

  useEffect(() => {
    return () => {
      findPasswordReset();
    };
  }, []);

  return {
    findPasswordHandler,
    findPasswordIsPending,
    isFindPassword,
    findPasswordError
  };
};
