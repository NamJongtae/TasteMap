import React from "react";
import { ProfilePostSection } from "./profilePost.styles";
import PostList from '../../compoent/units/post/PostList';

export default function ProfilePost() {
  return (
    <ProfilePostSection>
      <h2 className='a11y-hidden'>유저 게시물</h2>
      <PostList isProfile={true}/>
    </ProfilePostSection>
  );
}
