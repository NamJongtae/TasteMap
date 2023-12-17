import React, { useEffect, useRef } from "react";
import TextAreaField from "../../../../../component/commons/UI/textAreaField/TextAreaField";
import { useFormContext } from "react-hook-form";

export default function IntroduceField() {
  const { watch } = useFormContext();
  const value = watch("introduce");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextAreaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight - 20 + "px";
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
      name={"introduce"}
      id={"introduce"}
      placeholder={"최대 100자까지 작성 가능합니다."}
      textareaRef={textareaRef}
      onKeyDown={preventKeydownEnter}
      maxLength={100}
      rows={1}
      required={false}
    />
  );
}
