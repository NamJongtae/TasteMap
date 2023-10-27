import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  profileSlice,
  thunkFetchFollow,
  thunkFetchMyProfile,
  thunkFetchUnfollow,
  thunkFetchUserProfile
} from "../../slice/profileSlice";

import ProfileInfoUI from "./ProfileInfo.presenter";

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
  const navigate = useNavigate();
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

  const onClickTasteMap = () => {
    if (!uid || uid === userData.uid) {
      navigate("/profile/tasteMap");
    } else {
      navigate(`/tastemap/share/${uid}`);
    }
  };

  useLayoutEffect(() => {
    if (
      userProfileData.uid &&
      myProfileData.followingList?.includes(userProfileData.uid)
    ) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [userProfileData, myProfileData]);

  useLayoutEffect(() => {
    if (introduecRef.current) {
      if (introduecRef.current?.clientHeight >= 63) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, [userProfileData, myProfileData]);

  useEffect(() => {
    dispatch(thunkFetchUserProfile(uid || userData.uid || ""));
    dispatch(thunkFetchMyProfile(userData.uid || ""));
  }, [uid]);

  return (
    <ProfileInfoUI
      isLoading={isLoading}
      userData={userData}
      userProfileData={userProfileData}
      myProfileData={myProfileData}
      onClickFollower={onClickFollower}
      onClickFollowing={onClickFollowing}
      uid={uid}
      introduecRef={introduecRef}
      isShowMoreTextBtn={isShowMoreTextBtn}
      onClickMoreText={onClickMoreText}
      onClickProfileEdit={onClickProfileEdit}
      isFollow={isFollow}
      onClickFollow={onClickFollow}
      onClickUnfollow={onClickUnfollow}
      onClickTasteMap={onClickTasteMap}
    />
  );
}
