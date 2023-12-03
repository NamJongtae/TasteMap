import { useCallback, useEffect, useRef } from "react";
import { isMobile } from "react-device-detect";
import { IMyProfileData, IProfileUpdateData } from "../../../../api/apiType";
import { UseMutateFunction } from "@tanstack/react-query";
import { useProfileUpdateForm } from "./useProfileUpdateForm";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { userSlice } from "../../../../slice/userSlice";

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
  myProfile: IMyProfileData;
}

export const useProfileUpdateModal = ({
  updateProfileMutate,
  myProfile
}: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const resetBtnRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const {
    imgInputRef,
    ProfileImgButtonWrapperRef,
    uploadImg,
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
    preventKeydownEnter
  } = useProfileUpdateForm({
    updateProfileMutate,
    myProfile,
    textareaRef,
    resetBtnRef
  });

  const closeProfileUpdateModalHandler = useCallback(() => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
  }, []);

  /**
   * 프로필 수정 모달 닫기 및 닫기 애니메이션 적용
   */
  const closeModalAndAnimationHandler = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.animation = "ProfileEditModalmoveUpmoveDown 1s";
    }
    setTimeout(() => {
      if (isMobile) {
        history.back();
      }
      closeProfileUpdateModalHandler();
    }, 700);
  }, []);

  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handlePopState = () => {
        if (modalRef.current) {
          modalRef.current.style.animation =
            "ProfileEditModalmoveUpmoveDown 1s";
        }
        setTimeout(() => {
          dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
        }, 700);
      };

      window.onpopstate = handlePopState;

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 삭제
        window.onpopstate = null;
      };
    }
  }, []);

  return {
    textareaRef,
    modalRef,
    editBtnRef,
    closeBtnRef,
    resetBtnRef,
    imgInputRef,
    ProfileImgButtonWrapperRef,
    uploadImg,
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
    preventKeydownEnter
  };
};
