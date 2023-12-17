import React from "react";
import { IMyProfileData } from "../../../../api/apiType";
import { useProfileUpdateFetchData } from "../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateFetchData";
import { MyForm } from "../../../../component/commons/UI/myForm/MyForm";
import FormContent from "./FormContent/FormContent";

interface IProps {
  myProfile: IMyProfileData;
  imgInputRef: React.RefObject<HTMLInputElement>;
  introduceRef: React.RefObject<HTMLTextAreaElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  updateBtnRef: React.RefObject<HTMLButtonElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
}

export default function ProfileUpdateFormWrapper({
  myProfile,
  introduceRef,
  imgResetBtnRef,
  closeBtnRef,
  updateBtnRef,
  imgInputRef,
  ProfileImgButtonWrapperRef
}: IProps) {
  const { updateProfileHandler, updateUserProfileLoading } =
    useProfileUpdateFetchData();

  return (
    <MyForm
      onSubmit={updateProfileHandler}
      formOptions={{
        mode: "onChange",
        defaultValues: {
          img: myProfile.photoURL,
          displayName: myProfile.displayName,
          introduce: myProfile.introduce
        }
      }}
    >
      <FormContent
        myProfile={myProfile}
        introduceRef={introduceRef}
        imgResetBtnRef={imgResetBtnRef}
        closeBtnRef={closeBtnRef}
        updateBtnRef={updateBtnRef}
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        updateUserProfileLoading={updateUserProfileLoading}
      />
    </MyForm>
  );
}
