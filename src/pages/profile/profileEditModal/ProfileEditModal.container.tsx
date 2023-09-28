import React, { useEffect, useRef, useState } from "react";
import { getCompressionImg } from "../../../library/imageCompression";
import { imgValidation } from "../../../library/imageValidation";
import { useValidationInput } from "../../../hook/useValidationInput";

import { userSlice } from "../../../slice/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  profileSlice,
  thunkFetchEditProfile,
  thunkFetchMyProfile,
  thunkFetchProfileFirstPageData
} from "../../../slice/profileSlice";
import ProfileEditModalUI from "./ProfileEditModal.presenter";

export default function ProfileEditModal() {
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const [introduceValue, setIntroduceValue] = useState(myProfileData.introduce);
  const [previewImg, setPreviewImg] = useState(myProfileData.photoURL);
  const [uploadImg, setUploadImg] = useState<File | string>("");
  const [
    displayNameValue,
    displayNameValid,
    onChangeDislayName,
    ,
    setDisplayNameValid
  ] = useValidationInput(myProfileData.displayName || "", "displayName", true);

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
  const resizeTextAreaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight - 30 + "px";
    }
  };

  /**
   * 업로드 프로필 이미지 변경
   */
  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const isValid = imgValidation(file);
    if (!isValid) return;
    const { compressedFile, compressedPreview } = (await getCompressionImg(
      file,
      "profile"
    )) as {
      compressedFile: File;
      compressedPreview: string;
    };
    setPreviewImg(compressedPreview);
    setUploadImg(compressedFile);
  };

  /**
   * 프로필 수정
   */
  const onClickSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const IEditProfileData = {
      displayName: displayNameValue,
      file: uploadImg,
      introduce: introduceValue
    };
    await dispatch(thunkFetchEditProfile(IEditProfileData));
    if (userData.uid) {
      dispatch(thunkFetchMyProfile(userData.uid));
      dispatch(
        thunkFetchProfileFirstPageData({ uid: userData.uid, pagePerData: 10 })
      );
    }
    dispatch(userSlice.actions.refreshUser());
  };

  const onClickImgReset = () => {
    setPreviewImg(process.env.REACT_APP_DEFAULT_PROFILE_IMG);
    setUploadImg("defaultImg");
  };

  /**
   * 프로필 수정 모달 닫기
   */
  const onCLickClose = () => {
    if (modalRef.current) {
      modalRef.current.style.animation = "ProfileEditModalmoveUpmoveDown 1s";
    }
    setTimeout(() => {
      document.body.style.overflow = "auto";
      dispatch(profileSlice.actions.setIsOpenProfileEditModal(false));
    }, 700);
  };

  useEffect(() => {
    // 초기 textarea 높이 설정
    resizeTextAreaHeight();
    // displayName 초기 valid true 설정
    setDisplayNameValid({ errorMsg: "", valid: true });
    if (userData.uid) {
      // myProfileData 가져오기
      dispatch(thunkFetchMyProfile(userData.uid));
    }
  }, []);

  return (
    <ProfileEditModalUI
      onClickClose={onCLickClose}
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
      myProfileData={myProfileData}
    />
  );
}