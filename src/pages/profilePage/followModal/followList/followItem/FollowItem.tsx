import React from "react";
import { FollowLi } from "../../followModal.styles";
import { IFollowData, IMyProfileData } from "../../../../../types/apiTypes";
import { isMobile } from "react-device-detect";
import { optModalTabFocus } from "../../../../../library/optModalTabFocus";
import UserInfo from "../../../../../component/commons/userInfo/UserInfo";
import FollowBtn from "./followBtn/FollowBtn";
import UnfollowBtn from "./unfollowBtn/UnfollowBtn";
import useCheckIsFollow from "../../../../../hook/useCheckIsFollow";
import useCheckIsMe from "../../../../../hook/useCheckIsMe";

interface IProps {
  myProfile: IMyProfileData;
  data: IFollowData;
  idx: number;
  isLastItem: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
}

export default function FollowItem({
  myProfile,
  data,
  idx,
  isLastItem,
  closeBtnRef,
  firstItemLinkRef,
  lastItemFollowBtnRef
}: IProps) {
  const { isFollow } = useCheckIsFollow({
    myFollowingList: myProfile.followingList,
    userUid: data.uid
  });

  const { isMe } = useCheckIsMe({
    myUid: myProfile.uid,
    userUid: data.uid
  });

  return (
    <FollowLi>
      <UserInfo
        userData={data}
        replace={isMobile}
        userLinkRef={idx === 0 ? firstItemLinkRef : undefined}
        onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => {
          if (idx === 0) {
            optModalTabFocus(e, closeBtnRef.current);
          }
        }}
      />
      {!isMe &&
        (isFollow ? (
          <UnfollowBtn
            myProfile={myProfile}
            followData={data}
            isLastItem={isLastItem}
            lastItemFollowBtnRef={lastItemFollowBtnRef}
          />
        ) : (
          <FollowBtn
            myProfile={myProfile}
            followData={data}
            isLastItem={isLastItem}
            lastItemFollowBtnRef={lastItemFollowBtnRef}
          />
        ))}
    </FollowLi>
  );
}
