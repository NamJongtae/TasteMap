import React, { useEffect } from "react";
import { FollowUl, InfinityScrollTarget } from "./followModal.styles";
import FollowItem from "./FollowItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import NoData from "../../../component/commons/noData/NoData";
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
import { useFollowingInfiniteQuery } from "../../../hook/query/profile/useFollowingInfiniteQuery";
import { useFollowersInfiniteQuery } from "../../../hook/query/profile/useFollowersInfiniteQuery";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";

interface IProps {
  isFollower: boolean;
  followListRef: React.RefObject<HTMLUListElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
  closeFollowersModalHandler: () => void;
  closeFollowingModalHandler: () => void;
}
export default function FollowList({
  isFollower,
  followListRef,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef,
  closeFollowersModalHandler,
  closeFollowingModalHandler
}: IProps) {
  const pagePerData = useSelector(
    (state: RootState) => state.user.followsPagePerData
  );
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const [ref, inview] = useInView();

  const {
    data: followers,
    hasNextPage: followersHasNextPage,
    fetchNextPage: followersFetchNextPage,
    isFetching: followersIsFetching,
    isFetchingNextPage: followersIsFetchingNextPage,
    isError: followersIsError,
    error: followersError
  } = useFollowersInfiniteQuery(uid || myInfo.uid, pagePerData, isFollower);

  const {
    data: following,
    hasNextPage: followingHasNextPage,
    fetchNextPage: followingFetchNextPage,
    isFetching: followingIsFetching,
    isFetchingNextPage: followingIsFetchingNextPage,
    isError: followingIsError,
    error: followingError
  } = useFollowingInfiniteQuery(uid || myInfo.uid, pagePerData, isFollower);

  useEffect(() => {
    if (isFollower) {
      if (inview && followersHasNextPage) {
        followersFetchNextPage();
      }
    } else {
      if (inview && followingHasNextPage) {
        followingFetchNextPage();
      }
    }
  }, [isFollower, inview, followersHasNextPage]);

  useEffect(() => {
    if (followersError || followingError) {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(followersError || followingError);
    }
  }, [followersIsError, followingIsError]);

  useEffect(() => {
    if (followListRef.current) {
      followListRef.current.focus();
    }
  }, [followListRef.current]);

  const loadDataLoading = isFollower
    ? !followersIsFetchingNextPage && followersIsFetching
    : !followingIsFetchingNextPage && followingIsFetching;
  const loadMoreDataLoading = isFollower
    ? followersIsFetchingNextPage
    : followingIsFetchingNextPage;

  const isError = isFollower ? followersIsError : followingIsError;

  const isNoData =
    isError || isFollower
      ? !followers && !followersIsFetching
      : !following && !followersIsFetching;

  return (
    <>
      {isNoData ? (
        <NoData />
      ) : (
        <>
          {loadDataLoading ? (
            <ScrollLoading />
          ) : (
            <>
              <FollowUl ref={followListRef} tabIndex={0}>
                {(isFollower ? followers : following)!.map((item, idx) => {
                  return (
                    <FollowItem
                      key={item.uid}
                      data={item}
                      idx={idx}
                      isLastItem={
                        idx ===
                        (isFollower
                          ? followers!.length - 1
                          : following!.length - 1)
                      }
                      isFollower={isFollower}
                      closeBtnRef={closeBtnRef}
                      firstItemLinkRef={firstItemLinkRef}
                      lastItemFollowBtnRef={lastItemFollowBtnRef}
                      closeFollowersModalHandler={closeFollowersModalHandler}
                      closeFollowingModalHandler={closeFollowingModalHandler}
                    />
                  );
                })}
                <InfinityScrollTarget ref={ref}></InfinityScrollTarget>
                {loadMoreDataLoading && <ScrollLoading />}
              </FollowUl>
            </>
          )}
        </>
      )}
    </>
  );
}
