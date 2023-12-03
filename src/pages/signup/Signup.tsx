import React from "react";
import ProgressiveBar from "./ProgressiveBar";
import { FormWrapper, Wrapper } from "./Signup.styles";
import { Title } from "./DefaultInfo.styles";
import UserInfoSetting from "./UserInfoSetting";
import ProfileSetting from "./ProfileSetting";
import Loading from "../../component/commons/loading/Loading";
import { useSignup } from "../../hook/logic/signup/useSignup";
import { useUserInfoSetting } from "../../hook/logic/signup/useUserInfoSetting";
import { useProfileSetting } from "../../hook/logic/signup/useProfileSetting";

export default function Signup() {
  const { percentage, setPercentage, signupMutate, signupLoading } =
    useSignup();

  // 유저 기본 정보 설정 로직 관리 customhook
  // percentage를 제어하기 위해 setPertage를 인자 값으로 넘김
  const {
    completedUserInfo,
    emailValue,
    onChangeEmail,
    emailValid,
    passwordValue,
    onChangePassword,
    passowrdValid,
    passwordChkValue,
    onChangePasswordChk,
    passwordChkValid,
    phoneValue,
    onChangePhone,
    phoneValid,
    nextDisabled,
    next,
    setNext,
    cancelHandler
  } = useUserInfoSetting(setPercentage);

  // 유저 프로필 설정 로직 관리 customhook
  // 모든 입력 값이 유효한지 판단하기 위해 value들을 인자값으로 넘김
  // 회원가입은 프로필 설정 이후 이루어지기 때문에 회원가입 api인 signupMutate를 인자 값으로 넘김
  // percentage를 제어하기 위해 setPertage를 인자값으로 넘김
  const {
    completedProfile,
    setCompletedProfile,
    signupHandler,
    imgInputRef,
    changeImgHandler,
    previewImg,
    imgResetHandler,
    displayNameValue,
    onChangeDislayName,
    introduce,
    onChangeIntroduce,
    displayNameValid,
    signupDisabled,
    isImgLoading
  } = useProfileSetting({
    emailValue,
    passwordValue,
    phoneValue,
    next,
    setPercentage,
    signupMutate
  });

  if (signupLoading) {
    return <Loading />;
  }

  // next(기본 정보 입력 후 다음 버튼을 누른 경우)
  const FormContent = !next ? (
    <UserInfoSetting
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
      nextDisabled={nextDisabled}
      setNext={setNext}
      cancelHandler={cancelHandler}
    />
  ) : (
    <ProfileSetting
      setCompletedProfile={setCompletedProfile}
      setPercentage={setPercentage}
      setNext={setNext}
      signupHandler={signupHandler}
      imgInputRef={imgInputRef}
      changeImgHandler={changeImgHandler}
      previewImg={previewImg}
      imgResetHandler={imgResetHandler}
      displayNameValue={displayNameValue}
      onChangeDislayName={onChangeDislayName}
      introduce={introduce}
      onChangeIntroduce={onChangeIntroduce}
      displayNameValid={displayNameValid}
      signupDisabled={signupDisabled}
      isImgLoading={isImgLoading}
    />
  );

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProgressiveBar
        completedUserInfo={completedUserInfo}
        percentage={percentage}
        profile={completedProfile}
      />
      <FormWrapper>{FormContent}</FormWrapper>
    </Wrapper>
  );
}
