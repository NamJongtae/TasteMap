import { useEffect, useState } from "react";
import { useValidationInput } from "../../useValidationInput";
import { useFindAccountMutation } from "../../query/auth/useFindEmailMutation";
import { useFindPasswordMuataion } from "../../query/auth/useFindPasswordMutation";

export const useFindAccount = () => {
  const [
    displayNameValue,
    displayNameValid,
    onChangeDisplayName,
    setDisplayNameValue,
    setDisplayNameValid
  ] = useValidationInput("", "displayName", false);

  const [emailValue, emailValid, onChangeEmail, setEmailValue, setEmailValid] =
    useValidationInput("", "email", false);

  const [phoneValue, phoneValid, onChangePhone, setPhoneValue, setPhoneValid] =
    useValidationInput("", "phone", false);

  const [disabled, setDisabled] = useState(false);
  const [findPasswordMenu, setFindPasswordMenu] = useState(false);

  const {
    mutate: findEmailMuate,
    isPending: findEmailIsPending,
    data: findEmailValue,
    reset: findEmailReset
  } = useFindAccountMutation();

  const {
    mutate: findPasswordMuate,
    isPending: findPasswordIsPending,
    data: isFindPassword,
    reset: findPasswordReset
  } = useFindPasswordMuataion();

  const resetValue = () => {
    setEmailValue("");
    setEmailValid({ errorMsg: "", valid: false });
    setDisplayNameValue("");
    setDisplayNameValid({ errorMsg: "", valid: false });
    setPhoneValue("");
    setPhoneValid({ errorMsg: "", valid: false });
  };

  const findEmailActiveHandler = () => {
    setFindPasswordMenu(false);
    setDisabled(false);
    isFindPassword && findPasswordReset();
    resetValue();
  };

  const findPwActiveHandler = () => {
    setFindPasswordMenu(true);
    setDisabled(false);
    findEmailValue && findEmailReset();
    resetValue();
  };

  const findEmailHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findEmailMuate({
      displayName: displayNameValue,
      phone: phoneValue.replace(/-/g, "")
    });
    if (!findEmailValue) resetValue();
  };

  const findPasswordHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findPasswordMuate({
      email: emailValue,
      phone: phoneValue.replace(/-/g, "")
    });
    if (!isFindPassword) resetValue();
  };

  // 전체 input이 유효하다면 버튼 활성화
  useEffect(() => {
    if (findPasswordMenu) {
      if (emailValid.valid && phoneValid.valid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (displayNameValid.valid && phoneValid.valid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [displayNameValid, emailValid, phoneValid]);

  const isLoading = findEmailIsPending || findPasswordIsPending;

  return {
    findPasswordMenu,
    findEmailActiveHandler,
    findPwActiveHandler,
    findPasswordHandler,
    findEmailHandler,
    findEmailValue,
    emailValue,
    onChangeEmail,
    emailValid,
    displayNameValue,
    onChangeDisplayName,
    displayNameValid,
    phoneValue,
    onChangePhone,
    phoneValid,
    isFindPassword,
    disabled,
    isLoading
  };
};
