import { useState } from "react";
import { useSignupMutation } from "../../query/auth/useSignupMutation";

export const useSignup = () => {
  const [percentage, setPercentage] = useState("0%");

  const { mutate: signupMutate, isPending: signupLoading } =
    useSignupMutation();

  return {
    percentage,
    setPercentage,
    signupMutate,
    signupLoading
  };
};
