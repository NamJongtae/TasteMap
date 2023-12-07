import { useEffect } from "react";
import { useFindAccountMutation } from "../../../query/auth/useFindEmailMutation";

interface IParms {
  activeMenu: "email" | "password";
}
export const useFindAccountEmailDataFetch = ({ activeMenu }: IParms) => {
  const {
    mutate: findEmailMuate,
    isPending: findEmailIsPending,
    data: findEmailValue,
    reset: findEmailReset
  } = useFindAccountMutation();

  const findEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const displayName = formData.get("nickname") as string;
    const phone = formData.get("phone") as string;

    findEmailMuate({
      displayName,
      phone: phone.replace(/-/g, "")
    });
  };

  useEffect(() => {
    findEmailReset();
  }, [activeMenu]);

  return {
    findEmailHandler,
    findEmailValue,
    findEmailIsPending
  };
};
