import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import ProfileInfoUI from "./ProfileInfo.presenter";
import { useFollowMutation } from "../../hook/query/profile/useFollowMutation";
import { useUnfollowMutation } from "../../hook/query/profile/useUnfollowMutation";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import { useSupportedWebp } from "../../hook/useSupportedWebp";

interface IProps {
  openFollowersModalHandler: () => void;
  openFollowingModalHanlder: () => void;
  openProfileUpdateModalHandler: () => void;
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function ProfileInfo({
  openFollowersModalHandler,
  openFollowingModalHanlder,
  openProfileUpdateModalHandler,
  myProfile,
  userProfile
}: IProps) {
  const { uid } = useParams();
  const { isWebpSupported, resolveWebp } = useSupportedWebp();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const navigate = useNavigate();
  const introduecRef = useRef<HTMLParagraphElement>(null);

  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);

  const { mutate: followMutate } = useFollowMutation();
  const { mutate: unfollowMutate } = useUnfollowMutation();

  const isFollow = myProfile.followingList?.includes(userProfile.uid);

  const onClickFollow = async () => {
    if (myInfo.uid && userProfile.uid) {
      followMutate({ myUid: myInfo.uid, userUid: userProfile.uid });
    }
  };

  const onClickUnfollow = async () => {
    if (myInfo.uid && userProfile.uid) {
      unfollowMutate({
        myUid: myInfo.uid,
        userUid: userProfile.uid
      });
    }
  };

  const onClickFollower = () => {
    openFollowersModalHandler();
  };

  const onClickFollowing = () => {
    openFollowingModalHanlder();
  };

  const onClickProfileEdit = () => {
    openProfileUpdateModalHandler();
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
    if (introduecRef.current && myProfile.uid) {
      if (introduecRef.current?.clientHeight >= 63) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, [userProfile, myProfile.uid]);

  return (
    <ProfileInfoUI
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
      isWebpSupported={isWebpSupported}
      resolveWebp={resolveWebp}
    />
  );
}
