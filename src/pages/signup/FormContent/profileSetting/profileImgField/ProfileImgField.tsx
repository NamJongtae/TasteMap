import React from "react";
import { useProfileSettingImg } from "../../../../../hook/logic/signup/useProfileSettingImg";
import {
  ProfileImgInput,
  ProfileImgLabel,
  ProfileImgWrapper
} from "../../../signup.styles";
import ProfileSettingImgDesc from "./profileSettingImgDesc/ProfileSettingImgDesc";
import ProfileSettingImgButton from "./profileSettingImgButton/ProfileSettingImgButton";
import { useFormContext } from "react-hook-form";

export default function ProfileImgField() {
  const { register } = useFormContext();

  const {
    imgInputRef,
    previewImg,
    isImgLoading,
    changeImgHandler,
    resetImgHandler
  } = useProfileSettingImg();

  return (
    <ProfileImgWrapper>
      <ProfileImgLabel className='a11y-hidden'>프로필 이미지</ProfileImgLabel>
      <ProfileImgInput
        type='file'
        id='img'
        className='a11y-hidden'
        accept='image/jpg,image/jpeg, image/png, image/bmp, image/tif, image/heic'
        tabIndex={-1}
        {...(register("img"),
        {
          onChange: changeImgHandler,
          ref: imgInputRef
        })}
      />
      <ProfileSettingImgButton
        previewImg={previewImg}
        isImgLoading={isImgLoading}
        resetImgHandler={resetImgHandler}
        imgInputRef={imgInputRef}
      />

      <ProfileSettingImgDesc />
    </ProfileImgWrapper>
  );
}
