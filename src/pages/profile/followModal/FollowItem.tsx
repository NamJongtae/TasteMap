import React, { useLayoutEffect, useState } from "react";
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
import { isMobile } from "react-device-detect";
import { optModalTabFocus } from "../../../library/optModalTabFocus";

interface IProps {
  data: IFollowData;
  idx: number;
  isLastItem: boolean;
  isFollower: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function FollowItem({
  data,
  idx,
  isLastItem,
  isFollower,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef
}: IProps) {
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
    if (isFollower) {
      dispatch(profileSlice.actions.setIsOpenFollowerModal(false));
    } else {
      dispatch(profileSlice.actions.setIsOpenFollowingModal(false));
    }
  };

  useLayoutEffect(() => {
    if (data.uid && myProfileData.followingList?.includes(data.uid)) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  }, []);

  return (
    <FollowLi>
      <UserLink
        to={`/profile/${data.uid}`}
        replace={isMobile}
        onClick={onClickProfileLink}
        ref={idx === 0 ? firstItemLinkRef : null}
        onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
          if (idx === 0) {
            optModalTabFocus(e, closeBtnRef.current);
          }
        }}
      >
        <UserImg src={data.photoURL} alt='유저 프로필 이미지' />
        <UserName>{data.displayName}</UserName>
      </UserLink>
      {myProfileData.uid !== data.uid && (
        <FollowBtn
          isFollow={isFollow}
          onClick={isFollow ? onClickUnFollow : onClickFollow}
          ref={isLastItem ? lastItemFollowBtnRef : null}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </FollowBtn>
      )}
    </FollowLi>
  );
}
