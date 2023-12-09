import React from "react";
import { FollowBtn } from "../../../search.styles";
import { useFollowFetchData } from "../../../../../hook/logic/search/searchResultItem/useFollowFetchData";
import { IMyProfileData, IUserProfileData } from "../../../../../api/apiType";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function FollowButton({ myProfile, userProfile }: IProps) {
  const { followHandler } = useFollowFetchData({ myProfile, userProfile });
  return <FollowBtn onClick={followHandler}>팔로우</FollowBtn>;
}
