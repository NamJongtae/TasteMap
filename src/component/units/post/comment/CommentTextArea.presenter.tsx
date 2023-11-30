import React from "react";
import {
  CommentSubmitBtn,
  CommentTextAreaInner,
  TextArea
} from "./comment.styles";
interface IProps {
  textAreaType: "write" | "edit" | "reply";
  initalvalue: string;
  commentValue: string;
  onChangeCommentValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isReply: boolean;
  onSubmitComment: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  isWebpSupported: boolean | null;
}
export default function CommentTextAreaUI({
  textAreaType,
  initalvalue,
  commentValue,
  onChangeCommentValue,
  preventKeydownEnter,
  isReply,
  onSubmitComment,
  textareaRef,
  isWebpSupported
}: IProps) {
  return (
    <CommentTextAreaInner textAreaType={textAreaType}>
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
          textAreaType === "edit"
            ? commentValue === initalvalue || !commentValue
            : !commentValue
        }
        $isWebpSupported={isWebpSupported}
      />
    </CommentTextAreaInner>
  );
}
