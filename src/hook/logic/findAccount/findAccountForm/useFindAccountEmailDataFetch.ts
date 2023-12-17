import { useEffect } from "react";
import { useFindAccountMutation } from "../../../query/auth/useFindEmailMutation";
import { FieldValues } from "react-hook-form";

export const useFindAccountEmailDataFetch = () => {
  const {
    mutate: findEmailMuate,
    isPending: findEmailIsPending,
    data: findEmailValue,
    reset: findEmailReset,
    error: findEmailError
  } = useFindAccountMutation();

  const findEmailHandler = async (data: FieldValues) => {
    findEmailMuate({
      displayName: data.nickname,
      phone: data.phone.replace(/-/g, "")
    });
  };

  useEffect(() => {
    return () => {
      findEmailReset();
    };
  }, []);

  return {
    findEmailHandler,
    findEmailValue,
    findEmailIsPending,
    findEmailError
  };
};
