import React, { useState } from "react";
import PostList from "../../component/units/post/PostList.container";
import {
  ButtonWrapper,
  FeedBtn,
  HomeBtn,
  PostTypeTitle,
  Wrapper
} from "./home.styles";
import Header from "../../component/commons/layouts/header/Header";
import TopButton from "../../component/commons/topButton/TopButton";
import { useSupportedWebp } from '../../hook/useSupportedWebp';

export type TPostType = "HOME" | "FEED";

export default function Home() {
  const { isWebpSupported } = useSupportedWebp();
  const [postType, setPostType] = useState<TPostType>("HOME");

  const onClickHomeBtn = () => {
    setPostType("HOME");
  };

  const onClickFeedBtn = () => {
    setPostType("FEED");
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
            $isWebpSupported={isWebpSupported}
          />
          <FeedBtn
            onClick={onClickFeedBtn}
            postType={postType}
            aria-label='Feed'
            title='Feed'
            $isWebpSupported={isWebpSupported}
          />
          <PostTypeTitle>
            {postType === "HOME" ? "전체 게시물" : "피드 게시물"}
          </PostTypeTitle>
        </ButtonWrapper>
        <PostList postType={postType} />
      </Wrapper>
      <TopButton />
    </>
  );
}
