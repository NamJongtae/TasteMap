import React from "react";
import { IMyProfileData } from "../../../api/apiType";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import {
  CloseBtn,
  ModalTitle,
  ModalTitleBar,
  ProfileUpdateModalWrapper
} from "./ProfileUpdateModal.styles";
import ProfileUpdateForm from "./profileUpdateForm/ProfileUpdateForm";
import { PortalModal } from "../../../component/commons/UI/portalModal/PortalModal";
import { useProfileUpdateModalController } from "../../../hook/logic/profile/profileUpdateModal/useProfileUpdateModalController";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IModalProps {
  myProfile: IMyProfileData;
  imgInputRef: React.RefObject<HTMLInputElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  introduceRef: React.RefObject<HTMLTextAreaElement>;
  modalRef: React.RefObject<HTMLDivElement>;
  updateBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
  closeProfileUpdateModalAndAnimationHandler: () => void;
  isWebpSupported: boolean | null;
}

const ModalPortal = ({
  myProfile,
  imgInputRef,
  ProfileImgButtonWrapperRef,
  introduceRef,
  modalRef,
  updateBtnRef,
  closeBtnRef,
  imgResetBtnRef,
  closeProfileUpdateModalAndAnimationHandler,
  isWebpSupported
}: IModalProps) => {
  return (
    <ProfileUpdateModalWrapper ref={modalRef}>
      <ModalTitleBar>
        <ModalTitle>프로필 수정</ModalTitle>
      </ModalTitleBar>

      <ProfileUpdateForm
        myProfile={myProfile}
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        introduceRef={introduceRef}
        imgResetBtnRef={imgResetBtnRef}
        closeBtnRef={closeBtnRef}
        updateBtnRef={updateBtnRef}
      />

      <CloseBtn
        onClick={closeProfileUpdateModalAndAnimationHandler}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          optModalTabFocus(
            e,
            updateBtnRef.current?.disabled
              ? introduceRef.current
              : updateBtnRef.current,
            imgResetBtnRef.current
          );
        }}
        ref={closeBtnRef}
        $isWebpSupported={isWebpSupported}
      />
    </ProfileUpdateModalWrapper>
  );
};

interface IProps {
  myProfile: IMyProfileData;
}

export default function ProfileUpdateModal({ myProfile }: IProps) {
  const isOpenProfileUpdateModal = useSelector(
    (state: RootState) => state.user.isOpenUpdateProfileModal
  );
  const { isWebpSupported } = useSupportedWebp();
  const {
    modalRef,
    imgInputRef,
    imgResetBtnRef,
    introduceRef,
    updateBtnRef,
    closeBtnRef,
    ProfileImgButtonWrapperRef,
    closeProfileUpdateModalAndAnimationHandler
  } = useProfileUpdateModalController();

  if (!isOpenProfileUpdateModal) {
    return null;
  }

  return (
    <PortalModal
      closeModalHandler={closeProfileUpdateModalAndAnimationHandler}
      targetId='modal-root'
    >
      <ModalPortal
        myProfile={myProfile}
        imgInputRef={imgInputRef}
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        introduceRef={introduceRef}
        modalRef={modalRef}
        updateBtnRef={updateBtnRef}
        closeBtnRef={closeBtnRef}
        imgResetBtnRef={imgResetBtnRef}
        closeProfileUpdateModalAndAnimationHandler={
          closeProfileUpdateModalAndAnimationHandler
        }
        isWebpSupported={isWebpSupported}
      />
    </PortalModal>
  );
}
