import React from "react";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import {
  FollowBtn,
  SearchLi,
  UserImg,
  UserProfileLink,
  Username
} from "./search.styles";
import { useSearchItem } from "../../hook/logic/search/useSearchItem";
import { resolveWebp } from '../../library/resolveWebp';

interface IProps {
  item: IUserProfileData;
  myProfile: IMyProfileData | undefined;
}

export default function SearchItem({ item, myProfile }: IProps) {
  const { isFollow, followHandler, unfollowHandler, getTextHighLight, isMe } =
    useSearchItem({ item, myProfile });

  return (
    <SearchLi key={item.uid}>
      <UserProfileLink to={`/profile/${item.uid}`}>
        <UserImg
          src={item.photoURL}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
            (e.currentTarget.src = resolveWebp(
              "/assets/webp/icon-defaultProfile.webp",
              "svg"
            ))
          }
        />
        <Username>{getTextHighLight(item.displayName || "")}</Username>
      </UserProfileLink>
      {!isMe && (
        <FollowBtn
          isFollow={isFollow}
          onClick={isFollow ? unfollowHandler : followHandler}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </FollowBtn>
      )}
    </SearchLi>
  );
}
