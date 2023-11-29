import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { ICommentData, IPostData, IReplyData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { commentSlice } from "../../../../slice/commentSlice";
import { AppDispatch } from "../../../../store/store";
import { removeReply } from "../../../../api/firebase/replyAPI";
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

export const useReplyReportMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (
      replyReportData: Pick<
        IReplyData,
        "replyId" | "parentCommentId" | "reportCount" | "postId"
      >
    ) => removeReply(replyReportData),
    onMutate: async (replyReportData) => {
      await queryClient.cancelQueries({
        queryKey: [
          "post",
          replyReportData.postId,
          "comment",
          replyReportData.parentCommentId,
          "replies"
        ]
      });
      const previousReplies:
        | InfiniteData<InfiniteRepliesType, unknown>
        | undefined = await queryClient.getQueryData([
        "post",
        replyReportData.postId,
        "comment",
        replyReportData.parentCommentId,
        "replies"
      ]);

      const newPages = previousReplies?.pages.map(
        (page: InfiniteRepliesType) => {
          return {
            ...page,
            data: page.data.map((reply: IReplyData) =>
              replyReportData.replyId === replyReportData.replyId
                ? {
                    ...reply,
                    reportCount: reply.reportCount + 1,
                    isBlock: reply.reportCount >= 4,
                    reportUidList: [
                      ...reply.reportUidList,
                      getAuth().currentUser?.uid
                    ]
                  }
                : reply
            )
          };
        }
      );
      queryClient.setQueryData(
        [
          "post",
          replyReportData.postId,
          "comment",
          replyReportData.parentCommentId,
          "replies"
        ],
        (data: InfiniteData<InfiniteRepliesType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousReplies };
    },
    onSuccess: (replyReportData: any) => {
      if (replyReportData.reportCount >= 4) {
        sweetToast("답글 신고가 누적되어 블라인드 처리되었습니다.", "info");
      } else {
        sweetToast("답글 신고가 완료되었습니다.", "success");
      }
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
      } else if (error.message === "답글이 존재하지 않습니다.") {
        sweetToast("이미 삭제된 답글입니다.", "warning");
        // 답글 삭제
        queryClient.setQueryData(
          ["post", data.postId, "comment", data.parentCommentId, "replies"],
          (repliesData: InfiniteData<InfiniteRepliesType, unknown>) => ({
            ...repliesData,
            pages: repliesData.pages.map((page: InfiniteRepliesType) => ({
              ...page,
              data: page.data.filter(
                (reply: IReplyData) =>
                  reply.parentCommentId !== data.parentCommentId
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
