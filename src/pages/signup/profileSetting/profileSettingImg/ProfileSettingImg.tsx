import React from "react";
import ProfileSettingImgButton from "./profileSettingImgButton/ProfileSettingImgButton";
import ProfileSettingImgDesc from "./profileSettingImgDesc/ProfileSettingImgDesc";
import { ProfileImgInput, ProfileImgLabel, ProfileImgWrapper } from '../../../profile/profileUpdateModal/ProfileUpdateModal.styles';

interface IProps {
  isImgLoading: boolean;
  imgResetHandler: () => void;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  imgInputRef: React.RefObject<HTMLInputElement>;
  previewImg: string;
}

export default function ProfileSettingImg({
  isImgLoading,
  imgResetHandler,
  changeImgHandler,
  imgInputRef,
  previewImg
}: IProps) {
  return (
    <ProfileImgWrapper>
      <ProfileImgLabel className='a11y-hidden'>이미지</ProfileImgLabel>
      <ProfileImgInput
        type='file'
        ref={imgInputRef}
        className='a11y-hidden'
        onChange={changeImgHandler}
        accept='image/jpg,image/jpeg, image/png, image/bmp, image/tif, image/heic'
        tabIndex={-1}
      />
      <ProfileSettingImgButton
        isImgLoading={isImgLoading}
        imgResetHandler={imgResetHandler}
        imgInputRef={imgInputRef}
        previewImg={previewImg}
      />
      <ProfileSettingImgDesc />
    </ProfileImgWrapper>
  );
}
