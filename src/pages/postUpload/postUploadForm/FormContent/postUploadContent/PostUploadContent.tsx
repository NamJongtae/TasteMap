import React from "react";
import { ContentTitle, ContentSection } from "../../../postUpload.styles";
import TextAreaField from "../../../../../component/commons/UI/textAreaField/TextAreaField";
import { useResizeTextArea } from "../../../../../hook/useResizeTextArea";
export default function PostUploadContent() {
  const { textareaRef } = useResizeTextArea({ name: "content" });

  return (
    <ContentSection>
      <ContentTitle>소개 내용*</ContentTitle>
      <TextAreaField
        id={"content"}
        name={"content"}
        textareaRef={textareaRef}
        placeholder='추천메뉴 / 맛 / 가격 / 팁 / 상세 위치 / 한줄 평 등'
        maxLength={1000}
        rows={1}
        required={true}
        label={"소개내용"}
        label_hidden={true}
      />
    </ContentSection>
  );
}
