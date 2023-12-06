import React from "react";
import { useCommentTextarea } from "../../../hook/logic/comment/useCommentTextarea";
import {
  CommentSubmitBtn,
  CommentTextAreaInner,
  TextArea
} from "./comment.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  textareaType: "write" | "edit" | "reply";
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeTextarea?: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function CommentTextArea({
  textareaType,
  isReply,
  initalvalue,
  commentId,
  replyId,
  closeTextarea,
  textareaRef,
  postType
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const {
    commentValue,
    onChangeCommentValue,
    preventKeydownEnter,
    onSubmitComment
  } = useCommentTextarea({
    initalvalue,
    postType,
    textareaRef,
    commentId,
    replyId,
    closeTextarea,
    isReply,
    textareaType
  });

  return (
    <CommentTextAreaInner textareaType={textareaType}>
      <TextArea
        ref={textareaRef}
        value={commentValue}
        onChange={onChangeCommentValue}
        placeholder={isReply ? "답글을 입력하세요" : "댓글을 입력하세요."}
        rows={1}
        onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
          preventKeydownEnter(e);
        }}
      />
      <CommentSubmitBtn
        type='button'
        onClick={onSubmitComment}
        disabled={
          textareaType === "edit"
            ? commentValue === initalvalue || !commentValue
            : !commentValue
        }
        $isWebpSupported={isWebpSupported}
      />
    </CommentTextAreaInner>
  );
}
