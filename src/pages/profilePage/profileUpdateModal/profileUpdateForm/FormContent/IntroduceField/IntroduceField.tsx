import React from "react";
import TextAreaField from "../../../../../../component/commons/UI/textAreaField/TextAreaField";
import { useResizeTextArea } from "../../../../../../hook/useResizeTextArea";
interface IProps {
  introduceRef: React.RefObject<HTMLTextAreaElement>;
}
export default function IntroduceField({ introduceRef }: IProps) {

  useResizeTextArea({ name: "introduce", ref: introduceRef });
  
  return (
    <TextAreaField
      label={"자기소개"}
      id={"introduce"}
      name={"introduce"}
      textareaRef={introduceRef}
      placeholder={"최대 100자까지 작성 가능합니다."}
      maxLength={100}
      rows={1}
      textareaStyle={{ backgroundColor: "#fff", maxHeight: "100px" }}
      required={false}
    />
  );
}
