import React from "react";
import {
  FollowingBtn,
  FollowingCount,
  FollowingTag
} from "../../../profileInfo.styles";
import {
  IMyProfileData,
  IUserProfileData
} from "../../../../../../../types/apiTypes";
import useOpenFollowingModal from "../../../../../../../hook/logic/profile/followModal/useOpenFollowingModal";

interface IProps {
  profile: IMyProfileData | IUserProfileData;
}

export default function FollowingModalBtn({ profile }: IProps) {
  const { openFollowingModalHandler } = useOpenFollowingModal();

  return (
    <FollowingBtn onClick={openFollowingModalHandler}>
      <FollowingCount>{profile.followingList?.length}</FollowingCount>
      <FollowingTag>Followering</FollowingTag>
    </FollowingBtn>
  );
}
