import React from "react";
import { IMyProfileData, IUserProfileData } from "../../../../../api/apiType";
import { useUnfollowFetchData } from "../../../../../hook/useUnfollowFetchData";
import { UnfollowBtn } from "../../../search.styles";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function UnfollowButton({ myProfile, userProfile }: IProps) {
  const { unfollowHandler } = useUnfollowFetchData({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });
  return <UnfollowBtn onClick={unfollowHandler}>언팔로우</UnfollowBtn>;
}
