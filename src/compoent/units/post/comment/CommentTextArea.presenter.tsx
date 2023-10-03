import React from "react";
import {
  CommentSubmitBtn,
  CommentTextAreaInner,
  TextArea
} from "./comment.styles";
interface IProps {
  textAreaType: "write" | "edit" | "reply";
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  initalvalue: string;
  commentValue: string;
  onChangeCommentValue: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  preventKeydownEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isReply: boolean;
  onSubmitComment: () => void;
}
export default function CommentTextAreaUI({
  textAreaType,
  textAreaRef,
  initalvalue,
  commentValue,
  onChangeCommentValue,
  preventKeydownEnter,
  isReply,
  onSubmitComment
}: IProps) {
  return (
    <CommentTextAreaInner textAreaType={textAreaType}>
      <TextArea
        ref={textAreaRef}
        value={commentValue}
        onChange={onChangeCommentValue}
        onKeyDown={preventKeydownEnter}
        placeholder={isReply ? "답글을 입력하세요" : "댓글을 입력하세요."}
        rows={1}
      />
      <CommentSubmitBtn
        type='button'
        onClick={onSubmitComment}
        disabled={
          textAreaType === "edit"
            ? commentValue === initalvalue || !commentValue
            : !commentValue
        }
      />
    </CommentTextAreaInner>
  );
}
