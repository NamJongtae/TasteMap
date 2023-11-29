import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { updateComment } from "../../../../api/firebase/commentAPI";
import { ICommentData, IPostData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { commentSlice } from "../../../../slice/commentSlice";
import { useParams } from "react-router-dom";

type InfiniteCommentsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};
type InfinitePostsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useCommentUpdateMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (
      commentUpdateData: Pick<ICommentData, "commentId" | "content" | "postId">
    ) => updateComment(commentUpdateData),
    onMutate: async (reportCommentData) => {
      await queryClient.cancelQueries({ queryKey: ["post", reportCommentData.postId, "comments"] });

      const previousComments:
        | InfiniteData<InfiniteCommentsType, unknown>
        | undefined = await queryClient.getQueryData(["post", reportCommentData.postId, "comments"]);

      const newPages = previousComments?.pages.map(
        (page: InfiniteCommentsType) => {
          return {
            ...page,
            data: page.data.map((comment: ICommentData) =>
              comment.commentId === reportCommentData.commentId
                ? {
                    ...comment,
                    ...reportCommentData
                  }
                : comment
            )
          };
        }
      );
      queryClient.setQueryData(
        ["post", reportCommentData.postId, "comments"],
        (data: InfiniteData<InfiniteCommentsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousComments };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(["post", data.postId, "comments"], ctx.previousComments);
      }

      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType],
          (postsData: InfiniteData<InfinitePostsType, unknown>) => ({
            ...postsData,
            pages: postsData.pages.map((page: InfinitePostsType) => ({
              ...page,
              data: page.data.filter(
                (post: IPostData) => post.id !== data.postId
              )
            }))
          })
        );
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      } else if (error.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다!", "warning");
        // 댓글 삭제
        queryClient.setQueryData(
          ["post", data.postId, "comments"],
          (commentsData: InfiniteData<InfiniteCommentsType, unknown>) => ({
            ...commentsData,
            pages: commentsData.pages.map((page: InfiniteCommentsType) => ({
              ...page,
              data: page.data.filter(
                (comment: ICommentData) => comment.commentId !== data.commentId
              )
            }))
          })
        );
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.log(error);
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["post", data, "comments"],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
