import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { useInView } from "react-intersection-observer";
import { usePostInfiniteQuery } from "../../../query/post/usePostInfiniteQuery";
import { useFeedPostInfiniteQuery } from "../../../query/post/useFeedPostInfiniteQuery";
import { useProfilePostInfiniteQuery } from "../../../query/post/useProfilePostInfiniteQuery";
import { IMyProfileData } from "../../../../api/apiType";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

interface IProps {
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}
export const usePostsInfiniteScroll = ({ myProfile, postType }: IProps) => {
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  // 페이징 최대 게시물 수
  const pagePerData = useSelector(
    (state: RootState) => state.post.postsPagePerData
  );

  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [infiniteScrollRef, inview] = useInView();

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
    loadPostsLoading,
    loadMorePostsLoading,
    posts,
    isNoPostsData,
    infiniteScrollRef
  };
};
