import React from "react";
import {
  ImgInput,
  ProfileImgInputLabel
} from "../../../ProfileUpdateModal.styles";

interface IProps {
  imgInputRef: React.RefObject<HTMLInputElement>;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function ProfileUpdateImgInput({
  imgInputRef,
  changeImgHandler
}: IProps) {
  return (
    <>
      <ProfileImgInputLabel htmlFor='input-img'>
        프로필 이미지
      </ProfileImgInputLabel>
      <ImgInput
        id={"input-img"}
        type='file'
        name='uploadImg'
        ref={imgInputRef}
        className='a11y-hidden'
        onChange={changeImgHandler}
        accept='image/jpg, image/jpeg, image/png, image/bmp'
        tabIndex={-1}
      />
    </>
  );
}
