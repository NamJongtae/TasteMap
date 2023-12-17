import React from "react";
import {
  ProfileImg,
  ProfileImgButton,
  ProfileImgButtonWrapper,
  ProfileImgResetBtn
} from "../../../../signup.styles";
import ScrollLoading from "../../../../../../component/commons/loading/ScrollLoading";
import { resolveWebp } from "../../../../../../library/resolveWebp";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";

interface IProps {
  previewImg: string;
  isImgLoading: boolean;
  resetImgHandler: () => void;
  imgInputRef: React.MutableRefObject<HTMLInputElement | null>;
}
export default function ProfileSettingImgButton({
  previewImg,
  isImgLoading,
  resetImgHandler,
  imgInputRef
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
            onClick={resetImgHandler}
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
