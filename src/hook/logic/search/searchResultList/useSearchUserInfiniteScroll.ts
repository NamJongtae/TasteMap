import { useInView } from "react-intersection-observer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { useSearchUserInfiniteQuery } from "../../../query/search/useSearchUserInfiniteQuery";

export const useSearchUserInfiniteScroll = () => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );

  const pagePerData = useSelector(
    (state: RootState) => state.search.pagePerData
  );

  const [infiniteScrollRef, inview] = useInView();

  const queryClient = useQueryClient();

  const {
    data: searchResult,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    isRefetching,
    refetch,
    isError,
    error
  } = useSearchUserInfiniteQuery(searchKeyword, pagePerData);

  useEffect(() => {
    if (isError) {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.log(error);
    }
  }, [isError]);

  useEffect(() => {
    if (searchKeyword) {
      // 기존 검색 데이터 초기화
      queryClient.removeQueries({ queryKey: ["search"] });
      refetch();
    }
  }, [searchKeyword]);

  useEffect(() => {
    if (
      searchKeyword &&
      ((searchResult?.length || 0) >= pagePerData) &&
      inview &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [inview, hasNextPage]);

  const isNoSearchResult = searchResult?.length === 0;

  return {
    searchKeyword,
    infiniteScrollRef,
    searchResult,
    isPending,
    isFetchingNextPage,
    isRefetching,
    isNoSearchResult
  };
};
