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
import { reportReply } from "../../../../api/firebase/replyAPI";
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
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
    ) => reportReply(replyReportData),
    onMutate: async (replyReportData) => {
      const REPLIES_QUERYKEY = getRepliesQuerykey(
        replyReportData.postId,
        replyReportData.parentCommentId
      );
      const COMMENTS_QUERYKEY = getCommentsQuerykey(replyReportData.postId);

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
        REPLIES_QUERYKEY,
        (data: InfiniteData<InfiniteRepliesType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      if (replyReportData.reportCount >= 4) {
        await queryClient.cancelQueries({
          queryKey: COMMENTS_QUERYKEY
        });

        const previouseComments = queryClient.getQueryData(COMMENTS_QUERYKEY);

        queryClient.setQueryData(
          COMMENTS_QUERYKEY,
          (data: InfiniteData<InfiniteCommentsType, unknown>) => ({
            ...data,
            pages: data.pages.map((page: InfiniteCommentsType) => ({
              ...page,
              data: page.data.map((comment: ICommentData) =>
                comment.commentId === replyReportData?.parentCommentId
                  ? { ...comment, replyCount: comment.replyCount - 1 }
                  : comment
              )
            }))
          })
        );

        return { previousReplies, previouseComments };
      }

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
      const REPLIES_QUERYKEY = getRepliesQuerykey(
        data.postId,
        data.parentCommentId
      );
      const COMMENTS_QUERYKEY = getCommentsQuerykey(data.postId);
      const POSTS_QUERYKEY = getPostsQuerykey(postType, uid);

      if (ctx) {
        queryClient.setQueryData(REPLIES_QUERYKEY, ctx.previousReplies);
        queryClient.setQueryData(COMMENTS_QUERYKEY, ctx.previouseComments);
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
        if (isMobile) {
          history.back();
        }
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
      } else if (error.message === "답글이 존재하지 않습니다.") {
        sweetToast("이미 삭제된 답글입니다.", "warning");
        // 답글 삭제
        queryClient.setQueryData(
          REPLIES_QUERYKEY,
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
