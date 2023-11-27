import React, { useCallback, useEffect, useRef, useState } from "react";
import { getCompressionImg } from "../../../library/imageCompression";
import { imgValidation } from "../../../library/imageValidation";
import { useValidationInput } from "../../../hook/useValidationInput";
import ProfileEditModalUI from "./ProfileEditModal.presenter";
import { isMobile } from "react-device-detect";
import { UseMutateFunction } from "@tanstack/react-query";
import { IMyProfileData, IProfileUpdateData } from "../../../api/apiType";

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
  closeProfileEditModalHandler: () => void;
  myProfile: IMyProfileData;
}



export default function ProfileEditModal({
  updateProfileMutate,
  closeProfileEditModalHandler,
  myProfile
}: IProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const ProfileImgButtonWrapperRef = useRef<HTMLDivElement>(null);
  const resetBtnRef = useRef<HTMLButtonElement>(null);
  const editBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [introduceValue, setIntroduceValue] = useState(myProfile.introduce);
  const [previewImg, setPreviewImg] = useState(myProfile.photoURL);
  const [uploadImg, setUploadImg] = useState<File | string>("");
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [
    displayNameValue,
    displayNameValid,
    onChangeDislayName,
    ,
    setDisplayNameValid
  ] = useValidationInput(myProfile.displayName || "", "displayName", true);

  /**
   * IntroduceValue 변경
   */
  const onChangeIntroduce = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextAreaHeight();
    if (e.target.value === " " && e.target.value.length === 1) {
      return;
    }
    setIntroduceValue(e.target.value);
  };

  // 텍스트가 없는 경우 엔터키를 막음 빈 문자열 전송을 제한
  const preventKeydownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value && e.key === "Enter") {
      e.preventDefault();
      return;
    }
  };

  /**
   * textarea 자동 줄 바꿈
   */
  const resizeTextAreaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight - 30 + "px";
    }
  }, []);

  /**
   * 업로드 프로필 이미지 변경
   */
  const onChangeImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const file = e.target.files[0];
      const isValid = imgValidation(file);
      if (!isValid) return;
      if (isMobile) {
        setIsImgLoading(true);
      }
      const { compressedFile, compressedPreview } = (await getCompressionImg(
        file,
        "profile"
      )) as {
        compressedFile: File;
        compressedPreview: string;
      };
      setPreviewImg(compressedPreview);
      setUploadImg(compressedFile);
      if (isMobile) {
        setIsImgLoading(false);
      }
    },
    [isMobile]
  );

  /**
   * 프로필 수정
   */
  const onClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const IProfileUpdateData = {
      displayName: displayNameValue.toLowerCase(),
      file: uploadImg,
      introduce: introduceValue
    };
    updateProfileMutate(IProfileUpdateData);
  };

  const onClickImgReset = () => {
    setPreviewImg(process.env.REACT_APP_DEFAULT_PROFILE_IMG || "");
    setUploadImg("defaultImg");
  };

  /**
   * 프로필 수정 모달 닫기
   */
  const onClickClose = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.style.animation = "ProfileEditModalmoveUpmoveDown 1s";
    }
    setTimeout(() => {
      if (isMobile) {
        history.back();
      }
      closeProfileEditModalHandler();
    }, 700);
  }, []);

  useEffect(() => {
    // 초기 textarea 높이 설정
    resizeTextAreaHeight();
    // displayName 초기 valid true 설정
    setDisplayNameValid({ errorMsg: "", valid: true });
  }, []);

  useEffect(() => {
    if (ProfileImgButtonWrapperRef.current) {
      ProfileImgButtonWrapperRef.current.focus();
    }
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
          closeProfileEditModalHandler();
        }, 700);
      };

      window.onpopstate = handlePopState;

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 삭제
        window.onpopstate = null;
      };
    }
  }, []);

  return (
    <ProfileEditModalUI
      onClickClose={onClickClose}
      modalRef={modalRef}
      onClickSubmit={onClickSubmit}
      imgInputRef={imgInputRef}
      onChangeImg={onChangeImg}
      previewImg={previewImg}
      onClickImgReset={onClickImgReset}
      displayNameValue={displayNameValue}
      onChangeDisplayName={onChangeDislayName}
      displayNameValid={displayNameValid}
      introduceValue={introduceValue}
      onChangeIntroduce={onChangeIntroduce}
      preventKeydownEnter={preventKeydownEnter}
      textareaRef={textareaRef}
      myProfile={myProfile}
      ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
      resetBtnRef={resetBtnRef}
      editBtnRef={editBtnRef}
      closeBtnRef={closeBtnRef}
      isImgLoading={isImgLoading}
    />
  );
}
