import React from "react";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import { useProfileInfo } from "../../hook/logic/profile/useProfileInfo";
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
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { resolveWebp } from '../../library/resolveWebp';
interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function ProfileInfo({ myProfile, userProfile }: IProps) {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  const {
    myInfo,
    isShowMoreTextBtn,
    isFollow,
    followHandler,
    unfollowHandler,
    openMoreTextHandler,
    openFollowerModalHandler,
    openFollowingModalHandler,
    openProfileUpdateModalHandler,
    moveTasteMapPageHandler,
    introduecRef,
    uid
  } = useProfileInfo({
    myProfile,
    userProfile
  });

  return (
    <>
      {(userProfile.displayName || myProfile.displayName) && (
        <ProfileInfoWrapper>
          <h2 className='a11y-hidden'>유저 프로필</h2>
          <UserWrapper>
            <FollowerBtn onClick={openFollowerModalHandler}>
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
            <FollowingBtn onClick={openFollowingModalHandler}>
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
              <MoreTextBtn
                onClick={openMoreTextHandler}
                $isWebpSupported={isWebpSupported}
              >
                더보기
              </MoreTextBtn>
            </>
          )}
          <ButtonWrapper>
            {!uid || userProfile.uid === myInfo.uid ? (
              <ProfileBtn onClick={openProfileUpdateModalHandler}>
                프로필 수정
              </ProfileBtn>
            ) : (
              <ProfileFollowBtn
                isFollow={isFollow}
                onClick={isFollow ? unfollowHandler : followHandler}
              >
                {isFollow ? "언팔로우" : "팔로우"}
              </ProfileFollowBtn>
            )}

            <ProfileBtn onClick={moveTasteMapPageHandler}>맛집 지도</ProfileBtn>
          </ButtonWrapper>
        </ProfileInfoWrapper>
      )}
    </>
  );
}
