import React, { useEffect } from "react";
import TextAreaField from "../../../../../../component/commons/UI/textAreaField/TextAreaField";
import { useFormContext } from "react-hook-form";
interface IProps {
  introduceRef: React.RefObject<HTMLTextAreaElement>;
}
export default function IntroduceField({ introduceRef }: IProps) {
  const { watch } = useFormContext();
  const value = watch("introduce");

  const resizeTextAreaHeight = () => {
    if (introduceRef.current) {
      introduceRef.current.style.height = "auto";
      introduceRef.current.style.height =
        introduceRef.current.scrollHeight - 20 + "px";
    }
  };

  // 텍스트가 없는 경우 엔터키를 막음 빈 문자열 전송을 제한
  const preventKeydownEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.currentTarget.value && e.key === "Enter") {
      e.preventDefault();
      return;
    }
  };

  useEffect(() => {
    resizeTextAreaHeight();
  }, [value, resizeTextAreaHeight]);

  return (
    <TextAreaField
      label={"자기소개"}
      id={"introduce"}
      name={"introduce"}
      onKeyDown={preventKeydownEnter}
      textareaRef={introduceRef}
      placeholder={"최대 100자까지 작성 가능합니다."}
      maxLength={100}
      textareaStyle={{ backgroundColor: "#fff" }}
      required={false}
    />
  );
}
