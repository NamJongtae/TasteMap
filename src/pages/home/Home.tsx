import React from "react";
import PostList from "../../component/units/post/PostList";
import {
  ButtonWrapper,
  FeedBtn,
  HomeBtn,
  PostTypeTitle,
  Wrapper
} from "./home.styles";
import Header from "../../component/commons/layouts/header/Header";
import TopButton from "../../component/commons/topButton/TopButton";
import { useHome } from '../../hook/logic/home/useHome';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function Home() {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  const { postType, homeBtnActiveHandler, FeedBtnActiveHandler } = useHome();

  return (
    <>
      <Header type='home' />
      <Wrapper>
        <ButtonWrapper>
          <HomeBtn
            onClick={homeBtnActiveHandler}
            postType={postType}
            aria-label='Home'
            title='Home'
            $isWebpSupported={isWebpSupported}
          />
          <FeedBtn
            onClick={FeedBtnActiveHandler}
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
