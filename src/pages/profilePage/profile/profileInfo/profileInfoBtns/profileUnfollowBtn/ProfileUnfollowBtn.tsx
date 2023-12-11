import React from "react";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../../api/apiType";
import { UnfollowBtn } from "../../profileInfo.styles";
import { useUnfollowFetchData } from "../../../../../../hook/useUnfollowFetchData";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function ProfileUnfollowBtn({ myProfile, userProfile }: IProps) {
  const { unfollowHandler } = useUnfollowFetchData({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });

  return <UnfollowBtn onClick={unfollowHandler}>언팔로우</UnfollowBtn>;
}
