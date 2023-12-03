import React from "react";
import { InputWrapper, IntroTextArea } from "./ProfileUpdateModal.styles";
import { Label } from "../../../component/commons/userInput/userInput.styles";

interface IProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  introduceValue: string;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export default function ProfileUpdateIntroduce({
  textareaRef,
  introduceValue,
  onChangeIntroduce,
  preventKeydownEnter
}: IProps) {
  return (
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
  );
}
