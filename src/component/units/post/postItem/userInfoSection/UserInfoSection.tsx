import React from "react";

import PostUserInfo from "./postUserInfo/PostUserInfo";
import { IMyProfileData, IPostData } from "../../../../../api/apiType";
import { UserInfoWrapper } from "../../postList/post.styles";

interface IProps {
  myProfile: IMyProfileData;
  data: IPostData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function UserInfoSection({ myProfile, data, postType }: IProps) {
  return (
    <UserInfoWrapper>
      <h3 className='a11y-hidden'>유저 프로필</h3>
      <PostUserInfo
        userData={{
          ...myProfile
        }}
        data={{ ...data }}
        postType={postType}
      />
    </UserInfoWrapper>
  );
}
