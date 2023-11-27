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
import { useFollowMutation } from "../../../hook/query/profile/useFollowMutation";
import { useUnfollowMutation } from "../../../hook/query/profile/useUnfollowMutation";
import { useMyProfileQuery } from "../../../hook/query/profile/useMyProfileQuery";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
interface IProps {
  data: IFollowData;
  idx: number;
  isLastItem: boolean;
  isFollower: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
  closeFollowersModalHandler: () => void;
  closeFollowingModalHandler: () => void;
}

export default function FollowItem({
  data,
  idx,
  isLastItem,
  isFollower,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef,
  closeFollowersModalHandler,
  closeFollowingModalHandler
}: IProps) {
  const { mutate: followMutate } = useFollowMutation();
  const { mutate: unfollowMutate } = useUnfollowMutation();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const { data: myProfile } = useMyProfileQuery(myInfo.uid);

  const isFollow = myProfile?.followingList.includes(data.uid) || false;

  const onClickUnFollow = () => {
    if (myProfile?.uid && data.uid) {
      unfollowMutate({ myUid: myProfile.uid, userUid: data.uid });
    }
  };

  const onClickFollow = () => {
    if (myProfile?.uid && data.uid) {
      followMutate({ myUid: myProfile.uid, userUid: data.uid });
    }
  };

  const onClickProfileLink = () => {
    if (isFollower) {
      closeFollowersModalHandler();
    } else {
      closeFollowingModalHandler();
    }
  };

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
      {myProfile?.uid !== data.uid && (
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
