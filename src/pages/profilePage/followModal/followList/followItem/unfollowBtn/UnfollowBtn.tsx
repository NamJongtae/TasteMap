import React from "react";
import { StyledUnfollowBtn } from "../../../followModal.styles";
import { IFollowData, IMyProfileData } from "../../../../../../api/apiType";
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
  const { unfollowHandler } = useUnfollowFetchData({
    myUid: myProfile.uid,
    userUid: followData.uid
  });

  return (
    <StyledUnfollowBtn
      onClick={unfollowHandler}
      ref={isLastItem ? lastItemFollowBtnRef : null}
    >
      언팔로우
    </StyledUnfollowBtn>
  );
}
