import React from "react";
import { ProfileUpdateBtnsWrapper } from "../../../../ProfileUpdateModal.styles";
import ProfileUpdateImgResetBtn from "./profileUpdateImgResetBtn/ProfileUpdateImgResetBtn";
import ProfileUpdateImgBtn from "./profileIUpdateImgBtn/ProfileUpdateImgBtn";
import ScrollLoading from "../../../../../../../component/commons/loading/ScrollLoading";
import { useFocusing } from "../../../../../../../hook/useFocusing";

interface IProps {
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  isImgLoading: boolean;
  imgResetHandler: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  previewImg: string;
  imgInputRef: React.RefObject<HTMLInputElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function ProfileUpdateImgBtns({
  ProfileImgButtonWrapperRef,
  isImgLoading,
  imgResetHandler,
  closeBtnRef,
  previewImg,
  imgInputRef,
  imgResetBtnRef
}: IProps) {
  // tab focus 최적화를 위한 초기 focus 설정
  useFocusing(ProfileImgButtonWrapperRef);

  if (isImgLoading) {
    return <ScrollLoading />;
  }

  return (
    <ProfileUpdateBtnsWrapper tabIndex={0} ref={ProfileImgButtonWrapperRef}>
      <ProfileUpdateImgResetBtn
        imgResetHandler={imgResetHandler}
        closeBtnRef={closeBtnRef}
      />
      <ProfileUpdateImgBtn
        previewImg={previewImg}
        imgInputRef={imgInputRef}
        imgResetBtnRef={imgResetBtnRef}
      />
    </ProfileUpdateBtnsWrapper>
  );
}
