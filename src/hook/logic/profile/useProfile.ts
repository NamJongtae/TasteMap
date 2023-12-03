import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback } from "react";
import { userSlice } from "../../../slice/userSlice";
import { useUpdateProfileMutation } from "../../query/profile/useUpdateProfileMutation";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { useUserProfileQuery } from "../../query/profile/useUserProfileQuery";
import { useParams } from "react-router-dom";

export const useProfile = () => {
  const isOpenProfileUpdateModal = useSelector(
    (state: RootState) => state.user.isOpenUpdateProfileModal
  );
  const isOpenFollowerModal = useSelector(
    (state: RootState) => state.user.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );
  const dispatch = useDispatch<AppDispatch>();

  const openProfileUpdateModalHandler = useCallback(() => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(true));
  }, []);

  const closeProfileUpdateModalHandler = useCallback(() => {
    dispatch(userSlice.actions.setIsOpenUpdateProfileModal(false));
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
      closeProfileUpdateModalHandler();
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

  return {
    myProfile,
    userProfile,
    isOpenProfileUpdateModal,
    isOpenFollowerModal,
    isOpenFollowingModal,
    openProfileUpdateModalHandler,
    openFollowersModalHandler,
    openFollowingModalHanlder,
    closeFollowersModalHandler,
    closeFollowingModalHandler,
    updateProfileMutate,
    loadProfileLoading,
    isInvaildPoage,
    closeProfileUpdateModalHandler
  };
};
