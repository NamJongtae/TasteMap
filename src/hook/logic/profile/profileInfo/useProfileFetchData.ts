import { useLoadMyProfile } from "../../../useLoadMyProfile";
import { useLoadUserProfile } from "../../../useLoadUserProfile";

export const useProfileFetchData = () => {
  const { myProfile, loadMyProfileLoading } = useLoadMyProfile();
  const { userProfile, loadUserProfileLoading } = useLoadUserProfile();

  const loadProfileLoading = loadUserProfileLoading || loadMyProfileLoading;

  const isNoProfileData = !userProfile?.uid;

  return { myProfile, userProfile, loadProfileLoading, isNoProfileData };
};
