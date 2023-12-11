import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect, useRef, useState } from "react";
import { useHistoryMobileBackBtn } from "../../../useHistoryMobileBackBtn";
import { useCloseProfileUpdateModal } from "./useCloseProfileUpdateModal";
import { useOpenProfileUpdateModal } from "./useOpenProfileUpdateModal";

export const useProfileUpdateModalController = () => {
  const [profileUpdateLoading, setProfileUpdateLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const introduceRef = useRef<HTMLTextAreaElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const imgResetBtnRef = useRef<HTMLButtonElement>(null);
  const ProfileImgButtonWrapperRef = useRef<HTMLDivElement>(null);
  const updateBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const isOpenUpdateProfileModal = useSelector(
    (state: RootState) => state.user.isOpenUpdateProfileModal
  );

  const activeProfileUpdateLoading = () => {
    setProfileUpdateLoading(true);
  };

  const inactiveProfileUpdateLoading = () => {
    setProfileUpdateLoading(false);
  };

  const { openProfileUpdateModalHandler } = useOpenProfileUpdateModal();

  const {
    closeProfileUpdateModalHandler,
    closeProfileUpdateModalAndAnimationHandler,
    closeProfileUpdateModalMobileBackBtn
  } = useCloseProfileUpdateModal();

  useHistoryMobileBackBtn({
    handlePopStateCb: () => closeProfileUpdateModalMobileBackBtn(modalRef)
  });

  useEffect(() => {
    return () => {
      if (isOpenUpdateProfileModal) {
        closeProfileUpdateModalHandler();
      }
    };
  }, []);

  return {
    profileUpdateLoading,
    activeProfileUpdateLoading,
    inactiveProfileUpdateLoading,
    modalRef,
    imgInputRef,
    imgResetBtnRef,
    introduceRef,
    updateBtnRef,
    closeBtnRef,
    ProfileImgButtonWrapperRef,
    openProfileUpdateModalHandler,
    closeProfileUpdateModalHandler,
    closeProfileUpdateModalAndAnimationHandler: () =>
      closeProfileUpdateModalAndAnimationHandler(modalRef),
  };
};
