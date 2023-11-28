import React from "react";
import PostItem from "./PostItem.container";
// import Loading from "../../commons/loading/Loading";
import Comment from "./comment/Comment";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import { IPostData, IMyProfileData } from "../../../api/apiType";
import NoData from "../../commons/noData/NoData";

interface IProps {
  posts: IPostData[];
  myProfile: IMyProfileData;
  loadMorePostsLoading: boolean;
  loadPostsLoading: boolean;
  isOpenCommentModal: boolean;
  intinityScrollRef: (node?: Element | null | undefined) => void;
  isNoPostData: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function PostListUI({
  posts,
  myProfile,
  loadMorePostsLoading,
  loadPostsLoading,
  isOpenCommentModal,
  intinityScrollRef,
  isNoPostData,
  postType
}: IProps) {
  
  if (loadPostsLoading) {
    return <ScrollLoading />;
  }

  if (isNoPostData) {
    return <NoData />;
  }

  return (
    <>
      <Wrapper>
        <PostWrapper>
          {posts.map((item) => {
            return (
              <PostItem
                key={item.id}
                data={item}
                myProfile={myProfile}
                postType={postType}
              />
            );
          })}
          <InfinityScrollTarget ref={intinityScrollRef}></InfinityScrollTarget>
          {loadMorePostsLoading && !loadPostsLoading && (
            <li>
              <ScrollLoading />
            </li>
          )}
        </PostWrapper>
      </Wrapper>
      {isOpenCommentModal && <Comment postType={postType} />}
    </>
  );
}
