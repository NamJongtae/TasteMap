import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../store/store";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useFollowersInfiniteQuery } from "../../../query/profile/useFollowersInfiniteQuery";
import { useFollowingInfiniteQuery } from "../../../query/profile/useFollowingInfiniteQuery";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";

interface IProps {
  followModalType: "FOLLOWER" | "FOLLOWING";
}

export const useFollowListInfiniteScroll = ({ followModalType }: IProps) => {
  const pagePerData = useSelector(
    (state: RootState) => state.user.followsPagePerData
  );
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const [infiniteScrollRef, inview] = useInView();

  const followQuery = {
    FOLLOWER: () =>
      useFollowersInfiniteQuery(
        uid || myInfo.uid,
        pagePerData,
      ),
    FOLLOWING: () =>
      useFollowingInfiniteQuery(uid || myInfo.uid, pagePerData)
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    error
  } = followQuery[followModalType]();

  useEffect(() => {
    if (inview && hasNextPage) {
      fetchNextPage();
    }
  }, [inview, hasNextPage]);

  useEffect(() => {
    if (isError) {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
    }
  }, [isError]);

  const loadDataLoading = !isFetchingNextPage && isFetching;

  const loadMoreDataLoading =
    isFetchingNextPage && (data?.length || 0) >= pagePerData;

  const isNoData = isError || (data?.length || 0) === 0;

  return {
    data,
    infiniteScrollRef,
    loadDataLoading,
    loadMoreDataLoading,
    isNoData,
    isError
  };
};
