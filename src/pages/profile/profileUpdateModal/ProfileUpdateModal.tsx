import React from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { IMyProfileData, IProfileUpdateData } from "../../../api/apiType";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useProfileUpdateModal } from "../../../hook/logic/profile/profileUpdate/useProfileUpdateModal";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import {
  CloseBtn,
  ModalTitle,
  ModalTitleBar,
  ProfileEditModalWrapper
} from "./ProfileUpdateModal.styles";
import ProfileUpdateForm from "./ProfileUpdateForm";
import { PortalModal } from "../../../component/commons/UI/PortalModal";

interface IProps {
  updateProfileMutate: UseMutateFunction<
    | {
        uid: string;
        email: string | null;
        displayName: any;
        introduce: any;
        photoURL: any;
      }
    | undefined,
    Error,
    IProfileUpdateData,
    unknown
  >;
  closeProfileUpdateModalHandler: () => void;
  myProfile: IMyProfileData;
}

interface IModalProps {
  imgInputRef: React.RefObject<HTMLInputElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  modalRef: React.RefObject<HTMLDivElement>;
  editBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  resetBtnRef: React.RefObject<HTMLButtonElement>;
  setUploadImg: React.Dispatch<React.SetStateAction<string | File>>;
  previewImg: string;
  isImgLoading: boolean;
  setPreviewImg: React.Dispatch<React.SetStateAction<string>>;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  imgResetHandler: () => void;
  displayNameValue: string;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  onChangeDisplayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  introduceValue: string;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  closeModalAndAnimationHandler: () => void;
  updateProfileHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  myProfile: IMyProfileData;
  isWebpSupported: boolean | null;
}

const ModalPortal = ({
  imgInputRef,
  ProfileImgButtonWrapperRef,
  textareaRef,
  modalRef,
  editBtnRef,
  closeBtnRef,
  resetBtnRef,
  setUploadImg,
  previewImg,
  setPreviewImg,
  isImgLoading,
  changeImgHandler,
  imgResetHandler,
  displayNameValue,
  displayNameValid,
  onChangeDisplayName,
  introduceValue,
  onChangeIntroduce,
  updateProfileHandler,
  closeModalAndAnimationHandler,
  preventKeydownEnter,
  myProfile,
  isWebpSupported
}: IModalProps) => {
  return (
    <ProfileEditModalWrapper ref={modalRef}>
      <ModalTitleBar>
        <ModalTitle>프로필 수정</ModalTitle>
      </ModalTitleBar>
      <ProfileUpdateForm
        myProfile={myProfile}
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        textareaRef={textareaRef}
        resetBtnRef={resetBtnRef}
        closeBtnRef={closeBtnRef}
        editBtnRef={editBtnRef}
        setUploadImg={setUploadImg}
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
        isImgLoading={isImgLoading}
        changeImgHandler={changeImgHandler}
        imgResetHandler={imgResetHandler}
        displayNameValue={displayNameValue}
        displayNameValid={displayNameValid}
        updateProfileHandler={updateProfileHandler}
        onChangeDisplayName={onChangeDisplayName}
        introduceValue={introduceValue}
        onChangeIntroduce={onChangeIntroduce}
        preventKeydownEnter={preventKeydownEnter}
      />
      <CloseBtn
        onClick={closeModalAndAnimationHandler}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          optModalTabFocus(
            e,
            editBtnRef.current?.disabled
              ? textareaRef.current
              : editBtnRef.current,
            resetBtnRef.current
          );
        }}
        ref={closeBtnRef}
        $isWebpSupported={isWebpSupported}
      />
    </ProfileEditModalWrapper>
  );
};

export default function ProfileUpdateModal({
  updateProfileMutate,
  myProfile
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    imgInputRef,
    ProfileImgButtonWrapperRef,
    textareaRef,
    modalRef,
    editBtnRef,
    closeBtnRef,
    resetBtnRef,
    displayNameValue,
    displayNameValid,
    setUploadImg,
    previewImg,
    setPreviewImg,
    isImgLoading,
    changeImgHandler,
    imgResetHandler,
    onChangeDisplayName,
    introduceValue,
    onChangeIntroduce,
    updateProfileHandler,
    closeModalAndAnimationHandler,
    preventKeydownEnter
  } = useProfileUpdateModal({
    updateProfileMutate,
    myProfile
  });

  return (
    <PortalModal
      closeModalHandler={closeModalAndAnimationHandler}
      targetId='modal-root'
    >
      <ModalPortal
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        textareaRef={textareaRef}
        modalRef={modalRef}
        editBtnRef={editBtnRef}
        closeBtnRef={closeBtnRef}
        resetBtnRef={resetBtnRef}
        setUploadImg={setUploadImg}
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
        isImgLoading={isImgLoading}
        changeImgHandler={changeImgHandler}
        imgResetHandler={imgResetHandler}
        displayNameValue={displayNameValue}
        displayNameValid={displayNameValid}
        onChangeDisplayName={onChangeDisplayName}
        introduceValue={introduceValue}
        onChangeIntroduce={onChangeIntroduce}
        updateProfileHandler={updateProfileHandler}
        closeModalAndAnimationHandler={closeModalAndAnimationHandler}
        myProfile={myProfile}
        preventKeydownEnter={preventKeydownEnter}
        isWebpSupported={isWebpSupported}
      />
    </PortalModal>
  );
}
