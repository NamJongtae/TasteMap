import React, { useEffect, useState } from "react";
import { FollowUl, InfinityScrollTarget } from "./followModal.styles";
import FollowItem from "./FollowItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  thunkFetchFirstPageFollowerData,
  thunkFetchFirstPageFollowingData,
  thunkFetchPagingFollowerData,
  thunkFetchPagingFollowingData
} from "../../../slice/profileSlice";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import NoData from "../../../compoent/commons/noData/NoData";
import ScrollLoading from "../../../compoent/commons/loading/ScrollLoading";

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
  const followListData = useSelector(
    (state: RootState) => state.profile.followListData
  );
  const page = useSelector((state: RootState) => state.profile.followPage);
  const hasMore = useSelector(
    (state: RootState) => state.profile.followHasMore
  );
  const pagePerData = useSelector(
    (state: RootState) => state.profile.followPagePerData
  );
  const { uid } = useParams();
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();

  // 무한 스크롤 follower/following 데이터 추가 시 로딩
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();

  useEffect(() => {
    if (isFollower) {
      (async () => {
        setIsScrollLoading(true);
        await dispatch(
          thunkFetchFirstPageFollowerData({
            uid: uid || userData.uid || "",
            pagePerData
          })
        );
        setIsScrollLoading(false);
      })();
    } else {
      (async () => {
        setIsScrollLoading(true);
        await dispatch(
          thunkFetchFirstPageFollowingData({
            uid: uid || userData.uid || "",
            pagePerData
          })
        );
        setIsScrollLoading(false);
      })();
    }
  }, []);

  useEffect(() => {
    if (isFollower) {
      if (followListData.length > 0 && inview && hasMore) {
        (async () => {
          setIsScrollLoading(true);
          await dispatch(
            thunkFetchPagingFollowerData({
              uid: uid || userData.uid || "",
              page,
              pagePerData
            })
          );
          setIsScrollLoading(false);
        })();
      }
    } else {
      if (followListData.length > 0 && inview && hasMore) {
        (async () => {
          setIsScrollLoading(true);
          await dispatch(
            thunkFetchPagingFollowingData({
              uid: uid || userData.uid || "",
              page,
              pagePerData
            })
          );
          setIsScrollLoading(false);
        })();
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
      {isScrollLoading && followListData.length === 0 ? (
        <ScrollLoading />
      ) : (
        <>
          {followListData.length > 0 ? (
            <>
              <FollowUl ref={followListRef} tabIndex={0}>
                {followListData.map((item, idx) => {
                  return (
                    <FollowItem
                      key={item.uid}
                      data={item}
                      idx={idx}
                      isLastItem={idx === followListData.length - 1}
                      isFollower={isFollower}
                      closeBtnRef={closeBtnRef}
                      firstItemLinkRef={firstItemLinkRef}
                      lastItemFollowBtnRef={lastItemFollowBtnRef}
                    />
                  );
                })}
                <InfinityScrollTarget ref={ref}></InfinityScrollTarget>
                {isScrollLoading && <ScrollLoading />}
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
