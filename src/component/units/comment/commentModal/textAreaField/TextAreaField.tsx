import React from "react";
import { CommentTextAreaWrapper, UserImg } from "./textAreaField.styles";
import CommentTextArea from "./commentTextArea/CommentTextarea";
import { resolveWebp } from "../../../../../library/resolveWebp";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";

interface IProps {
  isReply: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
  commentId?: string;
  replyId?: string;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}

export default function TextAreaField({
  isReply,
  postType,
  commentId,
  replyId,
  textareaRef,
  closeBtnRef
}: IProps) {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  return (
    <CommentTextAreaWrapper>
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
      <CommentTextArea
        initalvalue=''
        isReply={isReply}
        textareaType={isReply ? "reply" : "write"}
        textareaRef={textareaRef}
        closeBtnRef={closeBtnRef}
        commentId={commentId}
        replyId={replyId}
        postType={postType}
      />
    </CommentTextAreaWrapper>
  );
}
