import React from "react";
import PostItem from "./PostItem.container";
// import Loading from "../../commons/loading/Loading";
import Comment from "./comment/Comment";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import { IPostData, IProfileData } from "../../../api/apiType";
import NoData from "../../commons/noData/NoData";
interface IProps {
  isProfilePage: boolean;
  userPosts: IPostData[];
  posts: IPostData[];
  myProfile: IProfileData;
  loadMorePostsLoading: boolean;
  loadPostsLoading: boolean;
  loadUserPostsLoading: boolean;
  isOpenCommentModal: boolean;
  intinityScrollRef: (node?: Element | null | undefined) => void;
  isNoPostData: boolean;
  isNoUserPostData: boolean;
}
export default function PostListUI({
  isProfilePage,
  userPosts,
  posts,
  myProfile,
  loadMorePostsLoading,
  loadPostsLoading,
  loadUserPostsLoading,
  isOpenCommentModal,
  intinityScrollRef,
  isNoPostData,
  isNoUserPostData
}: IProps) {
  return (
    <>
      {
        <>
          <Wrapper>
            {(!isProfilePage ? loadPostsLoading : loadUserPostsLoading) ? (
              <ScrollLoading />
            ) : (isProfilePage ? isNoUserPostData : isNoPostData) ? (
              <NoData />
            ) : (
              <PostWrapper>
                {(isProfilePage ? userPosts : posts).map(
                  (item) => {
                    return (
                      !item.isBlock && (
                        <PostItem
                          key={item.id}
                          data={item}
                          myProfile={myProfile}
                          isProfilePage={isProfilePage}
                        />
                      )
                    );
                  }
                )}
                <InfinityScrollTarget
                  ref={intinityScrollRef}
                ></InfinityScrollTarget>
                {loadMorePostsLoading && (
                  <li>
                    <ScrollLoading />
                  </li>
                )}
              </PostWrapper>
            )}
          </Wrapper>
          {isOpenCommentModal && <Comment />}
        </>
      }
    </>
  );
}
