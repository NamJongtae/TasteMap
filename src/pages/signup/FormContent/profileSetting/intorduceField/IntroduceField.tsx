import React from "react";
import TextAreaField from "../../../../../component/commons/UI/textAreaField/TextAreaField";
import { useResizeTextArea } from "../../../../../hook/useResizeTextArea";

export default function IntroduceField() {
  const { textareaRef } = useResizeTextArea({ name: "introduce" });
  return (
    <TextAreaField
      label={"자기소개"}
      name={"introduce"}
      id={"introduce"}
      textareaRef={textareaRef}
      placeholder={"최대 100자까지 작성 가능합니다."}
      maxLength={100}
      rows={1}
      required={false}
      textareaStyle={{ maxHeight: "100px" }}
    />
  );
}
