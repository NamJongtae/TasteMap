import React, { useEffect } from "react";
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

interface IProps {
  isFollower: boolean;
}
export default function FollowList({ isFollower }: IProps) {
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
  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();
  useEffect(() => {
    if (isFollower) {
      dispatch(
        thunkFetchFirstPageFollowerData({
          uid: uid || userData.uid || "",
          pagePerData
        })
      );
    } else {
      dispatch(
        thunkFetchFirstPageFollowingData({
          uid: uid || userData.uid || "",
          pagePerData
        })
      );
    }
  }, []);

  useEffect(() => {
    if (isFollower) {
      if (followListData.length > 0 && inview && hasMore)
        dispatch(
          thunkFetchPagingFollowerData({
            uid: uid || userData.uid || "",
            page,
            pagePerData
          })
        );
    } else {
      if (followListData.length > 0 && inview && hasMore)
        dispatch(
          thunkFetchPagingFollowingData({
            uid: uid || userData.uid || "",
            page,
            pagePerData
          })
        );
    }
  }, [inview]);

  return (
    <>
      {followListData.length > 0 ? (
        <FollowUl>
          {followListData.map((item) => {
            return (
              <FollowItem key={item.uid} data={item} isFollower={isFollower} />
            );
          })}

          <InfinityScrollTarget ref={ref}></InfinityScrollTarget>
        </FollowUl>
      ) : (
        <NoData />
      )}
    </>
  );
}
