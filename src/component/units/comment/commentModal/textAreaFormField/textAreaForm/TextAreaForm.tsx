import React from "react";
import { MyForm } from "../../../../../commons/UI/myForm/MyForm";
import CommentTextArea from "./commentTextArea/CommentTextarea";
import ResetBtn from "./ResetBtn";
import { useTextAreaFormSubmit } from "../../../../../../hook/logic/comment/commentTextArea/useTextAreaFormSubmit";
import { useResetTextAreaForm } from "../../../../../../hook/logic/comment/commentTextArea/useResetTextAreaForm";

interface IProps {
  textareaType: "leave" | "update";
  isReply: boolean;
  initalvalue: string;
  commentId?: string;
  replyId?: string;
  closeUpdateTextareaHandler?: () => void;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function TextAreaForm({
  textareaType,
  isReply,
  initalvalue,
  commentId,
  replyId,
  closeUpdateTextareaHandler,
  textareaRef,
  postType
}: IProps) {
  const { resetBtnRef, resetFormHandler } = useResetTextAreaForm();

  const { onSubmitHandler } = useTextAreaFormSubmit({
    commentId,
    replyId,
    isReply,
    closeUpdateTextareaHandler,
    postType,
    textareaType
  });

  return (
    <MyForm
      onSubmit={(data) => {
        onSubmitHandler(data);
        resetFormHandler();
      }}
      formOptions={{
        mode: "onSubmit",
        defaultValues: { reply: initalvalue, comment: initalvalue }
      }}
    >
      <CommentTextArea
        isReply={isReply}
        textareaType={textareaType}
        textareaRef={textareaRef}
      />
      <ResetBtn isReply={isReply} resetBtnRef={resetBtnRef} />
    </MyForm>
  );
}
