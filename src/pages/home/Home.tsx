import React, { useState } from "react";
import PostList from "../../compoent/units/post/PostList.container";
import {
  ButtonWrapper,
  FeedBtn,
  HomeBtn,
  PostTypeTitle,
  Wrapper
} from "./home.styles";
import Header from "../../compoent/commons/layouts/header/Header";
import TopButton from '../../compoent/commons/topButton/TopButton';

export default function Home() {
  const [postType, setPostType] = useState<"home" | "feed">("home");

  const onClickHomeBtn = () => {
    setPostType("home");
  };

  const onClickFeedBtn = () => {
    setPostType("feed");
  };

  return (
    <>
      <Header type='home' />
      <Wrapper>
        <ButtonWrapper>
          <HomeBtn
            onClick={onClickHomeBtn}
            postType={postType}
            aria-label='Home'
            title='Home'
          />
          <FeedBtn
            onClick={onClickFeedBtn}
            postType={postType}
            aria-label='Feed'
            title='Feed'
          />
          <PostTypeTitle>
            {postType === "home" ? "전체 게시물" : "피드 게시물"}
          </PostTypeTitle>
        </ButtonWrapper>
        <PostList isProfilePage={false} postType={postType} />
      </Wrapper>
      <TopButton/>
    </>
  );
}
