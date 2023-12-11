import React from "react";
import { UpdateForm } from "../ProfileUpdateModal.styles";
import { ProfileUpdateImg } from "./profileUpdateImg/profileUpdateImg";
import { IMyProfileData } from "../../../../api/apiType";
import ProfileUpdateBtn from "./profileUpdateBtn/ProfileUpdateBtn";
import { useProfileUpdateBtnController } from "../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateBtnController";
import ProfileUpdateDisplayName from "./profileUpdateDisplayName/ProfileUpdateDisplayName";
import ProfileUpdateIntroduce from "./profileUpdateIntroduce/ProfileUpdateIntroduce";
import { useProfileUpdateFetchData } from "../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateFetchData";

interface IProps {
  myProfile: IMyProfileData;
  imgInputRef: React.RefObject<HTMLInputElement>;
  introduceRef: React.RefObject<HTMLTextAreaElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  updateBtnRef: React.RefObject<HTMLButtonElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
}

export default function ProfileUpdateForm({
  myProfile,
  introduceRef,
  imgResetBtnRef,
  closeBtnRef,
  updateBtnRef,
  imgInputRef,
  ProfileImgButtonWrapperRef
}: IProps) {
  const {
    controllDisplayNameHandler,
    controllDisplayNameValidHandler,
    controllPreviewImgHandler,
    controllIntroduceHandler,
    isDisabledUpdateBtn
  } = useProfileUpdateBtnController({ myProfile });

  const { updateProfileHandler, updateUserProfileLoading } =
    useProfileUpdateFetchData();

  return (
    <UpdateForm onSubmit={updateProfileHandler}>
      <ProfileUpdateImg
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        closeBtnRef={closeBtnRef}
        imgResetBtnRef={imgResetBtnRef}
        myProfile={myProfile}
        controllPreviewImgHandler={controllPreviewImgHandler}
      />

      <ProfileUpdateDisplayName
        myProfile={myProfile}
        controllDisplayNameHandler={controllDisplayNameHandler}
        controllDisplayNameValidHandler={controllDisplayNameValidHandler}
      />

      <ProfileUpdateIntroduce
        controllIntroduceHandler={controllIntroduceHandler}
        introduceRef={introduceRef}
        myProfile={myProfile}
      />

      <ProfileUpdateBtn
        updateUserProfileLoading={updateUserProfileLoading}
        isDisabledUpdateBtn={isDisabledUpdateBtn || updateUserProfileLoading}
        updateBtnRef={updateBtnRef}
      />
    </UpdateForm>
  );
}
