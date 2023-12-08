import { useCallback } from "react";
import { useReplyRemoveMutation } from "../../../query/post/reply/useReplyRemoveMutation";
import { sweetConfirm } from "../../../../library/sweetAlert/sweetAlert";
import { IReplyData } from "../../../../api/apiType";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  data: IReplyData;
}

export const useReplyRemove = ({ postType, data }: IProps) => {
  const { mutate: replyRemoveMutate } = useReplyRemoveMutation(postType);

  const removeReplyHandler = useCallback(() => {
    if (data) {
      sweetConfirm("정말 삭제하겠습니까?", "삭제", "취소", () => {
        replyRemoveMutate({
          parentCommentId: data.parentCommentId,
          replyId: data.replyId,
          postId: data.postId
        });
      });
    }
  }, []);

  return { removeReplyHandler };
};
