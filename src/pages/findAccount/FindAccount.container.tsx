import React, { useEffect, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import FindAccountUI from "./FindAccount.presenter";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChangePassowrd,
  fetchFindEmail,
  userSlice
} from "../../slice/userSlice";
import { AppDispatch, RootState } from "../../store/store";

export default function FindAccount() {
  const dispatch = useDispatch<AppDispatch>();
  const findEmailValue = useSelector(
    (state: RootState) => state.user.findEmailValue
  );
  const findPasswordValue = useSelector(
    (state: RootState) => state.user.findPasswordValue
  );
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
    dispatch(userSlice.actions.resetFindAccountValue());
    resetValue();
  };

  const onClickFindPwMenu = () => {
    setFindPasswordMenu(true);
    setDisabled(false);
    dispatch(userSlice.actions.resetFindAccountValue());
    resetValue();
  };

  const onClickFindEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      fetchFindEmail({
        displayNameValue,
        phoneValue: phoneValue.replace(/-/g, "")
      })
    );
    if (!findEmailValue.email) resetValue();
  };

  const onClickFindPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(
      fetchChangePassowrd({
        emailValue,
        phoneValue: phoneValue.replace(/-/g, "")
      })
    );
    if (!findPasswordValue) resetValue();
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

  useEffect(() => {
    dispatch(userSlice.actions.resetFindAccountValue());
  }, []);

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
      findPasswordValue={findPasswordValue}
      disabled={disabled}
    />
  );
}
