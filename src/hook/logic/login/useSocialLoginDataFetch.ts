import { useSocialLoginMutation } from "../../query/auth/useSocialLoginMutation";

export const useSocialLoginDataFetch = () => {
  const { mutate: socialLoginMutate, isPending: socialLoginIsPending } =
    useSocialLoginMutation();

  const socialLoginHandler = (type: "google" | "github") => {
    socialLoginMutate(type);
  };

  return { socialLoginHandler, socialLoginIsPending };
};
