import React from "react";
import { StyledUnfollowBtn } from "../../../followModal.styles";
import { IFollowData, IMyProfileData } from "../../../../../../types/apiTypes";
import { useUnfollowFetchData } from "../../../../../../hook/useUnfollowFetchData";

interface IProps {
  myProfile: IMyProfileData;
  followData: IFollowData;
  isLastItem: boolean;
  lastItemFollowBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function UnfollowBtn({
  myProfile,
  followData,
  isLastItem,
  lastItemFollowBtnRef
}: IProps) {
  const { followModalUnfollowHandler } = useUnfollowFetchData({
    myUid: myProfile.uid,
    userUid: followData.uid
  });

  return (
    <StyledUnfollowBtn
      onClick={followModalUnfollowHandler}
      ref={isLastItem ? lastItemFollowBtnRef : null}
    >
      언팔로우
    </StyledUnfollowBtn>
  );
}
