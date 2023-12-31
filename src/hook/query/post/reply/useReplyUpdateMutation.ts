import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { ICommentData, IPostData, IReplyData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { commentSlice } from "../../../../slice/commentSlice";
import { updateReply } from "../../../../api/firebase/replyAPI";
import { useParams } from "react-router-dom";

type InfiniteCommentsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};

type InfinitePostsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

type InfiniteRepliesType = {
  replyDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IReplyData[];
};

export const useReplyUpdateMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (
      replyUpdateData: Pick<
        IReplyData,
        "parentCommentId" | "replyId" | "content" | "postId"
      >
    ) => updateReply(replyUpdateData),
    onMutate: async (reportUpdateData) => {
      await queryClient.cancelQueries({
        queryKey: [
          "post",
          reportUpdateData.postId,
          "comment",
          reportUpdateData.parentCommentId,
          "replies"
        ]
      });

      const previousReplies:
        | InfiniteData<InfiniteRepliesType, unknown>
        | undefined = await queryClient.getQueryData([
        "post",
        reportUpdateData.postId,
        "comment",
        reportUpdateData.parentCommentId,
        "replies"
      ]);

      const newPages = previousReplies?.pages.map(
        (page: InfiniteRepliesType) => {
          return {
            ...page,
            data: page.data.map((reply: IReplyData) =>
              reply.replyId === reportUpdateData.replyId
                ? {
                    ...reply,
                    ...reportUpdateData
                  }
                : reply
            )
          };
        }
      );
      queryClient.setQueryData(
        [
          "post",
          reportUpdateData.postId,
          "comment",
          reportUpdateData.parentCommentId,
          "replies"
        ],
        (data: InfiniteData<InfiniteRepliesType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousReplies };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(
          ["post", data.postId, "comment", data.parentCommentId, "replies"],
          ctx.previousReplies
        );
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
                (comment: ICommentData) =>
                  comment.commentId !== data.parentCommentId
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
    onSettled: (
      data: { postId: string; parentCommentId: string } | undefined
    ) => {
      queryClient.invalidateQueries({
        queryKey: [
          "post",
          data?.postId,
          "comment",
          data?.parentCommentId,
          "replies"
        ],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
