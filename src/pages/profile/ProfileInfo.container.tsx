import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

import ProfileInfoUI from "./ProfileInfo.presenter";
import {
  thunkFetchFollow,
  thunkFetchMyProfile,
  thunkFetchUnfollow,
  thunkFetchUserProfile,
  userSlice
} from "../../slice/userSlice";

export default function ProfileInfo() {
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const myProfile = useSelector((state: RootState) => state.user.myProfile);
  const loadMyProfileLoading = useSelector(
    (state: RootState) => state.user.loadMyProfileLoading
  );
  const loadUserProfileLoading = useSelector(
    (state: RootState) => state.user.loadUserProfileLoading
  );
  const userProfile = useSelector((state: RootState) => state.user.userProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const introduecRef = useRef<HTMLParagraphElement>(null);

  const [isFollow, setIsFollow] = useState(false);
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);

  const onClickFollow = async () => {
    if (myInfo.uid && userProfile.uid) {
      dispatch(
        thunkFetchFollow({ myUid: myInfo.uid, userUid: userProfile.uid })
      );
      setIsFollow(true);
    }
  };

  const onClickUnfollow = async () => {
    if (myInfo.uid && userProfile.uid) {
      dispatch(
        thunkFetchUnfollow({
          myUid: myInfo.uid,
          userUid: userProfile.uid
        })
      );
      setIsFollow(false);
    }
  };

  const onClickFollower = () => {
    document.body.style.overflow = "hidden";
    dispatch(userSlice.actions.setIsOpenFollowerModal(true));
  };

  const onClickFollowing = () => {
    document.body.style.overflow = "hidden";
    dispatch(userSlice.actions.setIsOpenFollowingModal(true));
  };

  const onClickProfileEdit = () => {
    document.body.style.overflow = "hidden";
    dispatch(userSlice.actions.setIsOpenProfileEditModal(true));
  };

  const onClickMoreText = () => {
    if (introduecRef.current) {
      introduecRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  };

  const onClickTasteMap = () => {
    if (!uid || uid === myInfo.uid) {
      navigate("/profile/tasteMap");
    } else {
      navigate(`/tastemap/share/${uid}`);
    }
  };

  useEffect(() => {
    if (uid === myInfo.uid) {
      navigate("/profile", { replace: true });
    }
  }, [uid]);

  useLayoutEffect(() => {
    if (userProfile.uid && myProfile.followingList.includes(userProfile.uid)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, [userProfile, myProfile]);

  useLayoutEffect(() => {
    if (introduecRef.current) {
      if (introduecRef.current?.clientHeight >= 63) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, [userProfile, myProfile]);

  useEffect(() => {
    if (uid) {
      dispatch(thunkFetchUserProfile(uid || ""));
    }
    dispatch(thunkFetchMyProfile(myInfo.uid));
  }, [uid]);

  return (
    <ProfileInfoUI
      loadMyProfileLoading={loadMyProfileLoading}
      loadUserProfileLoading={loadUserProfileLoading}
      myInfo={myInfo}
      userProfile={userProfile}
      myProfile={myProfile}
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
