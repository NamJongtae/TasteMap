import { TLogin } from "../../../types/types";
import { useSocialLoginMutation } from "../../query/auth/useSocialLoginMutation";

export const useSocialLoginDataFetch = () => {
  const { mutate: socialLoginMutate, isPending: socialLoginIsPending } =
    useSocialLoginMutation();

  const socialLoginHandler = (type: TLogin) => {
    socialLoginMutate(type);
  };

  return { socialLoginHandler, socialLoginIsPending };
};
