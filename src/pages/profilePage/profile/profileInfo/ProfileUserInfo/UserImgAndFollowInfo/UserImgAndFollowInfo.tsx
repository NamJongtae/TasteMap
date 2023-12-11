import React from "react";
import {
  UserProfileImg,
  UserImgAndFollowInfoWrapper
} from "../../profileInfo.styles";
import FollowerModalBtn from "./FollowerModalBtn/FollowerModalBtn";
import FollowingModalBtn from "./FollowingModalBtn/FollowingModalBtn";
import { IMyProfileData, IUserProfileData } from "../../../../../../api/apiType";
import { resolveWebp } from '../../../../../../library/resolveWebp';

interface IProps {
  profile: IMyProfileData | IUserProfileData;
}
export default function UserImgAndFollowInfo({ profile }: IProps) {
  return (
    <UserImgAndFollowInfoWrapper>
      <FollowerModalBtn profile={profile} />

      <UserProfileImg
        src={profile.photoURL}
        alt='프로필 이미지'
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          e.currentTarget.src = resolveWebp(
            "/assets/webp/icon-defaultProfile.webp",
            "svg"
          );
        }}
      />

      <FollowingModalBtn profile={profile} />
    </UserImgAndFollowInfoWrapper>
  );
}
