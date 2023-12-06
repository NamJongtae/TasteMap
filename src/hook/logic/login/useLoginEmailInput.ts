import { useEffect, useRef } from "react";
import { useValidationInput } from "../../useValidationInput";

export const useLoginEmailInput = () => {
  const [emailValue, emailValid, onChangeEmail, setEmailValue] =
    useValidationInput("", "email", false);
  const emailRef = useRef<HTMLInputElement>(null);

  const resetEmailValue = () => {
    setEmailValue("");
  };

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  return {
    emailValue,
    emailValid,
    emailRef,
    onChangeEmail,
    setEmailValue,
    resetEmailValue
  };
};
