import React from "react";
import { FormContentWrapper } from "../../postUpload.styles";
import PostUploadSubTitle from "./postUploadSubTitle/PostUploadSubTitle";
import { PostUploadMap } from "./postUploadMap/PostUploadMap";
import PostUploadRating from "./postUploadRating/PostUploadRating";
import PostUploadContent from "./postUploadContent/PostUploadContent";
import PostUploadImg from "./postUploadImg/PostUploadImg";
import { IPostData } from "../../../../api/apiType";

interface IProps {
  formContentWrapperRef: React.RefObject<HTMLDivElement>;
  isEdit: boolean;
  post: IPostData | undefined;
}
export default function FormContent({
  formContentWrapperRef,
  isEdit,
  post
}: IProps) {
  return (
    <FormContentWrapper ref={formContentWrapperRef}>
      <PostUploadSubTitle title={isEdit ? "게시물 수정" : "게시물 업로드"} />

      <PostUploadMap isEdit={isEdit} post={post} />

      <PostUploadRating />

      <PostUploadContent />

      <PostUploadImg isEdit={isEdit} post={post} />
    </FormContentWrapper>
  );
}
