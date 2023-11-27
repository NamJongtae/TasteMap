import { useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchFirstpageFollowers,
  fetchPagingFollowers
} from "../../../api/firebase/profileAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IFollowData } from "../../../api/apiType";

interface InfiniteFollowersType {
  followerDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IFollowData[];
}

export const useFollowersInfiniteQuery = (
  uid: string,
  pagePerData: number,
  isFollower: boolean
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
    queryKey: ["profile", "followers"],
    queryFn: async ({ pageParam }) => {
      const result = pageParam
        ? await fetchPagingFollowers(
            uid,
            pageParam as QueryDocumentSnapshot<DocumentData, DocumentData>,
            pagePerData
          )
        : await fetchFirstpageFollowers(uid, pagePerData);

      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.followerDocs.docs[lastpage.followerDocs.docs.length - 1]
        : undefined;
    },
    enabled: isFollower
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
