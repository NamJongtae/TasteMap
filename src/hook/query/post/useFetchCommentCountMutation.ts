import {
  InfiniteData,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";
import { fetchPost } from "../../../api/firebase/postAPI";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { IPostData } from "../../../api/apiType";
import { useParams } from "react-router-dom";

type InfinitePostsType = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useFetchCommentCountMutation = (
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const { uid } = useParams();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (postId: string) => fetchPost(postId),
    onSuccess: (result) => {
      queryClient.setQueryData(
        postType === "PROFILE" ? ["posts", postType, uid] : ["posts", postType],
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
