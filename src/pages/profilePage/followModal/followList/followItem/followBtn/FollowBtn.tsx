import React from "react";
import { StyledFollowBtn } from "../../../followModal.styles";
import { IFollowData, IMyProfileData } from "../../../../../../types/apiTypes";
import { useFollowFetchData } from "../../../../../../hook/useFollowFetchData";

interface IProps {
  myProfile: IMyProfileData;
  followData: IFollowData;
  isLastItem: boolean;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function FollowBtn({
  myProfile,
  followData,
  isLastItem,
  lastItemFollowBtnRef
}: IProps) {
  const { followModalFollowHandler } = useFollowFetchData({
    myUid: myProfile.uid,
    userUid: followData.uid
  });

  return (
    <StyledFollowBtn
      onClick={followModalFollowHandler}
      ref={isLastItem ? lastItemFollowBtnRef : null}
    >
      팔로우
    </StyledFollowBtn>
  );
}
