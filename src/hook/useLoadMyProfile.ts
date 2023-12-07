import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useMyProfileQuery } from "./query/profile/useMyProfileQuery";
import { sweetToast } from "../library/sweetAlert/sweetAlert";

export const useLoadMyProfile = () => {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const {
    data: myProfile,
    isPending: loadMyProfileLoading,
    isError: myProfileIsError
  } = useMyProfileQuery(myInfo.uid);

  if (myProfileIsError) {
    sweetToast("나의 프로필 정보를 불러올 수 없습니다!", "warning");
  }

  return { myProfile, loadMyProfileLoading, myProfileIsError };
};
