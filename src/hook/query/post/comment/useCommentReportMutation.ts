import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { reportComment } from "../../../../api/firebase/commentAPI";
import { ICommentData, IPostData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { commentSlice } from "../../../../slice/commentSlice";
import { AppDispatch } from "../../../../store/store";
import { useParams } from "react-router-dom";

type InfiniteCommentsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};

type InfinitePostsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useCommentReportMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (
      commentReportData: Pick<
        ICommentData,
        "postId" | "commentId" | "reportCount"
      >
    ) => reportComment(commentReportData),
    onMutate: async (commentReportData) => {
      await queryClient.cancelQueries({
        queryKey: ["post", commentReportData.postId, "comments"]
      });
      const previousComments:
        | InfiniteData<InfiniteCommentsType, unknown>
        | undefined = await queryClient.getQueryData([
        "post",
        commentReportData.postId,
        "comments"
      ]);

      const newPages = previousComments?.pages.map(
        (page: InfiniteCommentsType) => {
          return {
            ...page,
            data: page.data.map((comment: ICommentData) =>
              comment.commentId === commentReportData.commentId
                ? {
                    ...comment,
                    reportCount: comment.replyCount + 1,
                    isBlock: comment.reportCount >= 4,
                    reportUidList: [
                      ...comment.reportUidList,
                      getAuth().currentUser?.uid
                    ]
                  }
                : comment
            )
          };
        }
      );
      queryClient.setQueryData(
        ["post", commentReportData.postId, "comments"],
        (data: InfiniteData<InfiniteCommentsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousComments };
    },
    onSuccess: (commentReportData: any) => {
      if (commentReportData.reportCount >= 4) {
        sweetToast("댓글 신고가 누적되어 블라인드 처리되었습니다.", "info");
      } else {
        sweetToast("댓글 신고가 완료되었습니다.", "success");
      }
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(
          ["post", data.postId, "comments"],
          ctx.previousComments
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
        queryKey: ["post", data?.postId, "comments"],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
