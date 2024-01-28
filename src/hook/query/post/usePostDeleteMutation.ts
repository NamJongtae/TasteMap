import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { deletePost } from "../../../api/firebase/postAPI";
import { IPostData } from "../../../types/apiTypes";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useParams } from "react-router-dom";
import { getPostsQuerykey } from "../../../querykey/querykey";
import { TPost } from "../../../types/types";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const usePostDeleteMutation = (
  postType: TPost
) => {
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const POSTS_QUERYKEY = getPostsQuerykey(postType, uid);
  const { mutate, isPending } = useMutation({
    mutationFn: (postData: Pick<IPostData, "id" | "imgName">) =>
      deletePost(postData),
    onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: POSTS_QUERYKEY
      });
      const previousPosts:
        | InfiniteData<InfinitePostsType, unknown>
        | undefined = queryClient.getQueryData(POSTS_QUERYKEY);

      const newPages = previousPosts?.pages.map((page: InfinitePostsType) => {
        return {
          ...page,
          data: page.data.filter((post: IPostData) => post.id !== data.id)
        };
      });

      queryClient.setQueryData(
        POSTS_QUERYKEY,
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );
      sweetToast("삭제가 완료되었습니다", "success");
      return { previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(POSTS_QUERYKEY, ctx.previousPosts);
      }

      if (error.message === "게시물이 존재하지 않습니다.") {
        sweetToast("이미 삭제된 게시물입니다!", "warning");
        // 게시물 삭제
        queryClient.setQueryData(
          POSTS_QUERYKEY,
          (postsData: InfiniteData<InfinitePostsType, unknown>) => ({
            ...postsData,
            pages: postsData.pages.map((page: InfinitePostsType) => ({
              ...page,
              data: page.data.filter((post: IPostData) => post.id !== data.id)
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
        queryKey: POSTS_QUERYKEY,
        refetchType: "inactive"
      });
    }
  });

  return { mutate, isPending };
};
