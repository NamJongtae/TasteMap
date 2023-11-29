import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { removeComment } from "../../../../api/firebase/commentAPI";
import { ICommentData, IPostData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { commentSlice } from "../../../../slice/commentSlice";
import { useParams } from 'react-router-dom';

type InfiniteCommentsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[]; // 여기에 실제 데이터 타입을 지정해야 합니다.
};
type InfinitePostsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useCommentRemoveMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (
      commentRemoveData: Pick<ICommentData, "postId" | "commentId">
    ) => removeComment(commentRemoveData),
    onMutate: async (commentRemoveData) => {
      await queryClient.cancelQueries({ queryKey: ["post", commentRemoveData.postId, "comments"] });

      const previousComments:
        | InfiniteData<InfiniteCommentsType, unknown>
        | undefined = await queryClient.getQueryData(["post", commentRemoveData.postId, "comments"]);

      const newPages = previousComments?.pages.map(
        (page: InfiniteCommentsType) => {
          return {
            ...page,
            data: page.data.filter(
              (comment: ICommentData) =>
                comment.commentId !== commentRemoveData.commentId
            )
          };
        }
      );
      queryClient.setQueryData(
        ["post", commentRemoveData.postId, "comments"],
        (data: InfiniteData<InfiniteCommentsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousComments };
    },
    onSuccess: () => {
      sweetToast("댓글 삭제가 완료되었습니다.", "success");
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
        sweetToast("이미 삭제된 댓글입니다.", "warning");
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
