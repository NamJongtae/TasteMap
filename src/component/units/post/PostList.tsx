import React from "react";
import { usePostList } from "../../../hook/logic/post/usePostList";
import PostItem from "./PostItem";
import CommentModalWrapper from "../comment/CommentModalWrapper";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import NoData from "../../commons/noData/NoData";
import { IMyProfileData, IPostData } from "../../../api/apiType";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function PostList({ postType }: IProps) {
  const {
    myProfile,
    loadMyProfileLoading,
    myProfileIsError,
    isOpenCommentModal,
    loadPostsLoading,
    loadMorePostsLoading,
    posts,
    isNoPostsData,
    infiniteScrollRef
  } = usePostList({ postType });

  if (loadPostsLoading || loadMyProfileLoading) {
    return <ScrollLoading />;
  }

  if (myProfileIsError) {
    return (
      <Wrapper>
        <PostWrapper></PostWrapper>
      </Wrapper>
    );
  }

  if (isNoPostsData) {
    return <NoData />;
  }

  return (
    <>
      <Wrapper>
        <PostWrapper>
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
          {loadMorePostsLoading && !loadPostsLoading && (
            <li>
              <ScrollLoading />
            </li>
          )}
        </PostWrapper>
      </Wrapper>
      {isOpenCommentModal && <CommentModalWrapper postType={postType} />}
    </>
  );
}
