import { useLoginMutation } from "../../query/auth/useLoginMutation";

export const useLoginDataFetch = () => {
  const { mutate: loginMutate, isPending: loginIsPending } = useLoginMutation();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginMutate({
      email: formData.get("email") as string,
      password: formData.get("password") as string
    });
  };

  return { loginIsPending, loginHandler };
};
