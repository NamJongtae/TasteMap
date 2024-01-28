import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { removePostLike } from "../../../api/firebase/postAPI";
import { IPostData, IMyProfileData } from "../../../types/apiTypes";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import {
  My_PROFILE_QUERYKEY,
  getPostsQuerykey
} from "../../../querykey/querykey";
import { TPost } from "../../../types/types";

type InfinityPostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useRemoveLikeMutation = (
  postType: TPost
) => {
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const POSTS_QUERYKEY = getPostsQuerykey(postType, uid);
  const { mutate } = useMutation({
    mutationFn: (postId: string) => removePostLike(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: My_PROFILE_QUERYKEY }),
        await queryClient.cancelQueries({
          queryKey: POSTS_QUERYKEY
        });

      const previousProfile = queryClient.getQueryData(My_PROFILE_QUERYKEY);

      queryClient.setQueryData(
        My_PROFILE_QUERYKEY,
        (myProfile: IMyProfileData) => ({
          ...myProfile,
          likeList: myProfile.likeList.filter((like) => like !== postId)
        })
      );

      const previousPosts:
        | InfiniteData<InfinityPostsType, unknown>
        | undefined = queryClient.getQueryData(POSTS_QUERYKEY);

      const newPages = previousPosts?.pages.map((page: InfinityPostsType) => {
        return {
          ...page,
          data: page.data.map((post: IPostData) =>
            post.id === postId
              ? { ...post, likeCount: post.likeCount - 1 }
              : post
          )
        };
      });

      queryClient.setQueryData(
        POSTS_QUERYKEY,
        (data: InfiniteData<InfinityPostsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousProfile, previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(My_PROFILE_QUERYKEY, ctx.previousProfile);
        queryClient.setQueryData(POSTS_QUERYKEY, ctx.previousPosts);
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: My_PROFILE_QUERYKEY });
      queryClient.invalidateQueries({
        queryKey: POSTS_QUERYKEY,
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
