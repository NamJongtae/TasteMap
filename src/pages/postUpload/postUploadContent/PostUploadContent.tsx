import React from "react";
import {
  ContentSection,
  ContentTextArea,
  ContentTitle
} from "./postUploadContent.styles";

interface IProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  contentValue: string;
  onChangeContentValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export default function PostUploadContent({
  textareaRef,
  contentValue,
  onChangeContentValue
}: IProps) {
  return (
    <ContentSection>
      <ContentTitle>소개 내용*</ContentTitle>
      <ContentTextArea
        ref={textareaRef}
        placeholder='추천메뉴 / 맛 / 가격 / 팁 / 상세 위치 / 한줄 평 등'
        value={contentValue}
        onChange={onChangeContentValue}
        maxLength={1000}
        rows={1}
      />
    </ContentSection>
  );
}
