import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../store/store";
import { useInView } from "react-intersection-observer";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { usePostInfiniteQuery } from "../../query/post/usePostInfiniteQuery";
import { useFeedPostInfiniteQuery } from "../../query/post/useFeedPostInfiniteQuery";
import { IMyProfileData } from "../../../api/apiType";
import { useProfilePostInfiniteQuery } from "../../query/post/useProfilePostInfiniteQuery";
import { useEffect } from "react";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}

export const usePostList = ({ postType }: IProps) => {
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
  const [infiniteScrollRef, inview] = useInView();

  // 자신의 프로필 가져오기
  const {
    data: myProfile,
    isPending: loadMyProfileLoading,
    isError: myProfileIsError
  } = useMyProfileQuery(myInfo.uid);

  const postsQuery = {
    HOME: () => usePostInfiniteQuery(pagePerData, postType),
    FEED: () =>
      useFeedPostInfiniteQuery(
        pagePerData,
        (myProfile || ({} as IMyProfileData)).followingList,
        postType
      ),
    PROFILE: () =>
      useProfilePostInfiniteQuery(uid ? uid : myInfo.uid, pagePerData, postType)
  };

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage
  } = postsQuery[postType]();

  useEffect(() => {
    if (inview && hasNextPage && (posts?.length || 0) >= pagePerData) {
      fetchNextPage();
    }
  }, [postType, inview, hasNextPage]);

  const loadPostsLoading = !isFetchingNextPage && isFetching;
  const loadMorePostsLoading =
    isFetchingNextPage && (posts?.length || 0) >= pagePerData;
  const isNoPostsData =
    !isFetchingNextPage && !isFetching && (posts?.length || 0) === 0;

  return {
    myProfile,
    loadMyProfileLoading,
    myProfileIsError,
    isOpenCommentModal,
    loadPostsLoading,
    loadMorePostsLoading,
    posts,
    isNoPostsData,
    infiniteScrollRef
  };
};
