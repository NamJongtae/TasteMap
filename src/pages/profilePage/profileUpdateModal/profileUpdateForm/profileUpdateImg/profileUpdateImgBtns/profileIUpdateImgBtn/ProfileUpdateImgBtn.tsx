import React from "react";
import { ImgButton, ProfileImg } from "../../../../ProfileUpdateModal.styles";
import { resolveWebp } from "../../../../../../../library/resolveWebp";
import { RootState } from "../../../../../../../store/store";
import { useSelector } from "react-redux";

interface IProps {
  previewImg: string;
  imgInputRef: React.RefObject<HTMLInputElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function ProfileUpdateImgBtn({
  previewImg,
  imgInputRef,
  imgResetBtnRef
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <ImgButton
      type='button'
      onClick={() => imgInputRef.current?.click()}
      ref={imgResetBtnRef}
      $isWebpSupported={isWebpSupported}
    >
      <ProfileImg
        src={previewImg}
        alt='유저 프로필 이미지'
        onError={(e: any) =>
          (e.target.value = resolveWebp(
            "/assets/webp/icon-defaultProfile.svg",
            "svg"
          ))
        }
      />
    </ImgButton>
  );
}
