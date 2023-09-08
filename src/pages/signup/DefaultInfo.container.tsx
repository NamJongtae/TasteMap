import React, { useEffect, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import DefaultInfoUI from './DefaultInfo.presenter';
import { useSelector } from "react-redux";
import { RootState } from '../../store/store';

export default function DefaultInfo() {
  const isLoading = useSelector((state: RootState) => state.signup.isLoading);
  const [defaultInfo, setDefaultInfo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [percentage, setPercentage] = useState("0%");
  const [next, setNext] = useState(false);

  // 이메일 유효성 input
  const [emailValue, emailValid, onChangeEmail] = useValidationInput(
    "",
    "email",
    true
  );
  const [passwordValue, passowrdValid, onChangePassowrd] = useValidationInput(
    "",
    "password",
    true
  );

  // 비밀번호 유효성 input
  const [
    passowrdChkValue,
    passwordChkValid,
    ,
    setPasswordChkValue,
    setPasswordChkValid,
  ] = useValidationInput("", "password", true);

  // 휴대폰 유효성 input
  const [phoneValue, phoneValid, onChangePhone] = useValidationInput(
    "",
    "phone",
    true
  );

  // 회원가입 버튼 활성화 상태 관리
  const [disabled, setDisabled] = useState(true);

  // 비밀번호 확인 onChange 별도 생성 => useValidInput에서 처리하지 못하기 때문
  const onChangePasswordChk = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordChkValue(e.target.value.trim());
    if (passwordValue !== e.target.value) {
      setPasswordChkValid({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false,
      });
    } else {
      setPasswordChkValid({ errorMsg: "", valid: true });
    }
  };

  // 전체 input이 유효하다면 버튼 활성화
  useEffect(() => {
    if (
      emailValid.valid &&
      passowrdValid.valid &&
      passwordChkValid.valid &&
      phoneValid.valid
    ) {
      setDisabled(false);
      setDefaultInfo(true);
      setPercentage("50%");
    } else {
      setDisabled(true);
      setDefaultInfo(false);
      setPercentage("0");
    }
  }, [emailValid, passowrdValid, passwordChkValid, phoneValid]);

  return (
    <DefaultInfoUI
      defaultInfo={defaultInfo}
      percentage={percentage}
      profile={profile}
      next={next}
      emailValue={emailValue}
      onChangeEmail={onChangeEmail}
      emailValid={emailValid}
      passwordValue={passwordValue}
      onChangePassowrd={onChangePassowrd}
      passowrdValid={passowrdValid}
      passowrdChkValue={passowrdChkValue}
      onChangePasswordChk={onChangePasswordChk}
      passwordChkValid={passwordChkValid}
      phoneValue={phoneValue}
      onChangePhone={onChangePhone}
      phoneValid={phoneValid}
      disabled={disabled}
      setProfile={setProfile}
      setPercentage={setPercentage}
      setNext={setNext}
      isLoading={isLoading}
    />
  );
}
