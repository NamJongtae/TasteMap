import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProfilePosts } from "../../../api/firebase/profileAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IPostData } from "../../../api/apiType";

type FetchDataResponse = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useProfilePostInfiniteQuery = (
  uid: string,
  pagePerData: number,
  postType: "HOME" | "FEED" | "PROFILE"
) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    refetch,
    isRefetching
  } = useInfiniteQuery<FetchDataResponse>({
    queryKey: ["posts", "PROFILE", uid],
    queryFn: async ({ pageParam }) =>
      await fetchProfilePosts(
        uid,
        pagePerData,
        pageParam as QueryDocumentSnapshot<DocumentData, DocumentData> | null
      ),
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.postDocs.docs[lastpage.postDocs.docs.length - 1]
        : undefined;
    },
    enabled: postType === "PROFILE" && !!uid
  });

  return {
    data: data?.pages.map((v) => v.data).flat(),
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    refetch,
    isRefetching
  };
};
