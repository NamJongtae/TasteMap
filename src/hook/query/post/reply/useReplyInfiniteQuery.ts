import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchReplies } from "../../../../api/firebase/replyAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { IReplyData } from "../../../../api/apiType";
import { getRepliesQuerykey } from "../../../../querykey/querykey";

interface InfiniteReplyType {
  replyDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IReplyData[];
}

export const useReplyInfiniteQuery = (
  postId: string,
  parentCommentId: string,
  pagePerData: number,
  isReply: boolean
) => {
  const REPLIES_QUERYKEY = getRepliesQuerykey(postId, parentCommentId)
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
  } = useInfiniteQuery<InfiniteReplyType>({
    queryKey: REPLIES_QUERYKEY,
    queryFn: async ({ pageParam }) => {
      const result = await fetchReplies(
        pageParam as QueryDocumentSnapshot<DocumentData, DocumentData> | null,
        postId,
        parentCommentId,
        pagePerData
      );

      return result;
    },
    initialPageParam: null,
    getNextPageParam: (lastpage) => {
      return lastpage.data.length > 0
        ? lastpage.replyDocs.docs[lastpage.replyDocs.docs.length - 1]
        : undefined;
    },
    retry: 1,
    enabled: isReply,
    gcTime: 1000 * 60 * 5 * (isReply ? 1 : 0)
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
