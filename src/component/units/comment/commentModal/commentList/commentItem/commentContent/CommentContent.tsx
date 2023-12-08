import React from "react";
import { ICommentData, IReplyData } from "../../../../../../../api/apiType";
import { CommentText } from "./commentContent.styles";
import CommentTextArea from "../../../textAreaField/commentTextArea/CommentTextarea";

interface IProps {
  isEdit: boolean;
  isReply: boolean;
  data: ICommentData | IReplyData;
  closeEditTextareaHandler: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function CommentContent({
  isEdit,
  isReply,
  data,
  closeBtnRef,
  textareaRef,
  postType,
  closeEditTextareaHandler
}: IProps) {


  return (
    <>
      {isEdit ? (
        <CommentTextArea
          isReply={isReply}
          postType={postType}
          commentId={
            isReply
              ? (data as IReplyData).parentCommentId
              : (data as ICommentData).commentId
          }
          replyId={(data as IReplyData).replyId}
          textareaRef={textareaRef}
          closeBtnRef={closeBtnRef}
          initalvalue={data.content}
          textareaType={"edit"}
          closeTextarea={closeEditTextareaHandler}
        />
      ) : (
        <CommentText>{data.content}</CommentText>
      )}
    </>
  );
}
