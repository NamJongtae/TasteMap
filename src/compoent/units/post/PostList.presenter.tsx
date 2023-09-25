import React from "react";
import PostItem from "./PostItem.container";
import Loading from "../../commons/loading/Loading";
import Comment from "./comment/Comment";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import { IPostData, IProfileData } from "../../../api/apiType";
interface IProps {
  isProfilePage: boolean;
  profilePostListData: IPostData[];
  postListData: IPostData[];
  myProfileData: IProfileData;
  isScrollLoading: boolean;
  isLoading: boolean;
  isOpenCommentModal: boolean;
  intinityScrollRef: (node?: Element | null | undefined) => void;
}
export default function PostListUI({
  isProfilePage,
  profilePostListData,
  postListData,
  myProfileData,
  isScrollLoading,
  isLoading,
  isOpenCommentModal,
  intinityScrollRef
}: IProps) {
  return (
    <>
      <Wrapper>
        <PostWrapper>
          {(isProfilePage
            ? profilePostListData.length > 0
            : postListData.length > 0) &&
            (isProfilePage ? profilePostListData : postListData).map((item) => {
              return (
                !item.isBlock && (
                  <PostItem
                    key={item.id}
                    data={item}
                    myProfileData={myProfileData}
                    isProfilePage={isProfilePage}
                  />
                )
              );
            })}
        </PostWrapper>
      </Wrapper>
      {(isProfilePage
        ? profilePostListData.length > 0
        : postListData.length > 0) && (
        <InfinityScrollTarget ref={intinityScrollRef}></InfinityScrollTarget>
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
