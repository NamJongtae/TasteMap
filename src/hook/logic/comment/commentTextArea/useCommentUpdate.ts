import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { FieldValues } from "react-hook-form";
import { useCommentUpdateMutation } from "../../../query/post/comment/useCommentUpdateMutation";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  commentId?: string;
}

export const useCommentUpdate = ({ postType, commentId }: IProps) => {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const { mutate: commentUpdateMutate } = useCommentUpdateMutation(postType);

  const commentUpdateHandler = (data: FieldValues) => {
    if(!commentId) return;
    const commentEditData = {
      commentId: commentId,
      content: data.comment,
      postId
    };
    commentUpdateMutate(commentEditData);
  };

  return { commentUpdateHandler };
};
