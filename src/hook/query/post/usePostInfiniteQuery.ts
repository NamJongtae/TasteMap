import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../api/firebase/postAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IPostData } from "../../../types/apiTypes";
import { HOME_POSTS_QUERYKEY } from "../../../querykey/querykey";
import { TPost } from "../../../types/types";

type FetchDataResponse = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const usePostInfiniteQuery = (
  pagePerData: number,
  postType: TPost
) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching
  } = useInfiniteQuery<FetchDataResponse>({
    queryKey: HOME_POSTS_QUERYKEY,
    queryFn: async ({ pageParam }) =>
      await fetchPosts(
        pageParam as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
        pagePerData
      ),
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.postDocs.docs[lastpage.postDocs.docs.length - 1]
        : undefined;
    },
    enabled: postType === "HOME"
  });

  return {
    data: data?.pages.map((v) => v.data).flat(),
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching
  };
};
