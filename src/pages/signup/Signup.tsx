import React from "react";
import ProgressiveBar from "./ProgressiveBar";
import UserInfoSetting from "./UserInfoSetting";
import ProfileSetting from "./ProfileSetting";
import Loading from "../../component/commons/loading/Loading";
import { useUserInfoSettingEmailInput } from "../../hook/logic/signup/useUserInfoSettingEmailInput";
import { useUserInfoSettingPwInput } from "../../hook/logic/signup/useUserInfoSettingPwInput";
import { useUserInfoSettingPwChkInput } from "../../hook/logic/signup/useUserInfoSettingPwChkInput";
import { useUserInfoSettingPhoneInput } from "../../hook/logic/signup/useUserInfoSettingPhoneInput";
import { useSignupStepController } from "../../hook/logic/signup/useSignupStepController";
import { useProfileSettingDisplayNameInput } from "../../hook/logic/signup/useProfileSettingDisplayNameInput";
import { useProfileSettingImg } from "../../hook/logic/signup/useProfileSettingImg";
import { useSignupDataFetch } from "../../hook/logic/signup/useSignupDataFetch";
import { useProfileSettingIntroduceInput } from "../../hook/logic/signup/useProfileSettingIntroduceInput";
import { useSingupSetScreenSize } from "../../hook/logic/signup/useSignupSetScreenSize";
import styled from "styled-components";

const Wrapper = styled.main`
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 450px;
  padding: 0px 40px;
  @media screen and (max-width: 431px) {
    padding: 0px 30px;
  }
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 25px;
  margin-bottom: 20px;
  font-weight: 500;
`;

export default function Signup() {
  const { emailValue, emailValid, onChangeEmail } =
    useUserInfoSettingEmailInput();

  const {
    passwordValue,
    passwordValid,
    onChangePassword,
    checkPwMatchValidation
  } = useUserInfoSettingPwInput();

  const {
    passwordChkValue,
    passwordChkValid,
    onChangePasswordChk,
    checkPwChkMatchValidation
  } = useUserInfoSettingPwChkInput();

  const { phoneValue, phoneValid, onChangePhone } =
    useUserInfoSettingPhoneInput();

  const { displayNameValue, displayNameValid, onChangeDislayName } =
    useProfileSettingDisplayNameInput();

  const {
    imgInputRef,
    previewImg,
    uploadImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler
  } = useProfileSettingImg();

  const { introduceValue, onChangeIntroduce, preventKeydownEnter } =
    useProfileSettingIntroduceInput();

  const { signupHandler, signupLoading } = useSignupDataFetch({
    displayNameValue,
    uploadImg,
    emailValue,
    passwordValue,
    phoneValue,
    introduceValue
  });

  const {
    next,
    percentage,
    setPercentage,
    nextStepHandler,
    prevStepHandler,
    cancelHandler,
    completedUserInfoSetting,
    completedProfileSetting
  } = useSignupStepController({
    emailValid: emailValid.valid,
    passwordValid: passwordValid.valid,
    passwordChkValid: passwordChkValid.valid,
    phoneValid: phoneValid.valid,
    displayNameValid: displayNameValid.valid
  });

  if (signupLoading) {
    return <Loading />;
  }

  // next(기본 정보 입력 후 다음 버튼을 누른 경우)
  const SignupForm = !next ? (
    <UserInfoSetting
      emailValue={emailValue}
      onChangeEmail={onChangeEmail}
      emailValid={emailValid}
      passwordValue={passwordValue}
      onChangePassword={onChangePassword}
      checkPwMatchValidation={checkPwMatchValidation}
      passwordValid={passwordValid}
      passwordChkValue={passwordChkValue}
      onChangePasswordChk={onChangePasswordChk}
      checkPwChkMatchValidation={checkPwChkMatchValidation}
      passwordChkValid={passwordChkValid}
      phoneValue={phoneValue}
      onChangePhone={onChangePhone}
      phoneValid={phoneValid}
      nextDisabled={
        !(
          emailValid.valid &&
          passwordChkValid.valid &&
          passwordValid.valid &&
          phoneValid.valid
        )
      }
      nextStepHandler={nextStepHandler}
      cancelHandler={cancelHandler}
    />
  ) : (
    <ProfileSetting
      setPercentage={setPercentage}
      prevStepHandler={prevStepHandler}
      signupHandler={signupHandler}
      imgInputRef={imgInputRef}
      changeImgHandler={changeImgHandler}
      previewImg={previewImg}
      imgResetHandler={imgResetHandler}
      displayNameValue={displayNameValue}
      onChangeDislayName={onChangeDislayName}
      introduce={introduceValue}
      onChangeIntroduce={onChangeIntroduce}
      displayNameValid={displayNameValid}
      signupDisabled={
        !(
          emailValid.valid &&
          passwordChkValid.valid &&
          passwordValid.valid &&
          phoneValid.valid &&
          displayNameValid.valid
        )
      }
      isImgLoading={isImgLoading}
      preventKeydownEnter={preventKeydownEnter}
    />
  );

  // 모바일 화면 100vh 높이 설정시 화면 스크롤 문제 해결
  useSingupSetScreenSize();

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProgressiveBar
        percentage={percentage}
        completedUserInfoSetting={completedUserInfoSetting}
        completedProfileSetting={completedProfileSetting}
      />
      <FormWrapper>{SignupForm}</FormWrapper>
    </Wrapper>
  );
}
