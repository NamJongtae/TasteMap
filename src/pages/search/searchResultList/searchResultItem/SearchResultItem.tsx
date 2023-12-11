import React from "react";
import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";
import { SearchItem } from "../../search.styles";
import useCheckIsFollow from "../../../../hook/useCheckIsFollow";
import FollowButton from "./followButton/FollowButton";
import UnfollowButton from "./unfollowButton/UnfollowButton";
import HighLightedUserInfo from "./highLightUserInfo/HighLightedUserInfo";
import useCheckIsMe from "../../../../hook/useCheckIsMe";

interface IProps {
  userProfile: IUserProfileData;
  myProfile: IMyProfileData;
  searchKeyword: string;
}

export default function SearchResultItem({
  userProfile,
  myProfile,
  searchKeyword
}: IProps) {
  const { isFollow } = useCheckIsFollow({
    userUid: userProfile.uid,
    myFollowingList: myProfile.followingList
  });

  const { isMe } = useCheckIsMe({
    myUid: myProfile.uid,
    userUid: userProfile.uid
  });

  return (
    <SearchItem key={userProfile.uid}>
      <HighLightedUserInfo
        highLightText={searchKeyword}
        userProfile={userProfile}
      />
      {!isMe &&
        (isFollow ? (
          <UnfollowButton myProfile={myProfile} userProfile={userProfile} />
        ) : (
          <FollowButton myProfile={myProfile} userProfile={userProfile} />
        ))}
    </SearchItem>
  );
}
