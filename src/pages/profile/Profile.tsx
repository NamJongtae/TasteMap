import React from "react";
import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import Header from "../../compoent/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Profile() {
  const isOpenFollowModal = useSelector(
    (state: RootState) => state.profile.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.profile.isOpenFollowingModal
  );

  return (
    <>
      <>
        <Wrapper>
          <Header type='profile' />
          <ProfileInfo />
          <ProfilePost />
        </Wrapper>
        {isOpenFollowModal && <FollowModal isFollower={true} />}
        {isOpenFollowingModal && <FollowModal isFollower={false} />}
      </>
    </>
  );
}
