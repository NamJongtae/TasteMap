import { useEffect, useRef, useState } from "react";
import { useValidationInput } from "../../useValidationInput";
import { useLoginMutation } from "../../query/auth/useLoginMutation";
import { useSocialLoginMutation } from "../../query/auth/useSocialLoginMutation";

export const useLogin = () => {
  const [disabled, setDisabled] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailValue, emailValid, onChangeEmail, setEmailValue] =
    useValidationInput("", "email", false);
  const [passwordValue, passwordValid, onChangePassword, setPasswordValue] =
    useValidationInput("", "password", false);

  const { mutate: loginMutate, isPending: loginIsPending } = useLoginMutation();
  const { mutate: socialLoginMutate, isPending: socialLoginIsPending } =
    useSocialLoginMutation();

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValid.valid && passwordValid.valid) {
      loginMutate({ email: emailValue, password: passwordValue });
      setEmailValue("");
      setPasswordValue("");
      setDisabled(true);
    }
  };

  const socialLoginHandler = (type: "google" | "github") => {
    socialLoginMutate(type);
  };

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (emailValid.valid && passwordValid.valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [emailValid, passwordValid]);

  return {
    loginHandler,
    socialLoginHandler,
    disabled,
    onChangeEmail,
    onChangePassword,
    loginIsPending,
    socialLoginIsPending,
    emailValue,
    emailRef,
    emailValid,
    passwordValue,
    passwordValid
  };
};
