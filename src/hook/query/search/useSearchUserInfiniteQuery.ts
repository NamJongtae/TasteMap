import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserSearch } from "../../../api/firebase/searchAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IUserProfileData } from "../../../types/apiTypes";
import { SEARCH_QUERYKEY } from "../../../querykey/querykey";

interface InfiniteSearchType {
  userDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IUserProfileData[];
}

export const useSearchUserInfiniteQuery = (
  keyword: string,
  pagePerData: number
) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    refetch,
    isError,
    error
  } = useInfiniteQuery<InfiniteSearchType>({
    queryKey: SEARCH_QUERYKEY,
    queryFn: async ({ pageParam }) => {
      const result = await fetchUserSearch(
        keyword,
        pageParam as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
        pagePerData
      );

      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.userDocs.docs[lastpage.userDocs.docs.length - 1]
        : undefined;
    },
    enabled: !!keyword
  });

  return {
    data: data?.pages.map((v) => v.data).flat(),
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    refetch,
    isError,
    error
  };
};
