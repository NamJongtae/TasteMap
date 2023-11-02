import React from "react";
import { resolveWebp } from "../../../library/webpSupport";
import UserInput from "../../../component/commons/userInput/UserInput";
import { Label } from "../../../component/commons/userInput/userInput.styles";
import ErrorMsg from "../../../component/commons/errorMsg/ErrorMsg";
import {
  CloseBtn,
  Dim,
  EditBtn,
  EditForm,
  InputWrapper,
  IntroTextArea,
  ModalTitle,
  ModalTitleBar,
  ProfileEditModalWrapper,
  ProfileImg,
  ProfileImgButton,
  ProfileImgButtonWrapper,
  ProfileImgDesc,
  ProfileImgDescList,
  ProfileImgInput,
  ProfileImgLabel,
  ProfileImgResetBtn,
  ProfileImgWrapper,
  Wrapper
} from "./ProfileEditModal.styles";
import { IProfileData } from "../../../api/apiType";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
interface IProps {
  onClickClose: () => void;
  modalRef: React.RefObject<HTMLDivElement>;
  onClickSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  imgInputRef: React.RefObject<HTMLInputElement>;
  onChangeImg: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  previewImg: string | undefined;
  onClickImgReset: () => void;
  displayNameValue: string;
  onChangeDisplayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  introduceValue: string | undefined;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  myProfile: IProfileData;
  ProfileImgButtonWrapperRef: React.RefObject<HTMLDivElement>;
  resetBtnRef: React.RefObject<HTMLButtonElement>;
  editBtnRef: React.RefObject<HTMLButtonElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  isImgLoading: boolean;
}
export default function ProfileEditModalUI({
  onClickClose,
  modalRef,
  onClickSubmit,
  imgInputRef,
  onChangeImg,
  previewImg,
  onClickImgReset,
  displayNameValue,
  onChangeDisplayName,
  displayNameValid,
  introduceValue,
  onChangeIntroduce,
  preventKeydownEnter,
  textareaRef,
  myProfile,
  ProfileImgButtonWrapperRef,
  resetBtnRef,
  editBtnRef,
  closeBtnRef,
  isImgLoading
}: IProps) {
  return (
    <Wrapper
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 27) {
          onClickClose();
        }
      }}
    >
      <Dim onClick={onClickClose}></Dim>
      <ProfileEditModalWrapper ref={modalRef}>
        <ModalTitleBar>
          <ModalTitle>프로필 수정</ModalTitle>
        </ModalTitleBar>
        <EditForm onSubmit={onClickSubmit}>
          <ProfileImgWrapper>
            <ProfileImgLabel className='a11y-hidden'>이미지</ProfileImgLabel>
            <ProfileImgInput
              type='file'
              ref={imgInputRef}
              className='a11y-hidden'
              onChange={onChangeImg}
              accept='image/jpg, image/jpeg, image/png, image/bmp'
              tabIndex={-1}
            />
            <ProfileImgButtonWrapper
              tabIndex={0}
              ref={ProfileImgButtonWrapperRef}
            >
              {isImgLoading ? (
                <ScrollLoading />
              ) : (
                <>
                  <ProfileImgResetBtn
                    type='button'
                    onClick={onClickImgReset}
                    onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
                      optModalTabFocus(e, closeBtnRef.current);
                    }}
                    aria-label='초기화'
                  />
                  <ProfileImgButton
                    type='button'
                    onClick={() =>
                      imgInputRef.current && imgInputRef.current.click()
                    }
                    ref={resetBtnRef}
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
          <InputWrapper>
            <UserInput
              type='text'
              label={"닉네임"}
              id={"input-nickname"}
              placeholder={"4-10자 영문, 영문 + 숫자"}
              value={displayNameValue}
              onChange={onChangeDisplayName}
              minLength={4}
              maxLength={10}
            />
            {displayNameValid.errorMsg && (
              <ErrorMsg message={displayNameValid.errorMsg} />
            )}
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor='input-introduce'>자기소개</Label>
            <IntroTextArea
              id={"input-introduce"}
              value={introduceValue}
              onChange={onChangeIntroduce}
              onKeyDown={preventKeydownEnter}
              ref={textareaRef}
              placeholder={"최대 100자까지 작성 가능합니다."}
              maxLength={100}
              rows={1}
            />
          </InputWrapper>

          <EditBtn
            type='submit'
            disabled={
              !displayNameValid.valid ||
              (myProfile.displayName?.toLowerCase() ===
                displayNameValue.toLowerCase() &&
                myProfile.photoURL === previewImg &&
                myProfile.introduce === introduceValue)
            }
            ref={editBtnRef}
          >
            프로필 수정
          </EditBtn>
        </EditForm>
        <CloseBtn
          onClick={onClickClose}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            optModalTabFocus(
              e,
              editBtnRef.current?.disabled
                ? textareaRef.current
                : editBtnRef.current,
              resetBtnRef.current
            );
          }}
          ref={closeBtnRef}
        />
      </ProfileEditModalWrapper>
    </Wrapper>
  );
}
