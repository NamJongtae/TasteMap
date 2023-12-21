import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { ICommentData, IPostData, IReplyData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { commentSlice } from "../../../../slice/commentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { leaveReply } from "../../../../api/firebase/replyAPI";
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";

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

export const useReplyLeaveMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (replyData: IReplyData) => leaveReply(replyData),
    onMutate: async (newReplyData) => {
      await queryClient.cancelQueries({
        queryKey: [
          "post",
          newReplyData.postId,
          "comment",
          newReplyData.parentCommentId,
          "replies"
        ]
      });

      const previousReplies = await queryClient.getQueryData([
        "post",
        newReplyData.postId,
        "comment",
        newReplyData.parentCommentId,
        "replies"
      ]);

      await queryClient.cancelQueries({
        queryKey: ["posts", newReplyData.postId, "comments"]
      });

      const previouseComments = await queryClient.getQueryData([
        "post",
        newReplyData.postId,
        "comments"
      ]);

      queryClient.setQueryData(
        [
          "post",
          newReplyData.postId,
          "comment",
          newReplyData.parentCommentId,
          "replies"
        ],
        (data: InfiniteData<InfiniteRepliesType, unknown>) => ({
          ...data,
          pages: [
            {
              replyDocs: data.pages[0].replyDocs,
              data: [newReplyData, ...data.pages[0].data]
            },
            ...data.pages.slice(1)
          ]
        })
      );

      queryClient.setQueryData(
        ["post", newReplyData.postId, "comments"],
        (data: InfiniteData<InfiniteCommentsType, unknown>) => ({
          ...data,
          pages: data.pages.map((page: InfiniteCommentsType) => ({
            ...page,
            data: page.data.map((comment: ICommentData) =>
              comment.commentId === newReplyData?.parentCommentId
                ? { ...comment, replyCount: comment.replyCount + 1 }
                : comment
            )
          }))
        })
      );

      return { previousReplies, previouseComments };
    },
    onSuccess: () => {
      sweetToast("답글 작성이 완료되었습니다.", "success");
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(
          ["post", data.postId, "comment", data.parentCommentId, "replies"],
          ctx.previousReplies
        );

        queryClient.setQueryData(
          ["post", data.postId, "comments"],
          ctx.previouseComments
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
        if (isMobile) {
          history.back();
        }
      } else if (error.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다!", "warning");
        // 댓글 삭제
        queryClient.setQueryData(
          ["posts", data.postId, "comments"],
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
