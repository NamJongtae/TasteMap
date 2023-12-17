import React from "react";
import {
  ProfileImgInput,
  ProfileImgInputLabel
} from "../../../../ProfileUpdateModal.styles";

interface IProps {
  imgInputRef: React.RefObject<HTMLInputElement>;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ProfileUpdateImgField({
  imgInputRef,
  changeImgHandler
}: IProps) {
  return (
    <>
      <ProfileImgInputLabel htmlFor='input-img'>
        프로필 이미지
      </ProfileImgInputLabel>
      <ProfileImgInput
        id={"img"}
        type={"file"}
        name={"img"}
        ref={imgInputRef}
        className='a11y-hidden'
        onChange={changeImgHandler}
        accept='image/jpg, image/jpeg, image/png, image/bmp'
        tabIndex={-1}
      />
    </>
  );
}
