import React from "react";
import { ProfilePostSection } from "./profilePost.styles";
import PostList from "../../component/units/post/PostList.container";

export default function ProfilePost() {

  return (
    <ProfilePostSection>
      <h2 className='a11y-hidden'>유저 게시물</h2>
      <PostList postType="PROFILE" />
    </ProfilePostSection>
  );
}
