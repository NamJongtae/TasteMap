import { useQueryClient } from "@tanstack/react-query";
import { useLoadPostQuery } from "../../query/post/useLoadPostQuery";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

interface IProps {
  isEdit: boolean;
}
export const useLoadPostData = ({ isEdit }: IProps) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: post,
    isFetching: loadPostLoading,
    isError,
    error
  } = useLoadPostQuery(isEdit, postId || "");

  useEffect(() => {
    if (isError) {
      if (error?.message !== "존재하지 않는 게시물입니다.") {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(error);
        navigate("/");
      }
      queryClient.removeQueries({ queryKey: ["post", postId] });
    }
  }, [isError]);

  const invalidPostData = isEdit && !post?.uid && !loadPostLoading;

  return { post, loadPostLoading, invalidPostData };
};
