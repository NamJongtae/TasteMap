import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useSearchUserInfiniteQuery } from "../../query/search/useSearchUserInfiniteQuery";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { useEffect } from "react";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useQueryClient } from "@tanstack/react-query";

export const useSearch = () => {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
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
  } = useSearchUserInfiniteQuery(searchKeyword, 20);

  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const queryClient = useQueryClient();
  const { data: myProfile, isPending: myProfileIsPending } = useMyProfileQuery(
    myInfo.uid
  );

  useEffect(() => {
    if (searchKeyword) {
      // 기존 검색 데이터 초기화
      queryClient.removeQueries({ queryKey: ["search"] });
      refetch();
    }
  }, [searchKeyword]);
  if (isError) {
    sweetToast(
      "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
      "warning"
    );
    console.log(error);
  }

  return {
    myProfile,
    myProfileIsPending,
    isError,
    searchResult,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    isRefetching
  };
};
