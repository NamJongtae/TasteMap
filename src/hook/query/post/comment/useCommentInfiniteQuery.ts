import { useInfiniteQuery } from "@tanstack/react-query";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { ICommentData } from "../../../../api/apiType";
import { fetchComments } from "../../../../api/firebase/commentAPI";

type FetchDataResponse = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};

export const useCommentInfiniteQuery = (
  postId: string,
  pagePerData: number,
  isReply: boolean
) => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isError,
    isRefetchError,
    error
  } = useInfiniteQuery<FetchDataResponse>({
    queryKey: ["post", postId,"comments"],
    queryFn: async ({ pageParam }) =>
      await fetchComments(
        pageParam as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
        postId,
        pagePerData
      ),
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.commentDocs.docs[lastpage.commentDocs.docs.length - 1]
        : undefined;
    },
    retry: 1,
    enabled: !isReply
  });

  return {
    data: data?.pages.map((page) => page.data).flat(),
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isError,
    isRefetchError,
    error
  };
};
