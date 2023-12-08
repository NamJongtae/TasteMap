import { useCallback } from "react";
import { sweetConfirm } from "../../../../library/sweetAlert/sweetAlert";
import { useCommentRemoveMutation } from "../../../query/post/comment/useCommentRemoveMutation";
import { ICommentData } from "../../../../api/apiType";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  data: ICommentData;
}

export const useCommentRemove = ({ postType, data }: IProps) => {
  const { mutate: commentRemoveMutate } = useCommentRemoveMutation(postType);

  const removeCommentHandler = useCallback(() => {
    if (data) {
      sweetConfirm("정말 삭제하겠습니까?", "삭제", "취소", () => {
        commentRemoveMutate(data);
      });
    }
  }, []);

  return { removeCommentHandler };
};
