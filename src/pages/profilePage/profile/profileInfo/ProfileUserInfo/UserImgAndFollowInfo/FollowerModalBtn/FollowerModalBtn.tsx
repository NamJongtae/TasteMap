import React from "react";
import {
  FollowerBtn,
  FollowerCount,
  FollowerTag
} from "../../../profileInfo.styles";
import useOpenFollowerModal from "../../../../../../../hook/logic/profile/followModal/useOpenFollowerModal";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../../../api/apiType";

interface IProps {
  profile: IMyProfileData | IUserProfileData;
}

export default function FollowerModalBtn({ profile }: IProps) {
  const { openFollowerModalHandler } = useOpenFollowerModal();

  return (
    <FollowerBtn onClick={openFollowerModalHandler}>
      <FollowerCount>{profile.followerList?.length}</FollowerCount>
      <FollowerTag>Followers</FollowerTag>
    </FollowerBtn>
  );
}
