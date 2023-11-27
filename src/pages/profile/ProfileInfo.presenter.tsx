import React from "react";
import {
  ButtonWrapper,
  FollowerBtn,
  FollowerCount,
  FollowerTag,
  FollowingBtn,
  FollowingCount,
  Introduce,
  IntroduceTextLine,
  MoreTextBtn,
  ProfileBtn,
  ProfileFollowBtn,
  ProfileInfoWrapper,
  UserName,
  UserProfileImg,
  UserWrapper
} from "./profileInfo.styles";
import { resolveWebp } from "../../library/webpSupport";
import { IMyProfileData, IUserData, IUserProfileData } from "../../api/apiType";

interface IProps {
  myInfo: IUserData;
  userProfile: IUserProfileData;
  myProfile: IMyProfileData;
  onClickFollower: () => void;
  onClickFollowing: () => void;
  uid: string | undefined;
  introduecRef: React.RefObject<HTMLParagraphElement>;
  isShowMoreTextBtn: boolean;
  onClickMoreText: () => void;
  onClickProfileEdit: () => void;
  isFollow: boolean;
  onClickFollow: () => Promise<void>;
  onClickUnfollow: () => Promise<void>;
  onClickTasteMap: () => void;
}
export default function ProfileInfoUI({
  myInfo,
  userProfile,
  myProfile,
  onClickFollower,
  onClickFollowing,
  uid,
  introduecRef,
  isShowMoreTextBtn,
  onClickMoreText,
  onClickProfileEdit,
  isFollow,
  onClickFollow,
  onClickUnfollow,
  onClickTasteMap
}: IProps) {
  return (
    <>
      {(userProfile.displayName || myProfile.displayName) && (
        <ProfileInfoWrapper>
          <h2 className='a11y-hidden'>유저 프로필</h2>
          <UserWrapper>
            <FollowerBtn onClick={onClickFollower}>
              <FollowerCount>
                {uid
                  ? userProfile.followerList?.length
                  : myProfile.followerList?.length}
              </FollowerCount>
              <FollowerTag>Followers</FollowerTag>
            </FollowerBtn>
            <UserProfileImg
              src={uid ? userProfile.photoURL : myProfile.photoURL}
              alt='프로필 이미지'
              onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                (e.currentTarget.src = resolveWebp(
                  "/assets/webp/icon-defaultProfile.webp",
                  "svg"
                ))
              }
            />
            <FollowingBtn onClick={onClickFollowing}>
              <FollowingCount>
                {uid
                  ? userProfile.followingList?.length
                  : myProfile.followingList?.length}
              </FollowingCount>
              <FollowerTag>Following</FollowerTag>
            </FollowingBtn>
          </UserWrapper>
          <UserName>
            {uid ? userProfile.displayName : myProfile.displayName}
          </UserName>
          <Introduce ref={introduecRef} isShowMoreTextBtn={isShowMoreTextBtn}>
            {uid ? userProfile.introduce : myProfile.introduce}
          </Introduce>

          {isShowMoreTextBtn && (
            <>
              <IntroduceTextLine></IntroduceTextLine>
              <MoreTextBtn onClick={onClickMoreText}>더보기</MoreTextBtn>
            </>
          )}
          <ButtonWrapper>
            {!uid || userProfile.uid === myInfo.uid ? (
              <ProfileBtn onClick={onClickProfileEdit}>프로필 수정</ProfileBtn>
            ) : (
              <ProfileFollowBtn
                isFollow={isFollow}
                onClick={isFollow ? onClickUnfollow : onClickFollow}
              >
                {isFollow ? "언팔로우" : "팔로우"}
              </ProfileFollowBtn>
            )}

            <ProfileBtn onClick={onClickTasteMap}>맛집 지도</ProfileBtn>
          </ButtonWrapper>
        </ProfileInfoWrapper>
      )}
    </>
  );
}
