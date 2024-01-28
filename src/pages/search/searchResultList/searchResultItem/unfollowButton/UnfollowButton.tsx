import React from "react";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../types/apiTypes";
import { useUnfollowFetchData } from "../../../../../hook/useUnfollowFetchData";
import { UnfollowBtn } from "../../../search.styles";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function UnfollowButton({ myProfile, userProfile }: IProps) {
  const { followModalUnfollowHandler } = useUnfollowFetchData({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });
  return (
    <UnfollowBtn onClick={followModalUnfollowHandler}>언팔로우</UnfollowBtn>
  );
}
