import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeedPosts } from "../../../api/firebase/postAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IPostData } from "../../../api/apiType";

type FetchDataResponse = {
  postDocs: QuerySnapshot<DocumentData, DocumentData> | null;
  data: IPostData[];
};

export const useFeedPostInfiniteQuery = (
  pagePerData: number,
  followingList: string[],
  postType: "HOME" | "FEED" | "PROFILE"
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
    queryKey: ["posts", "FEED"],
    queryFn: async ({ pageParam }) =>
      await fetchFeedPosts(
        pageParam as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
        pagePerData,
        followingList
      ),
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.postDocs?.docs[lastpage.postDocs.docs.length - 1]
        : undefined;
    },
    enabled: postType === "FEED"
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
