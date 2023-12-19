import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { FieldValues } from "react-hook-form";
import { useReplyUpdateMutation } from "../../../query/post/reply/useReplyUpdateMutation";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  commentId?: string;
  replyId?: string;
}

export const useReplyUpdate = ({ postType, commentId, replyId }: IProps) => {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const { mutate: replyUpdateMutate } = useReplyUpdateMutation(postType);

  const replyUpdateHandler = (data: FieldValues) => {
    if (!replyId || !commentId) return;
    const replyUpdateData = {
      replyId,
      parentCommentId: commentId,
      content: data.reply,
      postId: postId
    };
    replyUpdateMutate(replyUpdateData);
  };

  return { replyUpdateHandler };
};
