import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchFirstpageFollowing,
  fetchPagingFollowing
} from "../../../api/firebase/profileAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IFollowData } from "../../../api/apiType";
import { FOLLOWING_QUERYKEY } from "../../../querykey/querykey";

interface InfiniteFollowersType {
  followingDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IFollowData[];
}

export const useFollowingInfiniteQuery = (
  uid: string,
  pagePerData: number,
) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    isError,
    error
  } = useInfiniteQuery<InfiniteFollowersType>({
    queryKey: FOLLOWING_QUERYKEY,
    queryFn: async ({ pageParam }) => {
      const result = pageParam
        ? await fetchPagingFollowing(
            uid,
            pageParam as QueryDocumentSnapshot<DocumentData, DocumentData>,
            pagePerData
          )
        : await fetchFirstpageFollowing(uid, pagePerData);

      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.followingDocs.docs[lastpage.followingDocs.docs.length - 1]
        : undefined;
    },
  });

  return {
    data: data?.pages.map((v) => v.data).flat(),
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    isError,
    error
  };
};
