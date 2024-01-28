import React from "react";
import { useFollowFetchData } from "../../../../../../hook/useFollowFetchData";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../../types/apiTypes";
import { FollowBtn } from "../../profileInfo.styles";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function ProfileFollowBtn({ myProfile, userProfile }: IProps) {
  const { profileFollowHandler } = useFollowFetchData({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });

  return <FollowBtn onClick={profileFollowHandler}>팔로우</FollowBtn>;
}
