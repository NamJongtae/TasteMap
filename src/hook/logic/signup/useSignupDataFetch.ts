import { useSignupMutation } from "../../query/auth/useSignupMutation";

interface IParms {
  displayNameValue: string;
  uploadImg: File | "";
  emailValue: string;
  passwordValue: string;
  phoneValue: string;
  introduceValue: string;
}
export const useSignupDataFetch = ({
  displayNameValue,
  uploadImg,
  emailValue,
  passwordValue,
  phoneValue,
  introduceValue
}: IParms) => {
  const { mutate: signupMutate, isPending: signupLoading } =
    useSignupMutation();

  const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupMutate({
      displayName: displayNameValue.toLowerCase(),
      file: uploadImg,
      email: emailValue,
      password: passwordValue,
      phone: phoneValue.replace(/-/g, ""),
      introduce: introduceValue
    });
  };

  return { signupHandler, signupLoading };
};
