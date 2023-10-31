import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  thunkFetchFirstPageFeedData,
  thunkFetchFirstPagePostData,
  thunkFetchPagingFeedData,
  thunkFetchPagingPostData,
  thunkFetchProfileFirstPageData,
  thunkFetchProfilePagingData
} from "../../../slice/postSlice";

import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import PostListUI from "./PostList.presenter";
import { thunkFetchMyProfile } from '../../../slice/userSlice';
interface Iprops {
  isProfilePage: boolean;
  postType?: "home" | "feed";
}
export default function PostList({ isProfilePage, postType }: Iprops) {
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );
  const myProfile = useSelector(
    (state: RootState) => state.user.myProfile
  );
  // 게시물 데이터 목록을 가져옴
  const posts = useSelector(
    (state: RootState) => state.post.posts
  );
  // 현재 페이지를 가져옴
  const page = useSelector((state: RootState) => state.post.postsPage);
  // 다음 게시물 여부가 있는지를 판별하는 hasMore를 가져옴
  const hasMore = useSelector((state: RootState) => state.post.postsHasMore);
  // 페이징 최대 게시물 수
  const pagePerData = useSelector((state: RootState) => state.post.postsPagePerData);
  // 게시물 데이터가 있는지 확인
  const isNoPostData = useSelector(
    (state: RootState) => state.post.isNoPostData
  );

  // 유저 프로필 게시물 목록
  const userPosts = useSelector(
    (state: RootState) => state.post.userPosts
  );
  // 유저 프로필 게시물 목록 페이지당 최대 게시물 수
  const userPostsPagePerData = useSelector(
    (state: RootState) => state.post.userPostsPagePerData
  );
  // 유저 프로필 게시물 현재 페이지
  const userPostsPage = useSelector((state: RootState) => state.post.userPostsPage);
  // 유저 프로필 게시물 다음 게시물 존재 여부
  const userPostsHasMore = useSelector(
    (state: RootState) => state.post.userPostsHasMore
  );
  // 유저 프로필 게시물 데이터가 있는지 확인
  const isNoUserPostData = useSelector(
    (state: RootState) => state.post.isNoUserPostData
  );
  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();
  const dispatch = useDispatch<AppDispatch>();
  const loadMorePostsLoading = useSelector(
    (state: RootState) => state.post.loadMorePostsLoading
  );
  const loadPostsLoading = useSelector(
    (state: RootState) => state.post.loadPostsLoading
  );
  const loadUserPostsLoading = useSelector(
    (state: RootState) => state.post.loadUserPostsLoading
  );
  // 무한스크롤 처리 inview의 상태가 변경될 때 마다 게시물 목록을 추가로 받아옴
  useEffect(() => {
    if (!isProfilePage) {
      if (postType === "home") {
        // 첫 페이지 게시물 가져오기
        dispatch(thunkFetchFirstPagePostData(pagePerData));
      } else {
        dispatch(
          thunkFetchFirstPageFeedData({
            pagePerData,
            followerList: myProfile.followerList || []
          })
        );
      }
    }
  }, [postType]);

  // 다른 유저의 프로필일 시 프로필 게시물 첫 페이지 가져오기
  useEffect(() => {
    // 프로필 게시물 일때
    if (isProfilePage) {
        dispatch(
          thunkFetchProfileFirstPageData({
            uid: uid ? uid : myInfo.uid || "",
            pagePerData: userPostsPagePerData
          })
        );
    }
  }, [uid]);

  useEffect(() => {
    // 홈 페이지 게시물
    if (!isProfilePage) {
      // posts가 존재, 페이지에 따라 게시물 목록 추가로 가져오기
      if (posts.length > 0 && hasMore && inview) {
        if (postType === "home") {
          dispatch(thunkFetchPagingPostData({ page, pagePerData }));
        } else {
          dispatch(
            thunkFetchPagingFeedData({
              page,
              pagePerData,
              followerList: myProfile.followerList || []
            })
          );
        }
      }
    } else {
      // 프로필 페이지 게시물
      // profileposts 데이터가 존재, 페이지에 따라 게시물 목록 추가로 가져오기
      if (userPosts.length > 0 && userPostsHasMore && inview) {
        dispatch(
          thunkFetchProfilePagingData({
            uid: uid ? uid : myInfo.uid || "",
            pagePerData,
            page: userPostsPage
          })
        );
      }
    }
  }, [inview]);

  useEffect(() => {
    if (myInfo.uid && !isProfilePage)
      dispatch(thunkFetchMyProfile(myInfo.uid));
  }, []);

  return (
    <PostListUI
      isProfilePage={isProfilePage}
      userPosts={userPosts}
      posts={posts}
      myProfile={myProfile}
      loadMorePostsLoading={loadMorePostsLoading}
      loadPostsLoading={loadPostsLoading}
      loadUserPostsLoading={loadUserPostsLoading}
      isOpenCommentModal={isOpenCommentModal}
      intinityScrollRef={ref}
      isNoPostData={isNoPostData}
      isNoUserPostData={isNoUserPostData}
    />
  );
}
