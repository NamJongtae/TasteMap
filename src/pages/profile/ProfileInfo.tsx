import React, { useEffect, useState } from "react";
import {
  ButtonWrapper,
  FollowerCount,
  FollowerLink,
  FollowerTag,
  FollowingCount,
  FollowingLink,
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
  thunkFetchFollow,
  thunkFetchUnfollow,
  thunkFetchUserProfile
} from "../../slice/profileSlice";
import { resolveWebp } from "../../library/webpSupport";

export default function ProfileInfo() {
  const { uid } = useParams();
  const userData = useSelector((state: RootState) => state.user.data);
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
  return (
    <ProfileInfoWrapper>
      <h2 className='a11y-hidden'>유저 프로필</h2>
      <UserWrapper>
        <FollowerLink to={`/follower/${uid}`}>
          <FollowerCount>
            {userProfileData.followerList &&
              userProfileData.followerList.length}
          </FollowerCount>
          <FollowerTag>Followers</FollowerTag>
        </FollowerLink>
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
        <FollowingLink to={`/follower/${uid}`}>
          <FollowingCount>
            {userProfileData.followingList &&
              userProfileData.followingList.length}
          </FollowingCount>
          <FollowerTag>Following</FollowerTag>
        </FollowingLink>
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
  );
}
