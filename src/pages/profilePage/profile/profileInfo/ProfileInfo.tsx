import React from "react";
import { IMyProfileData, IUserProfileData } from "../../../../types/apiTypes";
import { ProfileInfoWrapper } from "./profileInfo.styles";
import ProfileUserInfo from "./ProfileUserInfo/ProfileUserInfo";
import ProfileInfoBtns from "./profileInfoBtns/ProfileInfoBtns";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}

export default function ProfileInfo({ myProfile, userProfile }: IProps) {
  return (
    <>
      {(userProfile.displayName || myProfile.displayName) && (
        <ProfileInfoWrapper>
          <h2 className='a11y-hidden'>유저 프로필 정보</h2>
          <ProfileUserInfo myProfile={myProfile} userProfile={userProfile} />
          <ProfileInfoBtns myProfile={myProfile} userProfile={userProfile} />
        </ProfileInfoWrapper>
      )}
    </>
  );
}
