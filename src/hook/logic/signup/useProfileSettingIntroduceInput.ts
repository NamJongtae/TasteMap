import { useRef } from "react";
import { useTextarea } from "../../useTextarea";

export const useProfileSettingIntroduceInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    value: introduceValue,
    onChangeValue: onChangeIntroduce,
    setValue: setIntroduceValue,
    preventKeydownEnter
  } = useTextarea("", textareaRef, 30);

  return {
    introduceValue,
    onChangeIntroduce,
    setIntroduceValue,
    preventKeydownEnter
  };
};
