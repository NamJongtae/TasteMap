import React, { useEffect, useState } from "react";
import PostItem from "./PostItem.container";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  thunkFetchFirstPagePostData,
  thunkFetchPagingPostData
} from "../../../slice/postSlice";
import Loading from "../../commons/loading/Loading";
import { useInView } from "react-intersection-observer";
import {
  profileSlice,
  thunkFetchMyProfile,
  thunkFetchProfileFirstPageData,
  thunkFetchProfilePagingData
} from "../../../slice/profileSlice";
import Comment from "./comment/Comment";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import { useParams } from "react-router-dom";
interface Iprops {
  isProfile: boolean;
}
export default function PostList({ isProfile }: Iprops) {
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

  // 무한스크롤 처리 inview의 상태가 변경될 때 마다 게시물 목록을 추가로 받아옴
  useEffect(() => {
    if (!isProfile) {
      // 첫 게시물 가져오기, postListData 데이터가 존재하지 않을 시
      if (postListData.length === 0) {
        dispatch(thunkFetchFirstPagePostData(pagePerData));
      }
    } else {
      if (profilePostListData.length === 0) {
        dispatch(
          thunkFetchProfileFirstPageData({
            uid: uid ? uid : userData.uid || "",
            pagePerData: profilePagePerData
          })
        );
      }
    }
  }, []);

  // 다른 유저의 프로필일 시 프로필 개사뮬 데이터 초기화
  useEffect(() => {
    // 프로필 게시물 일때
    if (isProfile) {
      if (userProfileData?.uid !== profilePostListData[0]?.uid) {
        dispatch(
          thunkFetchProfileFirstPageData({
            uid: uid ? uid : userData.uid || "",
            pagePerData: profilePagePerData
          })
        );
      }
    }
  }, [userProfileData]);

  useEffect(() => {
    // 홈 페이지 게시물
    if (!isProfile) {
      // postListData가 존재, 페이지에 따라 게시물 목록 추가로 가져오기
      if (postListData.length > 0 && hasMore && inview) {
        (async () => {
          setIsScrollLoading(true);
          await dispatch(thunkFetchPagingPostData({ page, pagePerData }));
          setIsScrollLoading(false);
        })();
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
    if (userData.uid) dispatch(thunkFetchMyProfile(userData.uid));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(profileSlice.actions.setProfilePostListData([]));
    };
  }, []);

  return (
    <>
      <Wrapper>
        <PostWrapper>
          {(isProfile
            ? profilePostListData.length > 0
            : postListData.length > 0) &&
            (isProfile ? profilePostListData : postListData).map((item) => {
              return (
                !item.isBlock && (
                  <PostItem
                    key={item.id}
                    data={item}
                    myProfileData={myProfileData}
                  />
                )
              );
            })}
        </PostWrapper>
      </Wrapper>
      {(isProfile
        ? profilePostListData.length > 0
        : postListData.length > 0) && (
        <InfinityScrollTarget ref={ref}></InfinityScrollTarget>
      )}
      {isScrollLoading && (
        <li>
          <ScrollLoading />
        </li>
      )}
      {isLoading && <Loading />}
      {isOpenCommentModal && <Comment />}
    </>
  );
}
