import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo.container";
import ProfilePost from "./ProfilePost";
import Header from "../../component/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import ProfileEditModal from "./profileEditModal/ProfileEditModal.container";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";
import TopButton from "../../component/commons/topButton/TopButton";
import Loading from "../../component/commons/loading/Loading";
import { useUpdateProfileMutation } from "../../hook/query/profile/useUpdateProfileMutation";
import { useCallback, useState } from "react";
import { useUserProfileQuery } from "../../hook/query/profile/useUserProfileQuery";
import { useParams } from "react-router-dom";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import { useMyProfileQuery } from "../../hook/query/profile/useMyProfileQuery";
import { userSlice } from "../../slice/userSlice";

export default function Profile() {
  const [isOpenProfileUpdateModal, setIsOpenProfileUpdateModal] =
    useState(false);
  const isOpenFollowerModal = useSelector(
    (state: RootState) => state.user.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );
  const dispatch = useDispatch<AppDispatch>();

  const openProfileUpdateModalHandler = useCallback(() => {
    document.body.style.overflow = "hidden";
    setIsOpenProfileUpdateModal(true);
  }, []);

  const closeProfileEditModalHandler = useCallback(() => {
    document.body.style.overflow = "auto";
    setIsOpenProfileUpdateModal(false);
  }, []);

  const openFollowersModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(true));
  };

  const openFollowingModalHanlder = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(true));
  };

  const closeFollowersModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowerModal(false));
  };

  const closeFollowingModalHandler = () => {
    dispatch(userSlice.actions.setIsOpenFollowingModal(false));
  };

  const { uid } = useParams();

  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const { mutate: updateProfileMutate, isPending: updateProfileLoading } =
    useUpdateProfileMutation(() => {
      closeProfileEditModalHandler();
    });

  const { data: myProfile, isPending: myProfileLoading } = useMyProfileQuery(
    myInfo.uid
  );

  const { data: userProfile, isFetching: userProfileLoading } =
    useUserProfileQuery(uid || myInfo.uid);

  const loadProfileLoading =
    updateProfileLoading || (uid ? userProfileLoading : myProfileLoading);

  const isInvaildPoage = uid
    ? !userProfile?.uid && !userProfileLoading
    : !myProfile?.uid && !myProfileLoading;

  if (loadProfileLoading) {
    return <Loading />;
  }

  if (isInvaildPoage) {
    return (
      <>
        <Header type='profile' />
        <InvalidPage text='유효하지 않은 계정입니다.' />
      </>
    );
  }

  return (
    <>
      <Wrapper>
        <Header type='profile' />
        <ProfileInfo
          myProfile={myProfile || ({} as IMyProfileData)}
          userProfile={userProfile || ({} as IUserProfileData)}
          openFollowersModalHandler={openFollowersModalHandler}
          openFollowingModalHanlder={openFollowingModalHanlder}
          openProfileUpdateModalHandler={openProfileUpdateModalHandler}
        />
        <ProfilePost />
        <TopButton />
      </Wrapper>
      {isOpenFollowerModal && (
        <FollowModal
          isFollower={true}
          closeFollowersModalHandler={closeFollowersModalHandler}
          closeFollowingModalHandler={closeFollowingModalHandler}
        />
      )}
      {isOpenFollowingModal && (
        <FollowModal
          isFollower={false}
          closeFollowersModalHandler={closeFollowersModalHandler}
          closeFollowingModalHandler={closeFollowingModalHandler}
        />
      )}
      {isOpenProfileUpdateModal && (
        <ProfileEditModal
          updateProfileMutate={updateProfileMutate}
          closeProfileEditModalHandler={closeProfileEditModalHandler}
          myProfile={myProfile || ({} as IMyProfileData)}
        />
      )}
    </>
  );
}
