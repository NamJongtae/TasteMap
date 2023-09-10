import React from "react";
import PostItem from "./PostItem";
import { PostWrapper, Wrapper } from "./postList.styles";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export default function PostList() {
  const postData = useSelector((state: RootState)=>state.post.data);
  return (
    <Wrapper>
      <PostWrapper>
        {postData.map((item) => {
          return <PostItem key={item.id} data={item}/>;
        })}
      </PostWrapper>
    </Wrapper>
  );
}
