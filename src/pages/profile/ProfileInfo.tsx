import React, { useEffect, useState } from "react";
import {
  ButtonWrapper,
  FollowerBtn,
  FollowerCount,
  FollowerTag,
  FollowingBtn,
  FollowingCount,
  Introduce,
  ProfileBtn,
  ProfileFollowBtn,
  ProfileInfoWrapper,
  UserName,
  UserProfileImg,
  UserWrapper
} from "./profileInfo.styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  profileSlice,
  thunkFetchFollow,
  thunkFetchMyProfile,
  thunkFetchUnfollow,
  thunkFetchUserProfile
} from "../../slice/profileSlice";
import { resolveWebp } from "../../library/webpSupport";
import Loading from "../../compoent/commons/loading/Loading";

export default function ProfileInfo() {
  const { uid } = useParams();
  const userData = useSelector((state: RootState) => state.user.data);
  const isLoading = useSelector((state: RootState) => state.profile.isLoading);
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const userProfileData = useSelector(
    (state: RootState) => state.profile.userProfileData
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    if (
      userProfileData.uid &&
      myProfileData.followerList?.includes(userProfileData.uid)
    ) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [userProfileData]);

  useEffect(() => {
    dispatch(thunkFetchUserProfile(uid || userData.uid || ""));
    dispatch(thunkFetchMyProfile(userData.uid || ""));
  }, [uid]);

  const onClickFollow = async () => {
    if (userData.uid && userProfileData.uid) {
      dispatch(
        thunkFetchFollow({ myUid: userData.uid, userUid: userProfileData.uid })
      );
      setIsFollow(true);
    }
  };

  const onClickUnfollow = async () => {
    if (userData.uid && userProfileData.uid) {
      dispatch(
        thunkFetchUnfollow({
          myUid: userData.uid,
          userUid: userProfileData.uid
        })
      );
      setIsFollow(false);
    }
  };

  const onClickFollower = () => {
    document.body.style.overflow = "hidden";
    dispatch(profileSlice.actions.setIsOpenFollowModal(true));
  };

  const onClickFollowing = () => {
    document.body.style.overflow = "hidden";
    dispatch(profileSlice.actions.setIsOpenFollowingModal(true));
  };

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
                src={userProfileData.photoURL}
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
            <UserName>{userProfileData.displayName}</UserName>
            <Introduce>{userProfileData.introduce}</Introduce>
            <ButtonWrapper>
              {userProfileData.uid === userData.uid ? (
                <ProfileBtn>프로필 수정</ProfileBtn>
              ) : (
                <ProfileFollowBtn
                  isFollow={isFollow}
                  onClick={isFollow ? onClickUnfollow : onClickFollow}
                >
                  {isFollow ? "언팔로우" : "팔로우"}
                </ProfileFollowBtn>
              )}

              <ProfileBtn>맛집 지도</ProfileBtn>
            </ButtonWrapper>
          </ProfileInfoWrapper>
        )
      )}
    </>
  );
}
