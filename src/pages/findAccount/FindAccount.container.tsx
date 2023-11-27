import React, { useEffect, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import FindAccountUI from "./FindAccount.presenter";
import { useFindAccountMutation } from "../../hook/query/auth/useFindEmailMutation";
import { useFindPasswordMuataion } from "../../hook/query/auth/useFindPasswordMutation";

export default function FindAccount() {
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

  const onClickFindEmailMenu = () => {
    setFindPasswordMenu(false);
    setDisabled(false);
    isFindPassword && findPasswordReset();
    resetValue();
  };

  const onClickFindPwMenu = () => {
    setFindPasswordMenu(true);
    setDisabled(false);
    findEmailValue && findEmailReset();
    resetValue();
  };

  const onClickFindEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    findEmailMuate({
      displayName: displayNameValue,
      phone: phoneValue.replace(/-/g, "")
    });
    if (!findEmailValue) resetValue();
  };

  const onClickFindPassword = async (e: React.FormEvent<HTMLFormElement>) => {
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

  return (
    <FindAccountUI
      findPasswordMenu={findPasswordMenu}
      onClickFindEmailMenu={onClickFindEmailMenu}
      onClickFindPwMenu={onClickFindPwMenu}
      onClickFindPassword={onClickFindPassword}
      onClickFindEmail={onClickFindEmail}
      findEmailValue={findEmailValue}
      emailValue={emailValue}
      onChangeEmail={onChangeEmail}
      emailValid={emailValid}
      displayNameValue={displayNameValue}
      onChangeDisplayName={onChangeDisplayName}
      displayNameValid={displayNameValid}
      phoneValue={phoneValue}
      onChangePhone={onChangePhone}
      phoneValid={phoneValid}
      findPasswordValue={isFindPassword}
      disabled={disabled}
      isLoading={findEmailIsPending || findPasswordIsPending}
    />
  );
}
