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
import Loading from "../../compoent/commons/loading/Loading";
import { IProfileData, IUserData } from "../../api/apiType";
interface IProps {
  isLoading: boolean;
  userData: IUserData;
  userProfileData: IProfileData;
  myProfileData: IProfileData;
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
  isLoading,
  userData,
  userProfileData,
  myProfileData,
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
      {isLoading ? (
        <Loading />
      ) : (
        userProfileData.displayName && (
          <ProfileInfoWrapper>
            <h2 className='a11y-hidden'>유저 프로필</h2>
            <UserWrapper>
              <FollowerBtn onClick={onClickFollower}>
                <FollowerCount>
                  {userProfileData.uid === userData.uid
                    ? myProfileData.followerList?.length
                    : userProfileData.followerList &&
                      userProfileData.followerList.length}
                </FollowerCount>
                <FollowerTag>Followers</FollowerTag>
              </FollowerBtn>
              <UserProfileImg
                src={uid ? userProfileData.photoURL : myProfileData.photoURL}
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
                  {userProfileData.uid === userData.uid
                    ? myProfileData.followingList?.length
                    : userProfileData.followingList &&
                      userProfileData.followingList.length}
                </FollowingCount>
                <FollowerTag>Following</FollowerTag>
              </FollowingBtn>
            </UserWrapper>
            <UserName>
              {uid ? userProfileData.displayName : myProfileData.displayName}
            </UserName>
            <Introduce ref={introduecRef} isShowMoreTextBtn={isShowMoreTextBtn}>
              {uid ? userProfileData.introduce : myProfileData.introduce}
            </Introduce>

            {isShowMoreTextBtn && (
              <>
                <IntroduceTextLine></IntroduceTextLine>
                <MoreTextBtn onClick={onClickMoreText}>더보기</MoreTextBtn>
              </>
            )}
            <ButtonWrapper>
              {userProfileData.uid === userData.uid ? (
                <ProfileBtn onClick={onClickProfileEdit}>
                  프로필 수정
                </ProfileBtn>
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
        )
      )}
    </>
  );
}
