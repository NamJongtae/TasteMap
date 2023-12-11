import React from "react";
import { ButtonWrapper } from "../profileInfo.styles";
import { IMyProfileData, IUserProfileData } from "../../../../../api/apiType";
import ProfileUpdateModalBtn from "./profileUpdateModalBtn/ProfileUpdateModalBtn";
import { ProfileTasteMapBtn } from "./ProfileTasteMapBtn";
import useCheckIsMe from "../../../../../hook/useCheckIsMe";
import ProfileFollowBtn from "./profileFollowBtn/ProfileFollowBtn";
import ProfileUnfollowBtn from "./profileUnfollowBtn/ProfileUnfollowBtn";
import useCheckIsFollow from "../../../../../hook/useCheckIsFollow";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function ProfileInfoBtns({ myProfile, userProfile }: IProps) {
  const { isMe } = useCheckIsMe({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });

  const { isFollow } = useCheckIsFollow({
    myFollowingList: myProfile.followingList,
    userUid: userProfile.uid
  });

  return (
    <ButtonWrapper>
      {isMe ? (
        <ProfileUpdateModalBtn />
      ) : isFollow ? (
        <ProfileUnfollowBtn myProfile={myProfile} userProfile={userProfile} />
      ) : (
        <ProfileFollowBtn myProfile={myProfile} userProfile={userProfile} />
      )}
      <ProfileTasteMapBtn />
    </ButtonWrapper>
  );
}
