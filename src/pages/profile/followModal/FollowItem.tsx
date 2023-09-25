import React, { useEffect, useState } from "react";
import {
  FollowBtn,
  FollowLi,
  UserImg,
  UserLink,
  UserName
} from "./followModal.styles";
import { IFollowData } from "../../../api/apiType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  profileSlice,
  thunkFetchFollow,
  thunkFetchUnfollow
} from "../../../slice/profileSlice";

interface IProps {
  data: IFollowData;
  isFollower: boolean;
}
export default function FollowItem({ data, isFollower }: IProps) {
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isFollow, setIsFollow] = useState(false);

  const onClickUnFollow = () => {
    if (myProfileData.uid && data.uid) {
      dispatch(
        thunkFetchUnfollow({ myUid: myProfileData.uid, userUid: data.uid })
      );
      setIsFollow(false);
    }
  };

  const onClickFollow = () => {
    if (myProfileData.uid && data.uid) {
      dispatch(
        thunkFetchFollow({ myUid: myProfileData.uid, userUid: data.uid })
      );
      setIsFollow(true);
    }
  };

  const onClickProfileLink = () => {
    document.body.style.overflow = "auto";
    if(isFollower){
      dispatch(profileSlice.actions.setIsOpenFollowerModal(false));
    } else {
      dispatch(profileSlice.actions.setIsOpenFollowingModal(false));
    }
    
  };

  useEffect(() => {
    if (data.uid && myProfileData.followerList?.includes(data.uid)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, []);

  return (
    <FollowLi>
      <UserLink to={`/profile/${data.uid}`} onClick={onClickProfileLink}>
        <UserImg src={data.photoURL} alt='유저 프로필 이미지' />
        <UserName>{data.displayName}</UserName>
      </UserLink>
      {myProfileData.uid !== data.uid && (
        <FollowBtn
          isFollow={isFollow}
          onClick={isFollow ? onClickUnFollow : onClickFollow}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </FollowBtn>
      )}
    </FollowLi>
  );
}
