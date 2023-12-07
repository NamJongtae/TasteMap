import React from "react";
import PostItem from "../postItem/PostItem";
import ScrollLoading from "../../../commons/loading/ScrollLoading";
import {
  InfinityScrollTarget,
  PostListWrapper,
  Wrapper
} from "./postList.styles";
import NoData from "../../../commons/noData/NoData";
import { IMyProfileData, IPostData } from "../../../../api/apiType";
import { usePostsInfiniteScroll } from "../../../../hook/logic/post/postList/usePostsInfiniteScroll";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  myProfile: IMyProfileData;
}
export default function PostList({ myProfile, postType }: IProps) {
  const {
    loadPostsLoading,
    loadMorePostsLoading,
    posts,
    isNoPostsData,
    infiniteScrollRef
  } = usePostsInfiniteScroll({ myProfile, postType });

  if (loadPostsLoading) {
    return <ScrollLoading />;
  }

  if (isNoPostsData) {
    return <NoData />;
  }

  return (
    <>
      <Wrapper>
        <PostListWrapper>
          {posts
            ?.filter((post: IPostData) => !post.isBlock)
            .map((item) => {
              return (
                <PostItem
                  key={item.id}
                  data={item}
                  myProfile={myProfile || ({} as IMyProfileData)}
                  postType={postType}
                />
              );
            })}
          <InfinityScrollTarget ref={infiniteScrollRef}></InfinityScrollTarget>
          {loadMorePostsLoading && (
            <li>
              <ScrollLoading />
            </li>
          )}
        </PostListWrapper>
      </Wrapper>
    </>
  );
}
