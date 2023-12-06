import React from "react";
import styled from "styled-components";
import ScrollLoading from "../../component/commons/loading/ScrollLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { resolveWebp } from '../../library/resolveWebp';

const ProfileImgButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #bdbdbd;
  ::after {
    content: "";
    position: absolute;
    right: -12px;
    bottom: -3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  &::after {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-uploadProfile.webp"
          : "/assets/icon-uploadProfile.svg"
      }) no-repeat center / 20px #79a7ff`};
  }
`;

const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const ProfileImgButtonWrapper = styled.div`
  position: relative;
  max-width: 130px;
  min-height: 110px;
  margin: 0 auto;
`;

const ProfileImgResetBtn = styled.button`
  position: absolute;
  top: -3px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-close.webp"
        : "/assets/icon-close.svg"
    }) no-repeat center top 2px/ 16px #767676`};
`;

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
