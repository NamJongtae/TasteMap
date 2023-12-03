import React from "react";
import { FollowUl, InfinityScrollTarget } from "./followModal.styles";
import FollowItem from "./FollowItem";
import NoData from "../../../component/commons/noData/NoData";
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
import { useFollowList } from "../../../hook/logic/followModal/useFollowList";

interface IProps {
  isFollower: boolean;
  followListRef: React.RefObject<HTMLUListElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
}

export default function FollowList({
  isFollower,
  followListRef,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef
}: IProps) {
  const {
    data,
    infiniteScrollRef,
    loadDataLoading,
    loadMoreDataLoading,
    isNoData,
    isError
  } = useFollowList({ isFollower, followListRef });

  if (isError) {
    return null;
  }

  if (loadDataLoading) {
    return <ScrollLoading />;
  }

  if (isNoData) {
    return <NoData />;
  }

  return (
    <>
      <FollowUl ref={followListRef} tabIndex={0}>
        {data!.map((item, idx) => {
          return (
            <FollowItem
              key={item.uid}
              data={item}
              idx={idx}
              isLastItem={idx === data!.length - 1}
              isFollower={isFollower}
              closeBtnRef={closeBtnRef}
              firstItemLinkRef={firstItemLinkRef}
              lastItemFollowBtnRef={lastItemFollowBtnRef}
            />
          );
        })}
        <InfinityScrollTarget ref={infiniteScrollRef}></InfinityScrollTarget>
        {loadMoreDataLoading && <ScrollLoading />}
      </FollowUl>
    </>
  );
}
