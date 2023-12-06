import { useEffect } from "react";
import { useFindPasswordMuataion } from "../../query/auth/useFindPasswordMutation";

interface IParms {
  activeMenu: "email" | "password";
}

export const useFindAccountPwDataFetch = ({
  activeMenu,
}: IParms) => {
  const {
    mutate: findPasswordMuate,
    isPending: findPasswordIsPending,
    data: isFindPassword,
    reset: findPasswordReset
  } = useFindPasswordMuataion();

  const findPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    findPasswordMuate({
      email,
      phone: phone.replace(/-/g, "")
    });
  };

  useEffect(() => {
    findPasswordReset();
  }, [activeMenu]);

  return {
    findPasswordHandler,
    findPasswordIsPending,
    isFindPassword
  };
};
