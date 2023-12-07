import React from "react";
import ScrollLoading from "../../../../../component/commons/loading/ScrollLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { resolveWebp } from "../../../../../library/resolveWebp";
import { ProfileImg, ProfileImgButton, ProfileImgButtonWrapper, ProfileImgResetBtn } from './profileSettingImgButton.styles';

interface IProps {
  isImgLoading: boolean;
  imgResetHandler: () => void;
  imgInputRef: React.RefObject<HTMLInputElement>;
  previewImg: string;
}

export default function ProfileSettingImgButton({
  isImgLoading,
  imgResetHandler,
  imgInputRef,
  previewImg
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <ProfileImgButtonWrapper>
      {isImgLoading ? (
        <ScrollLoading />
      ) : (
        <>
          <ProfileImgResetBtn
            type='button'
            onClick={imgResetHandler}
            aria-label='초기화'
            $isWebpSupported={isWebpSupported}
          />
          <ProfileImgButton
            type='button'
            onClick={() => imgInputRef.current && imgInputRef.current.click()}
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
          </ProfileImgButton>
        </>
      )}
    </ProfileImgButtonWrapper>
  );
}
