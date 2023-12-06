import { useRef } from "react";
import { useTextarea } from "../profile/profileUpdate/useTextarea";

export const useProfileSettingIntroduceInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    value: introduceValue,
    onChangeValue: onChangeIntroduce,
    setValue: setIntroduceValue,
    preventKeydownEnter
  } = useTextarea("", textareaRef);

  return {
    introduceValue,
    onChangeIntroduce,
    setIntroduceValue,
    preventKeydownEnter
  };
};
