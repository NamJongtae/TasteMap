import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { addPostLike } from "../../../api/firebase/postAPI";
import { IPostData, IMyProfileData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

type InfinityPostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useAddLikeMutation = (postType: "HOME" | "FEED" | "PROFILE") => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (postId: string) => addPostLike(postId),
    onMutate: async (postId) => {
      Promise.all([
        queryClient.cancelQueries({ queryKey: ["profile", "my"] }),
        queryClient.cancelQueries({
          queryKey: ["posts", postType]
        })
      ]);

      const previousProfile = await queryClient.getQueryData(["profile", "my"]);

      queryClient.setQueryData(
        ["profile", "my"],
        (myProfile: IMyProfileData) => ({
          ...myProfile,
          likeList: [...myProfile.likeList, postId]
        })
      );

      const previousPosts:
        | InfiniteData<InfinityPostsType, unknown>
        | undefined = await queryClient.getQueryData(["posts", postType]);

      const newPages = previousPosts?.pages.map((page: InfinityPostsType) => {
        return {
          ...page,
          data: page.data.map((post: IPostData) =>
            post.id === postId
              ? { ...post, likeCount: post.likeCount + 1 }
              : post
          )
        };
      });

      queryClient.setQueryData(
        ["posts", postType],
        (data: InfiniteData<InfinityPostsType, unknown>) => ({
          ...data,
          pages: newPages
        })
      );

      return { previousProfile, previousPosts };
    },
    onError: (error, data, ctx) => {
      if (ctx) {
        queryClient.setQueryData(["profile", "my"], ctx.previousProfile);
        queryClient.setQueryData(["posts", postType], ctx.previousPosts);
      }
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", "my"] });
      queryClient.invalidateQueries({
        queryKey: ["posts", postType],
        refetchType: "inactive"
      });
    }
  });

  return { mutate };
};
