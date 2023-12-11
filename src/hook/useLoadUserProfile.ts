import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import { useUserProfileQuery } from "./query/profile/useUserProfileQuery";
import { useParams } from "react-router-dom";

export const useLoadUserProfile = () => {
  const { uid } = useParams();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const {
    data: userProfile,
    isFetching: loadUserProfileLoading,
    isError: userProfileError
  } = useUserProfileQuery(uid || myInfo.uid);

  if (userProfileError) {
    sweetToast("유저의 프로필 정보를 불러올 수 없습니다!", "warning");
  }

  return { userProfile, loadUserProfileLoading, userProfileError };
};
