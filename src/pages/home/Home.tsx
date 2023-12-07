import React from "react";
import PostList from "../../component/units/post/postList/PostList";
import { Wrapper } from "./home.styles";
import Header from "../../component/commons/layouts/header/Header";
import TopButton from "../../component/commons/topButton/TopButton";
import { usePostTypeBtnActions } from "../../hook/logic/home/usePostTypeBtnActions";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CommentModalWrapper from "../../component/units/comment/CommentModalWrapper";
import { IMyProfileData } from "../../api/apiType";
import Loading from "../../component/commons/loading/Loading";
import { useLoadMyProfile } from "../../hook/useLoadMyProfile";
import HomePostType from "./homePostType/HomePostType";

export default function Home() {
  const { postType, homeBtnActiveHandler, FeedBtnActiveHandler } =
    usePostTypeBtnActions();

  const { myProfile, loadMyProfileLoading, myProfileIsError } =
    useLoadMyProfile();

  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );

  if (loadMyProfileLoading) {
    return <Loading />;
  }

  if (myProfileIsError) {
    return <Header type='home' />;
  }

  return (
    <>
      <Header type='home' />

      <Wrapper>
        <HomePostType
          postType={postType}
          homeBtnActiveHandler={homeBtnActiveHandler}
          FeedBtnActiveHandler={FeedBtnActiveHandler}
        />
        <PostList
          myProfile={myProfile || ({} as IMyProfileData)}
          postType={postType}
        />
      </Wrapper>
      <TopButton />
      {isOpenCommentModal && <CommentModalWrapper postType={postType} />}
    </>
  );
}
