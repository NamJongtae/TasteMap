import React from "react";
import UserInput from "../../component/commons/userInput/UserInput";
import ErrorMsg from "../../component/commons/errorMsg/ErrorMsg";
import ScrollLoading from "../../component/commons/loading/ScrollLoading";
import {
  InputWrapper,
  PrevBtn,
  ProfileImg,
  ProfileImgButton,
  ProfileImgButtonWrapper,
  ProfileImgDesc,
  ProfileImgDescList,
  ProfileImgInput,
  ProfileImgLabel,
  ProfileImgResetBtn,
  ProfileImgWrapper,
  SignupBtn,
  SignupForm
} from "./ProfileSetting.styles";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resolveWebp } from '../../library/resolveWebp';


interface IProps {
  setCompletedProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
  setNext: React.Dispatch<React.SetStateAction<boolean>>;
  signupHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  imgInputRef: React.RefObject<HTMLInputElement>;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  previewImg: string;
  imgResetHandler: () => void;
  displayNameValue: string;
  onChangeDislayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  introduce: string;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  signupDisabled: boolean;
  isImgLoading: boolean;
}

export default function ProfileSetting({
  setCompletedProfile,
  setPercentage,
  setNext,
  signupHandler,
  imgInputRef,
  changeImgHandler,
  previewImg,
  imgResetHandler,
  displayNameValue,
  onChangeDislayName,
  introduce,
  onChangeIntroduce,
  displayNameValid,
  signupDisabled,
  isImgLoading
}: IProps) {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);

  return (
    <SignupForm onSubmit={signupHandler}>
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
                onClick={() =>
                  imgInputRef.current && imgInputRef.current.click()
                }
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
            ⦁ .jpg, .jpge, .png, .svg 이미지 형식을 지원합니다.
          </ProfileImgDesc>
        </ProfileImgDescList>
      </ProfileImgWrapper>
      <InputWrapper>
        <UserInput
          type='text'
          label={"닉네임 (필수)"}
          id={"input-nickname"}
          placeholder={"4-10자 영문, 영문 + 숫자"}
          value={displayNameValue}
          onChange={onChangeDislayName}
          minLength={4}
          maxLength={10}
        />
        {displayNameValid.errorMsg && (
          <ErrorMsg message={displayNameValid.errorMsg} />
        )}
      </InputWrapper>
      <InputWrapper>
        <UserInput
          type='text'
          label={"자기소개"}
          id={"input-nickname"}
          placeholder={"최대 100자까지 작성 가능합니다."}
          value={introduce}
          onChange={onChangeIntroduce}
          maxLength={100}
        />
      </InputWrapper>

      <SignupBtn type='submit' disabled={signupDisabled}>
        회원가입
      </SignupBtn>
      <PrevBtn
        className='prev'
        type='button'
        onClick={() => {
          setCompletedProfile(false);
          setPercentage("50%");
          setNext(false);
        }}
      >
        이전
      </PrevBtn>
    </SignupForm>
  );
}
