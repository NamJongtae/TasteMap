import React from "react";
import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";
import { SearchItem } from "../../search.styles";
import useCheckFollow from "../../../../hook/logic/search/searchResultItem/useCheckFollow";
import FollowButton from "./followButton/FollowButton";
import UnfollowButton from "./unfollowButton/UnfollowButton";
import HighLightedUserInfo from "./highLightUserInfo/HighLightedUserInfo";

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
  const { isFollow, isMe } = useCheckFollow({ myProfile, userProfile });

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
