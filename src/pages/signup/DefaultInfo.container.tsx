import React, { useEffect, useState } from "react";
import { useValidationInput } from "../../hook/useValidationInput";
import DefaultInfoUI from "./DefaultInfo.presenter";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../hook/query/auth/useSignupMutation";

export default function DefaultInfo() {
  const navigate = useNavigate();
  const [defaultInfo, setDefaultInfo] = useState(false);
  const [profile, setProfile] = useState(false);
  const [percentage, setPercentage] = useState("0%");
  const [next, setNext] = useState(false);

  const { mutate, isPending } = useSignupMutation();

  // 이메일 유효성 input
  const [emailValue, emailValid, onChangeEmail] = useValidationInput(
    "",
    "email",
    true
  );
  const [passwordValue, passowrdValid, , setPasswordValue, setPasswordVaild] =
    useValidationInput("", "password", true);
  const passwordReg = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/;
  // 비밀번호 유효성 input
  const [
    passwordChkValue,
    passwordChkValid,
    ,
    setPasswordChkValue,
    setPasswordChkValid
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
        valid: false
      });
    } else {
      setPasswordChkValid({ errorMsg: "", valid: true });
    }
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value.trim());
    if (passwordChkValue && passwordChkValue !== e.target.value.trim()) {
      return setPasswordVaild({
        errorMsg: "비밀번호가 일치하지 않습니다.",
        valid: false
      });
    }
    if (passwordReg.test(e.target.value.trim())) {
      return setPasswordVaild({ errorMsg: "", valid: true });
    } else {
      setPasswordVaild({ errorMsg: "8-16자 특수문자, 숫자, 영문을 포함해야합니다.", valid: false });
    }
  };

  const onClickCancel = () => {
    navigate("/");
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

  /**
   * 모바일 화면 100vh 높이 설정시 화면 스크롤 문제 해결
   */
  function setScreenSize() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  useEffect(() => {
    setScreenSize();
  }, []);

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
      onChangePassword={onChangePassword}
      passowrdValid={passowrdValid}
      passwordChkValue={passwordChkValue}
      onChangePasswordChk={onChangePasswordChk}
      passwordChkValid={passwordChkValid}
      phoneValue={phoneValue}
      onChangePhone={onChangePhone}
      phoneValid={phoneValid}
      disabled={disabled}
      setProfile={setProfile}
      setPercentage={setPercentage}
      setNext={setNext}
      signupLoading={isPending}
      onClickCancel={onClickCancel}
      mutate={mutate}
    />
  );
}
