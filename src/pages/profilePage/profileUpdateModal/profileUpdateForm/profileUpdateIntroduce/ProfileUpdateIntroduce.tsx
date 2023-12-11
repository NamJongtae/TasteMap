import React from "react";
import TextAreaField from "../../../../../component/commons/UI/TextAreaField";
import { useProfileUpdateIntroduce } from "../../../../../hook/logic/profile/profileUpdateModal/useProfileUpdateIntroduce";
import { IMyProfileData } from "../../../../../api/apiType";

interface IProps {
  controllIntroduceHandler: (introduce: string) => void;
  myProfile: IMyProfileData;
  introduceRef: React.RefObject<HTMLTextAreaElement>;
}
export default function ProfileUpdateIntroduce({
  controllIntroduceHandler,
  myProfile,
  introduceRef
}: IProps) {
  const { introduceValue, onChangeIntroduce, preventKeydownEnter } =
    useProfileUpdateIntroduce({ myProfile, introduceRef });
  return (
    <TextAreaField
      label={"자기소개"}
      id={"input-introduce"}
      value={introduceValue}
      name={"introduce"}
      onChange={(e) => {
        onChangeIntroduce(e);
        controllIntroduceHandler(e.target.value);
      }}
      onKeyDown={preventKeydownEnter}
      textareaRef={introduceRef}
      placeholder={"최대 100자까지 작성 가능합니다."}
      maxLength={100}
      textareaStyle={{ backgroundColor: "#fff" }}
    />
  );
}
