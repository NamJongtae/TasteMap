import {
  InfiniteData,
  UseMutateFunction,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { fetchPost } from "../../../api/firebase/postAPI";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { IPostData } from "../../../api/apiType";
import { useParams } from "react-router-dom";
import { getPostsQuerykey } from "../../../querykey/querykey";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useFetchCommentCountMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
): {
  mutate: UseMutateFunction<IPostData | undefined, Error, string, unknown>;
} => {
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const POSTS_QUERYKEY = getPostsQuerykey(postType, uid);
  const { mutate } = useMutation({
    mutationFn: (postId: string) => fetchPost(postId),
    onSuccess: (result) => {
      queryClient.setQueryData(
        POSTS_QUERYKEY,
        (data: InfiniteData<InfinitePostsType, unknown>) => ({
          ...data,
          pages: data.pages.map((page: InfinitePostsType) => ({
            ...page,
            data: page.data.map((post: IPostData) =>
              post.id === result?.id
                ? { ...post, commentCount: result?.commentCount }
                : post
            )
          }))
        })
      );
    }
  });

  return { mutate };
};
