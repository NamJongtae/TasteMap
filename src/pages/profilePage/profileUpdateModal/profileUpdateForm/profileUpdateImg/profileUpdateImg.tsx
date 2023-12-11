import { ProfileImgWrapper } from "../../ProfileUpdateModal.styles";
import { useFocusing } from "../../../../../hook/useFocusing";
import ProfileUpdateImgInput from "./profileUpdateImgInput/ProfileUpdateImgInput";
import ProfileUpdateImgBtns from "./profileUpdateImgBtns/ProfileUpdateImgBtns";
import ProfileUpdateImgDesc from "./profileUpdateImgDesc/ProfileUpdateImgDesc";
import { useProfileUpdateImg } from "../../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateImg";
import { IMyProfileData } from "../../../../../api/apiType";

interface IProps {
  imgInputRef: React.RefObject<HTMLInputElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  myProfile: IMyProfileData;
  controllPreviewImgHandler: (previewImg: string) => void;
}

export const ProfileUpdateImg = ({
  imgInputRef,
  ProfileImgButtonWrapperRef,
  closeBtnRef,
  imgResetBtnRef,
  myProfile,
  controllPreviewImgHandler
}: IProps) => {
  const { previewImg, isImgLoading, changeImgHandler, imgResetHandler } =
    useProfileUpdateImg({ initalPreviewImg: myProfile.photoURL });

  // tab focus 최적화를 위한 초기 focus 설정
  useFocusing(ProfileImgButtonWrapperRef);

  return (
    <ProfileImgWrapper>
      <ProfileUpdateImgInput
        imgInputRef={imgInputRef}
        changeImgHandler={(e) => {
          changeImgHandler(e);
          controllPreviewImgHandler(e.target.value);
        }}
      />

      <ProfileUpdateImgBtns
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        isImgLoading={isImgLoading}
        imgResetHandler={imgResetHandler}
        closeBtnRef={closeBtnRef}
        previewImg={previewImg}
        imgInputRef={imgInputRef}
        imgResetBtnRef={imgResetBtnRef}
      />

      <ProfileUpdateImgDesc
        descList={[
          "이미지를 설정하지 않을 경우 기본 이미지가 적용됩니다.",
          "업로드 가능한 최대 이미지 용량은 10MB 입니다.",
          ".jpg, .jpge, .png, .bmp 이미지 형식을 지원합니다."
        ]}
      />
    </ProfileImgWrapper>
  );
};
