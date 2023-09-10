import React from "react";
import PostList from "../../compoent/units/post/PostList";
import { Wrapper } from "./home.styles";
import Header from '../../compoent/commons/layouts/header/Header';

export default function Home() {
  return (
    <>
    <Header type='home'/>
      <Wrapper>
        <PostList />
      </Wrapper>
    </>
  );
}
