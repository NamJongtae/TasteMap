import React, { useEffect } from "react";
import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import Header from "../../compoent/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ProfileEditModal from "./profileEditModal/ProfileEditModal.container";
import InvalidPage from "../../compoent/commons/invalidPage/InvalidPage";
import {
  thunkFetchMyProfile,
  thunkFetchUserProfile
} from "../../slice/profileSlice";
import { useParams } from "react-router-dom";

export default function Profile() {
  const { uid } = useParams();
  const userData = useSelector((state: RootState) => state.user.data);
  const isOpenFollowModal = useSelector(
    (state: RootState) => state.profile.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.profile.isOpenFollowingModal
  );
  const invalidPage = useSelector(
    (state: RootState) => state.profile.isInvalidPage
  );
  const isOpenProfileEditModal = useSelector(
    (state: RootState) => state.profile.isOpenProfileEditModal
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(thunkFetchUserProfile(uid || userData.uid || ""));
    dispatch(thunkFetchMyProfile(userData.uid || ""));
  }, [uid]);

  return (
    <>
      {invalidPage ? (
        <>
          <Header type='profile' />
          <InvalidPage text='유효하지 않은 계정입니다.' />
        </>
      ) : (
        <>
          <Wrapper>
            <Header type='profile' />
            <ProfileInfo />
            <ProfilePost />
          </Wrapper>
          {isOpenFollowModal && <FollowModal isFollower={true} />}
          {isOpenFollowingModal && <FollowModal isFollower={false} />}
          {isOpenProfileEditModal && <ProfileEditModal />}
        </>
      )}
    </>
  );
}
