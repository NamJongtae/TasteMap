import React from "react";
import {
  FollowBtn,
  FollowLi,
  UserImg,
  UserLink,
  UserName
} from "./followModal.styles";
import { IFollowData } from "../../../api/apiType";
import { isMobile } from "react-device-detect";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import { useFollowItem } from "../../../hook/logic/followModal/useFollowItem";
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
  const {
    isFollow,
    myProfile,
    unFollowHandler,
    followHandler,
    profileLinkHandler
  } = useFollowItem({
    data,
    isFollower
  });

  return (
    <FollowLi>
      <UserLink
        to={`/profile/${data.uid}`}
        replace={isMobile}
        onClick={profileLinkHandler}
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
      {myProfile?.uid !== data.uid && (
        <FollowBtn
          isFollow={isFollow}
          onClick={isFollow ? unFollowHandler : followHandler}
          ref={isLastItem ? lastItemFollowBtnRef : null}
        >
          {isFollow ? "언팔로우" : "팔로우"}
        </FollowBtn>
      )}
    </FollowLi>
  );
}
