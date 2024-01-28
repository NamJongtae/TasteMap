import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProfilePosts } from "../../../api/firebase/profileAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IPostData } from "../../../types/apiTypes";
import { getProfilePostsQuerykey } from "../../../querykey/querykey";
import { TPost } from "../../../types/types";

type FetchDataResponse = {
  postDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

export const useProfilePostInfiniteQuery = (
  uid: string,
  pagePerData: number,
  postType: TPost
) => {
  const PROFILE_POSTS_QUERYKEY = getProfilePostsQuerykey(uid);
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
    queryKey: PROFILE_POSTS_QUERYKEY,
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
