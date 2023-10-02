import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  thunkFetchFirstPageFeedData,
  thunkFetchFirstPagePostData,
  thunkFetchPagingFeedData,
  thunkFetchPagingPostData
} from "../../../slice/postSlice";

import { useInView } from "react-intersection-observer";
import {
  profileSlice,
  thunkFetchMyProfile,
  thunkFetchProfileFirstPageData,
  thunkFetchProfilePagingData
} from "../../../slice/profileSlice";

import { useParams } from "react-router-dom";
import PostListUI from "./PostList.presenter";
interface Iprops {
  isProfilePage: boolean;
  postType?: "home" | "feed";
}
export default function PostList({ isProfilePage, postType }: Iprops) {
  const { uid } = useParams();
  const userData = useSelector((state: RootState) => state.user.data);
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  // 게시물 데이터 목록을 가져옴
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
  );
  // 현재 페이지를 가져옴
  const page = useSelector((state: RootState) => state.post.page);
  // 다음 게시물 여부가 있는지를 판별하는 hasMore를 가져옴
  const hasMore = useSelector((state: RootState) => state.post.hasMore);
  // 페이징 최대 게시물 수
  const pagePerData = useSelector((state: RootState) => state.post.pagePerData);

  // 유저 프로필 게시물 목록
  const profilePostListData = useSelector(
    (state: RootState) => state.profile.profilePostListData
  );
  // 유저 프로필 게시물 목록 페이지당 최대 게시물 수
  const profilePagePerData = useSelector(
    (state: RootState) => state.profile.pagePerData
  );
  // 유저 프로필 게시물 현재 페이지
  const profilePostPage = useSelector((state: RootState) => state.profile.page);
  // 유저 프로필 게시물 다음 게시물 존재 여부
  const profilePostHasMore = useSelector(
    (state: RootState) => state.profile.hasMore
  );
  const userProfileData = useSelector(
    (state: RootState) => state.profile.userProfileData
  );
  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();
  // 무한 스크롤시 게시물 추가 로딩
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const profileIsLoading = useSelector(
    (state: RootState) => state.profile.isLoading
  );
  const profilePostIsLoading = useSelector(
    (state: RootState) => state.profile.profilePostIsLoading
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
            followerList: myProfileData.followerList || []
          })
        );
      }
    }
  }, [postType]);

  // 다른 유저의 프로필일 시 프로필 게시물 첫 페이지 가져오기
  useEffect(() => {
    // 프로필 게시물 일때
    if (isProfilePage) {
      if (userProfileData?.uid !== profilePostListData[0]?.uid) {
        dispatch(
          thunkFetchProfileFirstPageData({
            uid: uid ? uid : userData.uid || "",
            pagePerData: profilePagePerData
          })
        );
      }
    }
  }, [userProfileData, uid]);

  useEffect(() => {
    // 홈 페이지 게시물
    if (!isProfilePage) {
      // postListData가 존재, 페이지에 따라 게시물 목록 추가로 가져오기
      if (postListData.length > 0 && hasMore && inview) {
        if (postType === "home") {
          (async () => {
            setIsScrollLoading(true);
            await dispatch(thunkFetchPagingPostData({ page, pagePerData }));
            setIsScrollLoading(false);
          })();
        } else {
          (async () => {
            setIsScrollLoading(true);
            await dispatch(
              thunkFetchPagingFeedData({
                page,
                pagePerData,
                followerList: myProfileData.followerList || []
              })
            );
            setIsScrollLoading(false);
          })();
        }
      }
    } else {
      // 프로필 페이지 게시물
      // profilePostListData 데이터가 존재, 페이지에 따라 게시물 목록 추가로 가져오기
      if (profilePostListData.length > 0 && profilePostHasMore && inview) {
        (async () => {
          setIsScrollLoading(true);
          await dispatch(
            thunkFetchProfilePagingData({
              uid: uid ? uid : userData.uid || "",
              pagePerData,
              page: profilePostPage
            })
          );
          setIsScrollLoading(false);
        })();
      }
    }
  }, [inview]);

  useEffect(() => {
    if (userData.uid && !isProfilePage)
      dispatch(thunkFetchMyProfile(userData.uid));
  }, []);

  // 언마운트시 게시물 데이터 초기화
  useEffect(() => {
    if (isProfilePage) {
      return () => {
        dispatch(profileSlice.actions.setProfilePostListData([]));
      };
    } else {
      return () => {
        dispatch(thunkFetchFirstPagePostData(pagePerData));
      };
    }
  }, []);

  return (
    <PostListUI
      isProfilePage={isProfilePage}
      profilePostListData={profilePostListData}
      postListData={postListData}
      myProfileData={myProfileData}
      isScrollLoading={isScrollLoading}
      isLoading={isLoading}
      profileIsLoading={profileIsLoading}
      profilePostIsLoading={profilePostIsLoading}
      isOpenCommentModal={isOpenCommentModal}
      intinityScrollRef={ref}
    />
  );
}
