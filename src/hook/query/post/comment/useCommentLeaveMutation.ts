import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { leaveComment } from "../../../../api/firebase/commentAPI";
import { ICommentData, IPostData } from "../../../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { commentSlice } from "../../../../slice/commentSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";

type InfiniteCommentsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};

type InfinitePostsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useCommentLeaveMutation = (postType: "HOME" | "FEED" | "PROFILE") => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (commentData: ICommentData) => leaveComment(commentData),
    onMutate: async (newCommentData) => {
      await queryClient.cancelQueries({ queryKey: ["comments"] });

      const previousComments = await queryClient.getQueryData(["comments"]);

      queryClient.setQueryData(
        ["comments"],
        (data: InfiniteData<InfiniteCommentsType, unknown>) => ({
          ...data,
          pages: [
            {
              commentDocs: data.pages[0].commentDocs,
              data: [newCommentData, ...data.pages[0].data]
            },
            ...data.pages.slice(1)
          ]
        })
      );

      return { previousComments };
    },
    onSuccess: () => {
      sweetToast("댓글 작성이 완료되었습니다.", "success");
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(["comments"], ctx.previousComments);
      }

      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          ["posts", postType] ,
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
        queryKey: ["comments"],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
