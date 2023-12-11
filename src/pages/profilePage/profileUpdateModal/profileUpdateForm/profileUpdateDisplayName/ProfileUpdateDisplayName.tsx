import React from "react";
import { InputField } from "../../../../../component/commons/UI/InputField";
import { useProfileUpdateDisplayName } from "../../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateDisplayName";
import { IMyProfileData } from "../../../../../api/apiType";

interface IProps {
  myProfile: IMyProfileData;
  controllDisplayNameHandler: (displayName: string) => void;
  controllDisplayNameValidHandler: (displayNameValid: boolean) => void;
}

export default function ProfileUpdateDisplayName({
  myProfile,
  controllDisplayNameHandler,
  controllDisplayNameValidHandler
}: IProps) {
  const { displayNameValue, displayNameValid, onChangeDisplayName } =
    useProfileUpdateDisplayName({ myProfile, controllDisplayNameValidHandler });

  return (
    <InputField
      type='text'
      label={"닉네임"}
      name={"nickname"}
      id={"input-nickname"}
      placeholder={"4-10자 영문, 영문 + 숫자"}
      value={displayNameValue}
      onChange={(e) => {
        onChangeDisplayName(e);
        controllDisplayNameHandler(e.target.value);
      }}
      inputStyle={{ backgroundColor: "#fff" }}
      minLength={4}
      maxLength={10}
      errorMsg={displayNameValid.errorMsg}
    />
  );
}
