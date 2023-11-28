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
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (replyData: IReplyData) => leaveReply(replyData),
    onMutate: async (newReplyData) => {
      await queryClient.cancelQueries({ queryKey: ["replies"] });

      const previousReplies = await queryClient.getQueryData(["replies"]);

      queryClient.setQueryData(
        ["replies"],
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

      return { previousReplies };
    },
    onSuccess: () => {
      sweetToast("답글 작성이 완료되었습니다.", "success");
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(["replies"], ctx.previousReplies);
      }

      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          ["posts", postType],
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
          ["comments"],
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["replies"],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};