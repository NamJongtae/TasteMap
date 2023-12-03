import React from "react";
import { EditBtn, UpdateForm } from "./ProfileUpdateModal.styles";
import { ProfileUpdateImg } from "./profileUpdateImg";
import ProfileUpdateDisplayName from "./ProfileUpdateDisplayName";
import ProfileUpdateIntroduce from "./ProfileUpdateIntroduce";
import { IMyProfileData } from "../../../api/apiType";

interface IProps {
  updateProfileHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  myProfile: IMyProfileData;
  imgInputRef: React.RefObject<HTMLInputElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  isImgLoading: boolean;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  imgResetHandler: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  resetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  editBtnRef: React.RefObject<HTMLButtonElement>;
  previewImg: string;
  setPreviewImg: React.Dispatch<React.SetStateAction<string>>;
  setUploadImg: React.Dispatch<React.SetStateAction<string | File>>;
  displayNameValue: string;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  onChangeDisplayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  introduceValue: string;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function ProfileUpdateForm({
  myProfile,
  textareaRef,
  resetBtnRef,
  closeBtnRef,
  editBtnRef,
  imgInputRef,
  previewImg,
  ProfileImgButtonWrapperRef,
  isImgLoading,
  changeImgHandler,
  imgResetHandler,
  displayNameValue,
  displayNameValid,
  updateProfileHandler,
  onChangeDisplayName,
  introduceValue,
  onChangeIntroduce,
  preventKeydownEnter
}: IProps) {
  return (
    <UpdateForm onSubmit={updateProfileHandler}>
      <ProfileUpdateImg
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        closeBtnRef={closeBtnRef}
        resetBtnRef={resetBtnRef}
        previewImg={previewImg}
        isImgLoading={isImgLoading}
        changeImgHandler={changeImgHandler}
        imgResetHandler={imgResetHandler}
      />
      <ProfileUpdateDisplayName
        displayNameValue={displayNameValue}
        displayNameValid={displayNameValid}
        onChangeDisplayName={onChangeDisplayName}
      />
      <ProfileUpdateIntroduce
        textareaRef={textareaRef}
        introduceValue={introduceValue}
        onChangeIntroduce={onChangeIntroduce}
        preventKeydownEnter={preventKeydownEnter}
      />
      <EditBtn
        type='submit'
        disabled={
          !displayNameValid.valid ||
          (myProfile.displayName?.toLowerCase() ===
            displayNameValue.toLowerCase() &&
            myProfile.photoURL === previewImg &&
            myProfile.introduce === introduceValue)
        }
        ref={editBtnRef}
      >
        프로필 수정
      </EditBtn>
    </UpdateForm>
  );
}
