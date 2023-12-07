import React from "react";
import TextAreaField from "../../../component/commons/UI/TextAreaField";
import ProfileSettingImg from "./profileSettingImg/ProfileSettingImg";
import { InputField } from "../../../component/commons/UI/InputField";
import styled from "styled-components";

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const SignupBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;

const PrevBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;

interface IProps {
  setPercentage: React.Dispatch<React.SetStateAction<string>>;
  prevStepHandler: () => void;
  signupHandler: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  imgInputRef: React.RefObject<HTMLInputElement>;
  changeImgHandler: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  previewImg: string;
  imgResetHandler: () => void;
  displayNameValue: string;
  onChangeDislayName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  introduce: string;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  displayNameValid: {
    errorMsg: string;
    valid: boolean;
  };
  signupDisabled: boolean;
  isImgLoading: boolean;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function ProfileSetting({
  prevStepHandler,
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
  isImgLoading,
  preventKeydownEnter
}: IProps) {
  return (
    <SignupForm onSubmit={signupHandler}>
      <ProfileSettingImg
        imgInputRef={imgInputRef}
        changeImgHandler={changeImgHandler}
        previewImg={previewImg}
        imgResetHandler={imgResetHandler}
        isImgLoading={isImgLoading}
      />

      <InputField
        type='text'
        label={"닉네임 (필수)"}
        name={"nickname"}
        id={"input-nickname"}
        placeholder={"4-10자 영문, 영문 + 숫자"}
        value={displayNameValue}
        onChange={onChangeDislayName}
        minLength={4}
        maxLength={10}
        errorMsg={displayNameValid.errorMsg}
      />

      <TextAreaField
        label={"자기소개"}
        label_hidden={true}
        name={"introduce"}
        id={"input-nickname"}
        placeholder={"최대 100자까지 작성 가능합니다."}
        value={introduce}
        onChange={onChangeIntroduce}
        onKeyDown={preventKeydownEnter}
        maxLength={100}
      />

      <SignupBtn type='submit' disabled={signupDisabled}>
        회원가입
      </SignupBtn>
      <PrevBtn
        className='prev'
        type='button'
        onClick={() => {
          prevStepHandler();
        }}
      >
        이전
      </PrevBtn>
    </SignupForm>
  );
}
