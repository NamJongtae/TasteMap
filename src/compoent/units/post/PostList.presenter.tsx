import React from "react";
import PostItem from "./PostItem.container";
import Loading from "../../commons/loading/Loading";
import Comment from "./comment/Comment";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import { IPostData, IProfileData } from "../../../api/apiType";
import NoData from "../../commons/noData/NoData";
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
  intinityScrollRef,
}: IProps) {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            {(
              isProfilePage ? profilePostListData.length === 0 : postListData.length===0
            ) ? (
              <NoData />
            ) : (
              <PostWrapper>
                {(isProfilePage ? profilePostListData : postListData).map(
                  (item) => {
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
                  }
                )}
                <InfinityScrollTarget
                  ref={intinityScrollRef}
                ></InfinityScrollTarget>
                {isScrollLoading && (
                  <li>
                    <ScrollLoading />
                  </li>
                )}
              </PostWrapper>
            )}
          </Wrapper>
          {isOpenCommentModal && <Comment />}
        </>
      )}
    </>
  );
}
