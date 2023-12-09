import React from "react";
import { FollowBtn } from "../../../search.styles";
import { IMyProfileData, IUserProfileData } from "../../../../../api/apiType";
import { useUnfollowFetchData } from "../../../../../hook/logic/search/searchResultItem/useUnfollowFetchData";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function UnfollowButton({ myProfile, userProfile }: IProps) {
  const { unfollowHandler } = useUnfollowFetchData({ myProfile, userProfile });
  return <FollowBtn onClick={unfollowHandler}>언팔로우</FollowBtn>;
}
