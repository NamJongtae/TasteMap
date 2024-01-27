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
import {
  getCommentsQuerykey,
  getPostsQuerykey,
  getRepliesQuerykey
} from "../../../../querykey/querykey";

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
      const REPLIES_QUERYKEY = getRepliesQuerykey(
        reportUpdateData.postId,
        reportUpdateData.parentCommentId
      );
      await queryClient.cancelQueries({
        queryKey: REPLIES_QUERYKEY
      });

      const previousReplies:
        | InfiniteData<InfiniteRepliesType, unknown>
        | undefined = queryClient.getQueryData(REPLIES_QUERYKEY);

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
        REPLIES_QUERYKEY,
        (data: InfiniteData<InfiniteRepliesType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousReplies };
    },
    onError: (error, data, ctx) => {
      const REPLIES_QUERYKEY = getRepliesQuerykey(
        data.postId,
        data.parentCommentId
      );
      const COMMENTS_QUERYKEY = getCommentsQuerykey(data.postId);
      const POSTS_QUERYKEY = getPostsQuerykey(postType, uid);

      if (ctx) {
        queryClient.setQueryData(REPLIES_QUERYKEY, ctx.previousReplies);
      }

      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          POSTS_QUERYKEY,
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
          COMMENTS_QUERYKEY,
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
      if (!data) return;
      const REPLIES_QUERYKEY = getRepliesQuerykey(
        data.postId,
        data.parentCommentId
      );

      queryClient.invalidateQueries({
        queryKey: REPLIES_QUERYKEY,
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
