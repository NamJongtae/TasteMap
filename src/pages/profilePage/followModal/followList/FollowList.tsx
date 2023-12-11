import React from "react";
import { FollowUl, InfinityScrollTarget } from "../followModal.styles";
import FollowItem from "./followItem/FollowItem";
import NoData from "../../../../component/commons/noData/NoData";
import ScrollLoading from "../../../../component/commons/loading/ScrollLoading";
import { useFollowListInfiniteScroll } from "../../../../hook/logic/profile/followModal/useFollowListInfiniteScroll";
import { useFocusing } from "../../../../hook/useFocusing";
import { IMyProfileData } from "../../../../api/apiType";

interface IProps {
  myProfile: IMyProfileData;
  followModalType: "FOLLOWER" | "FOLLOWING";
  followListRef: React.RefObject<HTMLUListElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
}

export default function FollowList({
  myProfile,
  followModalType,
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
  } = useFollowListInfiniteScroll({ followModalType });

  // tab focus 최적화를 위한 초기 focus 설정
  useFocusing(followListRef);

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
              myProfile={myProfile}
              key={item.uid}
              data={item}
              idx={idx}
              isLastItem={idx === data!.length - 1}
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
