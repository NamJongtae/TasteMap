import React from "react";
import { FollowBtn } from "../../../search.styles";
import { useFollowFetchData } from "../../../../../hook/useFollowFetchData";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../types/apiTypes";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function FollowButton({ myProfile, userProfile }: IProps) {
  const { followModalFollowHandler } = useFollowFetchData({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });
  return <FollowBtn onClick={followModalFollowHandler}>팔로우</FollowBtn>;
}
