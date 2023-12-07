import React from "react";
import { ProfilePostSection } from "./profilePost.styles";
import PostList from "../../component/units/post/postList/PostList";
import { IMyProfileData } from "../../api/apiType";

interface IProps {
  myProfile: IMyProfileData;
}
export default function ProfilePost({ myProfile }: IProps) {
  return (
    <ProfilePostSection>
      <h2 className='a11y-hidden'>유저 게시물</h2>
      <PostList myProfile={myProfile} postType='PROFILE' />
    </ProfilePostSection>
  );
}
