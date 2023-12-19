import React from "react";
import { resolveWebp } from "../../../../../library/resolveWebp";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import CommentTextAreaForm from "./textAreaForm/TextAreaForm";
import { TextAreaFormWrapper, UserImg } from '../commentModal.styles';

interface IProps {
  isReply: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
  commentId?: string;
  replyId?: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}

export default function TextAreaFormField({
  isReply,
  postType,
  commentId,
  replyId,
  textareaRef,
  closeBtnRef
}: IProps) {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  return (
    <TextAreaFormWrapper>
      <UserImg
        src={myInfo.photoURL}
        alt='프로필 이미지'
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = resolveWebp(
            "/assets/webp/icon-defaultProfile.webp",
            "svg"
          );
        }}
      />
      <CommentTextAreaForm
        initalvalue=''
        isReply={isReply}
        textareaType={"leave"}
        textareaRef={textareaRef}
        closeBtnRef={closeBtnRef}
        commentId={commentId}
        replyId={replyId}
        postType={postType}
      />
    </TextAreaFormWrapper>
  );
}
