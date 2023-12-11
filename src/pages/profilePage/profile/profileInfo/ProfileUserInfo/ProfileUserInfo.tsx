import React from "react";
import { UserName } from "../profileInfo.styles";
import { IMyProfileData, IUserProfileData } from "../../../../../api/apiType";
import { ProfileIntroduce } from "./ProfileIntroduce/ProfileIntroduce";
import useCheckIsMe from "../../../../../hook/useCheckIsMe";
import UserImgAndFollowInfo from "./UserImgAndFollowInfo/UserImgAndFollowInfo";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}

export default function ProfileUserInfo({ myProfile, userProfile }: IProps) {
  const { isMe } = useCheckIsMe({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });

  const profile = isMe ? myProfile : userProfile;

  return (
    <>
      <UserImgAndFollowInfo profile={profile} />

      <UserName>{profile.displayName}</UserName>

      <ProfileIntroduce profile={profile} />
    </>
  );
}
