import React from "react";
import { ICommentData, IReplyData } from "../../../../../../../types/apiTypes";
import CommentTextAreaForm from "../../../textAreaFormField/textAreaForm/TextAreaForm";
import { CommentText } from "../../../commentModal.styles";

interface IProps {
  isEdit: boolean;
  isReply: boolean;
  data: ICommentData | IReplyData;
  closeUpdateTextareaHandler: () => void;
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
  closeUpdateTextareaHandler
}: IProps) {
  return (
    <>
      {isEdit ? (
        <CommentTextAreaForm
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
          textareaType={"update"}
          closeUpdateTextareaHandler={closeUpdateTextareaHandler}
        />
      ) : (
        <CommentText>{data.content}</CommentText>
      )}
    </>
  );
}
