import { FieldValues } from "react-hook-form";
import { useCommentLeave } from "./useCommentLeave";
import { useCommentUpdate } from "./useCommentUpdate";
import { useReplyLeave } from "./useReplyLeave";
import { useReplyUpdate } from "./useReplyUpdate";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  commentId?: string;
  replyId?: string;
  textareaType: "leave" | "update";
  isReply: boolean;
  closeUpdateTextareaHandler?: () => void;
}

export const useTextAreaFormSubmit = ({
  postType,
  commentId,
  replyId,
  textareaType,
  isReply,
  closeUpdateTextareaHandler
}: IProps) => {
  const { commentLeaveHandler } = useCommentLeave({ postType });
  const { commentUpdateHandler } = useCommentUpdate({ postType, commentId });
  const { replyLeaveHandler } = useReplyLeave({ postType, commentId });
  const { replyUpdateHandler } = useReplyUpdate({
    postType,
    commentId,
    replyId
  });

  // textAreaType에 맞는 submit 함수 반환
  const onSubmitHandler = (data: FieldValues) => {
    if (textareaType === "leave" && !isReply) {
      return commentLeaveHandler(data);
    }
    if (textareaType === "update" && !isReply) {
      commentUpdateHandler(data);
      closeUpdateTextareaHandler && closeUpdateTextareaHandler();
      return;
    }
    if (textareaType === "leave" && isReply) {
      return replyLeaveHandler(data);
    }
    if (textareaType === "update" && isReply) {
      replyUpdateHandler(data);
      closeUpdateTextareaHandler && closeUpdateTextareaHandler();
      return;
    }
  };

  return { onSubmitHandler };
};
