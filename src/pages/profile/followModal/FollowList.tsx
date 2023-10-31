import React, { useEffect } from "react";
import { FollowUl, InfinityScrollTarget } from "./followModal.styles";
import FollowItem from "./FollowItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import NoData from "../../../compoent/commons/noData/NoData";
import ScrollLoading from "../../../compoent/commons/loading/ScrollLoading";
import { thunkFetchFirstPageFollowerData, thunkFetchFirstPageFollowingData, thunkFetchPagingFollowerData, thunkFetchPagingFollowingData } from '../../../slice/userSlice';

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
  const follows = useSelector((state: RootState) => state.user.follows);
  const page = useSelector((state: RootState) => state.user.followsPage);
  const hasMore = useSelector((state: RootState) => state.user.followsHasMore);
  const pagePerData = useSelector(
    (state: RootState) => state.user.followsPagePerData
  );
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();

  // 무한 스크롤 follower/following 데이터 추가 시 로딩
  const loadMoreFollowsLoading = useSelector(
    (state: RootState) => state.user.loadMoreFollowsLoading
  );
  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();

  useEffect(() => {
    if (isFollower) {
      dispatch(
        thunkFetchFirstPageFollowerData({
          uid: uid || myInfo.uid || "",
          pagePerData
        })
      );
    } else {
      dispatch(
        thunkFetchFirstPageFollowingData({
          uid: uid || myInfo.uid || "",
          pagePerData
        })
      );
    }
  }, []);

  useEffect(() => {
    if (isFollower) {
      if (follows.length > 0 && inview && hasMore) {
        dispatch(
          thunkFetchPagingFollowerData({
            uid: uid || myInfo.uid || "",
            page,
            pagePerData
          })
        );
      }
    } else {
      if (follows.length > 0 && inview && hasMore) {
        dispatch(
          thunkFetchPagingFollowingData({
            uid: uid || myInfo.uid || "",
            page,
            pagePerData
          })
        );
      }
    }
  }, [inview]);

  useEffect(() => {
    if (followListRef.current) {
      followListRef.current.focus();
    }
  }, [followListRef.current]);

  return (
    <>
      {loadMoreFollowsLoading && follows.length === 0 ? (
        <ScrollLoading />
      ) : (
        <>
          {follows.length > 0 ? (
            <>
              <FollowUl ref={followListRef} tabIndex={0}>
                {follows.map((item, idx) => {
                  return (
                    <FollowItem
                      key={item.uid}
                      data={item}
                      idx={idx}
                      isLastItem={idx === follows.length - 1}
                      isFollower={isFollower}
                      closeBtnRef={closeBtnRef}
                      firstItemLinkRef={firstItemLinkRef}
                      lastItemFollowBtnRef={lastItemFollowBtnRef}
                    />
                  );
                })}
                <InfinityScrollTarget ref={ref}></InfinityScrollTarget>
                {loadMoreFollowsLoading && <ScrollLoading />}
              </FollowUl>
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  );
}
