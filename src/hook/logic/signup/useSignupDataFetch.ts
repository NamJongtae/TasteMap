import { FieldValues } from "react-hook-form";
import { useSignupMutation } from "../../query/auth/useSignupMutation";

export const useSignupDataFetch = () => {
  const { mutate: signupMutate, isPending: signupLoading } =
    useSignupMutation();

  const signupHandler = async (data: FieldValues) => {
    signupMutate({
      displayName: data.displayName.toLowerCase(),
      file: data.img,
      email: data.email,
      password: data.password,
      phone: data.phone.replace(/-/g, ""),
      introduce: data.introduce
    });
  };

  return { signupHandler, signupLoading };
};
