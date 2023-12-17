import React from "react";
import { FormContentWrapper } from "../../ProfileUpdateModal.styles";
import { ProfileUpdateImg } from "./profileUpdateImg/profileUpdateImg";
import DisplayNameField from "./displayNameField/DisplayNameField";
import IntroduceField from "./IntroduceField/IntroduceField";
import ProfileUpdateBtn from "./profileUpdateBtn/ProfileUpdateBtn";
import { IMyProfileData } from "../../../../../api/apiType";
import { useProfileUpdateCheckDuplication } from "../../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateCheckDuplication";

interface IProps {
  myProfile: IMyProfileData;
  imgInputRef: React.RefObject<HTMLInputElement>;
  introduceRef: React.RefObject<HTMLTextAreaElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  updateBtnRef: React.RefObject<HTMLButtonElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  updateUserProfileLoading: boolean;
}

export default function FormContent({
  myProfile,
  introduceRef,
  imgResetBtnRef,
  closeBtnRef,
  updateBtnRef,
  imgInputRef,
  ProfileImgButtonWrapperRef,
  updateUserProfileLoading
}: IProps) {
  const { checkDuplication, resetCheckDuplication, checkDuplicationHandler } =
    useProfileUpdateCheckDuplication({ myProfile });

  return (
    <FormContentWrapper>
      <ProfileUpdateImg
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        closeBtnRef={closeBtnRef}
        imgResetBtnRef={imgResetBtnRef}
        myProfile={myProfile}
      />

      <DisplayNameField
        resetCheckDuplication={resetCheckDuplication}
        checkDuplicationHandler={checkDuplicationHandler}
      />

      <IntroduceField introduceRef={introduceRef} />

      <ProfileUpdateBtn
        updateUserProfileLoading={updateUserProfileLoading}
        updateBtnRef={updateBtnRef}
        checkDuplication={checkDuplication}
      />
    </FormContentWrapper>
  );
}
