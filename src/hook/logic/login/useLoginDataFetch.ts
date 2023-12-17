import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../../query/auth/useLoginMutation";

export const useLoginDataFetch = () => {
  const { mutate: loginMutate, isPending: loginIsPending, error: loginError } = useLoginMutation();

  const loginHandler = async (data: FieldValues) => {
    await loginMutate({
      email: data.email,
      password: data.password
    });
  };

  return { loginIsPending, loginHandler, loginError };
};
