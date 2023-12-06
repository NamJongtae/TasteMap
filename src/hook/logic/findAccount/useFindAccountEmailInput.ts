import { useEffect } from "react";
import { useValidationInput } from "../../useValidationInput";

interface IParms {
  activeMenu: "email" | "password";
}

export const useFindAccountEmailInput = ({ activeMenu }: IParms) => {
  const [emailValue, emailValid, onChangeEmail, setEmailValue, setEmailValid] =
    useValidationInput("", "email", false);

  const resetValue = () => {
    setEmailValue("");
    setEmailValid({ errorMsg: "", valid: false });
  };

  useEffect(() => {
    resetValue();
  }, [activeMenu]);

  return { emailValue, emailValid, onChangeEmail };
};
