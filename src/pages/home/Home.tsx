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
import TopButton from '../../component/commons/topButton/TopButton';

export const enum EPostType {
  HOME= 'HOME',
  FEED= 'FEED'
}

export default function Home() {
  const [postType, setPostType] = useState<EPostType>(EPostType.HOME);

  const onClickHomeBtn = () => {
    setPostType(EPostType.HOME);
  };

  const onClickFeedBtn = () => {
    setPostType(EPostType.FEED);
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
            {postType === EPostType.HOME ? "전체 게시물" : "피드 게시물"}
          </PostTypeTitle>
        </ButtonWrapper>
        <PostList isProfilePage={false} postType={postType} />
      </Wrapper>
      <TopButton/>
    </>
  );
}
