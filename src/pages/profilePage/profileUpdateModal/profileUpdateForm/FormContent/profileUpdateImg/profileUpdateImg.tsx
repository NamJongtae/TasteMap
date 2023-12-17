import { ProfileUpdateImgWrapper } from "../../../ProfileUpdateModal.styles";
import ProfileUpdateImgBtns from "./profileUpdateImgBtns/ProfileUpdateImgBtns";
import ProfileUpdateImgDesc from "./profileUpdateImgDesc/ProfileUpdateImgDesc";
import { useProfileUpdateImg } from "../../../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateImg";
import { IMyProfileData } from "../../../../../../api/apiType";
import ProfileUpdateImgField from "./profileUpdateImgField/ProfileUpdateImgField";
interface IProps {
  imgInputRef: React.RefObject<HTMLInputElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  imgResetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  myProfile: IMyProfileData;
}

export const ProfileUpdateImg = ({
  imgInputRef,
  ProfileImgButtonWrapperRef,
  closeBtnRef,
  imgResetBtnRef,
  myProfile
}: IProps) => {
  const { previewImg, isImgLoading, changeImgHandler, resetImgHandler } =
    useProfileUpdateImg({ initalPreviewImg: myProfile.photoURL });

  return (
    <ProfileUpdateImgWrapper>
      <ProfileUpdateImgField
        imgInputRef={imgInputRef}
        changeImgHandler={changeImgHandler}
      />

      <ProfileUpdateImgBtns
        ProfileImgButtonWrapperRef={ProfileImgButtonWrapperRef}
        isImgLoading={isImgLoading}
        imgResetHandler={resetImgHandler}
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
    </ProfileUpdateImgWrapper>
  );
};
