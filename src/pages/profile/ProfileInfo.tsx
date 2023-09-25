import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const introduecRef = useRef<HTMLParagraphElement>(null);
  const [isFollow, setIsFollow] = useState(false);
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);

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
    dispatch(profileSlice.actions.setIsOpenFollowerModal(true));
  };

  const onClickFollowing = () => {
    document.body.style.overflow = "hidden";
    dispatch(profileSlice.actions.setIsOpenFollowingModal(true));
  };

  const onClickProfileEdit = () => {
    document.body.style.overflow = "hidden";
    dispatch(profileSlice.actions.setIsOpenProfileEditModal(true));
  };

  const onClickMoreText = () => {
    if (introduecRef.current) {
      introduecRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  };

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

  useLayoutEffect(() => {
    if (introduecRef.current) {
      if (introduecRef.current?.clientHeight >= 63) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, [isLoading]);

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

              <ProfileBtn>맛집 지도</ProfileBtn>
            </ButtonWrapper>
          </ProfileInfoWrapper>
        )
      )}
    </>
  );
}
