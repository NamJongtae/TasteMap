import { useSelector } from 'react-redux';
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import {
  ProfileImg,
  ProfileImgButton,
  ProfileImgButtonWrapper,
  ProfileImgDesc,
  ProfileImgDescList,
  ProfileImgInput,
  ProfileImgLabel,
  ProfileImgResetBtn,
  ProfileImgWrapper
} from "./ProfileUpdateModal.styles";
import { RootState } from '../../../store/store';
import { resolveWebp } from '../../../library/resolveWebp';

interface IProps {
  imgInputRef: React.RefObject<HTMLInputElement>;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  resetBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  previewImg: string;
  isImgLoading: boolean;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  imgResetHandler: () => void;
}

export const ProfileUpdateImg = ({
  imgInputRef,
  ProfileImgButtonWrapperRef,
  closeBtnRef,
  resetBtnRef,
  previewImg,
  isImgLoading,
  changeImgHandler,
  imgResetHandler
}: IProps) => {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);

  return (
    <ProfileImgWrapper>
      <ProfileImgLabel className='a11y-hidden'>이미지</ProfileImgLabel>
      <ProfileImgInput
        type='file'
        ref={imgInputRef}
        className='a11y-hidden'
        onChange={changeImgHandler}
        accept='image/jpg, image/jpeg, image/png, image/bmp'
        tabIndex={-1}
      />
      <ProfileImgButtonWrapper tabIndex={0} ref={ProfileImgButtonWrapperRef}>
        {isImgLoading ? (
          <ScrollLoading />
        ) : (
          <>
            <ProfileImgResetBtn
              type='button'
              onClick={imgResetHandler}
              onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                optModalTabFocus(e, closeBtnRef.current);
              }}
              aria-label='초기화'
              $isWebpSupported={isWebpSupported}
            />
            <ProfileImgButton
              type='button'
              onClick={() => imgInputRef.current && imgInputRef.current.click()}
              ref={resetBtnRef}
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

      <ProfileImgDescList>
        <ProfileImgDesc>
          ⦁ 이미지를 설정하지 않을 경우 기본 이미지가 적용됩니다.
        </ProfileImgDesc>
        <ProfileImgDesc>
          ⦁ 업로드 가능한 최대 이미지 용량은 10MB 입니다.
        </ProfileImgDesc>
        <ProfileImgDesc>
          ⦁ .jpg, .jpge, .png, .bmp 이미지 형식을 지원합니다.
        </ProfileImgDesc>
      </ProfileImgDescList>
    </ProfileImgWrapper>
  );
};
