import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import PostListUI from "./PostList.presenter";
import { usePostInfiniteQuery } from "../../../hook/query/post/usePostInfiniteQuery";
import { useFeedPostInfiniteQuery } from "../../../hook/query/post/useFeedPostInfiniteQuery";
import { useProfilePostInfiniteQuery } from "../../../hook/query/post/useProfilePostInfiniteQuery";
import { IMyProfileData } from "../../../api/apiType";
import { useMyProfileQuery } from "../../../hook/query/profile/useMyProfileQuery";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function PostList({ postType }: IProps) {
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );

  // 페이징 최대 게시물 수
  const pagePerData = useSelector(
    (state: RootState) => state.post.postsPagePerData
  );

  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();

  // 자신의 프로필 가져오기
  const { data: myProfile } = useMyProfileQuery(myInfo.uid);

  // HOME post 타입 (전체 게시물)
  const {
    data: homePosts,
    hasNextPage: homeHasNextPage,
    fetchNextPage: homeFetchNextPage,
    isFetching: homeIsFetching,
    isFetchingNextPage: homeIsFetchingNextPage
  } = usePostInfiniteQuery(pagePerData, postType);

  // FEED post 타입 (팔로잉한 유저 게시물)
  const {
    data: feedPosts,
    hasNextPage: feedHasNextPage,
    fetchNextPage: feedFetchNextPage,
    isFetching: feedIsFetching,
    isFetchingNextPage: feedIsFetchingNextPage
  } = useFeedPostInfiniteQuery(
    pagePerData,
    (myProfile || ({} as IMyProfileData)).followingList,
    postType
  );

  // PROFILE post 타입 (프로필 페이지 게시물)
  const {
    data: profilePosts,
    hasNextPage: profileHasNextPage,
    fetchNextPage: profileFetchNextPage,
    isFetching: profileIsFetching,
    isFetchingNextPage: profileIsFetchingNextPage,
  } = useProfilePostInfiniteQuery(
    uid ? uid : myInfo.uid,
    pagePerData,
    postType
  );

  // 무한 스크롤 : 추가 데이터 가져오기
  useEffect(() => {
    if (
      (postType === "HOME" && inview && homeHasNextPage && homePosts?.length) ||
      0 >= pagePerData
    ) {
      homeFetchNextPage();
    } else if (
      (postType === "FEED" && inview && feedHasNextPage && feedPosts?.length) ||
      0 >= pagePerData
    ) {
      feedFetchNextPage();
    } else if (
      (postType === "PROFILE" &&
        inview &&
        profileHasNextPage &&
        profilePosts?.length) ||
      0 >= pagePerData
    ) {
      profileFetchNextPage();
    }
  }, [postType, inview, homeHasNextPage, feedHasNextPage, profileHasNextPage]);

  // 게시물 로딩 : 초기 로딩, 이후 리패칭, 패칭
  const loadPostsLoading =
    postType === "HOME"
      ? !homeIsFetchingNextPage && homeIsFetching
      : postType === "FEED"
      ? !feedIsFetchingNextPage && feedIsFetching
      : !profileIsFetchingNextPage && profileIsFetching;

  // 게시물 추가 로딩
  const loadMorePostsLoading =
    postType === "HOME"
      ? homeIsFetchingNextPage && (homePosts?.length || 0) >= pagePerData
      : postType === "FEED"
      ? feedIsFetchingNextPage && (feedPosts?.length || 0) >= pagePerData
      : profileIsFetchingNextPage && (profilePosts?.length || 0) >= pagePerData;

  // postType별 데이터
  const data =
    postType === "HOME"
      ? homePosts
      : postType === "FEED"
      ? feedPosts
      : profilePosts;

  // postType별 게시물 데이터 존재 유무
  const isNoPostsData =
    postType === "HOME"
      ? !homeIsFetchingNextPage &&
        !homeIsFetching &&
        (homePosts?.length || 0) === 0
      : postType === "FEED"
      ? !feedIsFetchingNextPage &&
        !feedIsFetching &&
        (feedPosts?.length || 0) === 0
      : !profileIsFetchingNextPage &&
        !profileIsFetching &&
        (profilePosts?.length || 0) === 0;

  return (
    <PostListUI
      posts={(data || []).filter((v) => !v.isBlock)}
      myProfile={myProfile || ({} as IMyProfileData)}
      loadMorePostsLoading={loadMorePostsLoading}
      loadPostsLoading={loadPostsLoading}
      isOpenCommentModal={isOpenCommentModal}
      intinityScrollRef={ref}
      isNoPostData={isNoPostsData}
      postType={postType}
    />
  );
}
