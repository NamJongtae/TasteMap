import React from "react";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../../types/apiTypes";
import { UnfollowBtn } from "../../profileInfo.styles";
import { useUnfollowFetchData } from "../../../../../../hook/useUnfollowFetchData";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function ProfileUnfollowBtn({ myProfile, userProfile }: IProps) {
  const { profileUnFollowHandler } = useUnfollowFetchData({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });

  return <UnfollowBtn onClick={profileUnFollowHandler}>언팔로우</UnfollowBtn>;
}
