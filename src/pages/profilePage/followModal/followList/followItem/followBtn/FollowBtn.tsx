import React from "react";
import { StyledFollowBtn } from "../../../followModal.styles";
import { IFollowData, IMyProfileData } from "../../../../../../api/apiType";
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
  const { followHandler } = useFollowFetchData({
    myUid: myProfile.uid,
    userUid: followData.uid
  });

  return (
    <StyledFollowBtn
      onClick={followHandler}
      ref={isLastItem ? lastItemFollowBtnRef : null}
    >
      팔로우
    </StyledFollowBtn>
  );
}
