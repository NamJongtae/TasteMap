import Header from "../../component/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";
import Loading from "../../component/commons/loading/Loading";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import { useProfileFetchData } from "../../hook/logic/profile/profileInfo/useProfileFetchData";
import { useCheckIsMyProfilePage } from "../../hook/logic/profile/profileInfo/useCheckIsMyProfilePage";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Profile from "./profile/Profile";
import ProfileUpdateModal from "./profileUpdateModal/ProfileUpdateModal";
import CommentModalWrapper from "../../component/units/comment/CommentModalWrapper";

export default function ProfilePage() {
  const isOpenFollowerModal = useSelector(
    (state: RootState) => state.user.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );
  const isOpenProfileUpdateModal = useSelector(
    (state: RootState) => state.user.isOpenUpdateProfileModal
  );
  const isOpenCommentModal = useSelector(
    (state: RootState) => state.comment.isOpenCommentModal
  );

  const { myProfile, userProfile, loadProfileLoading, isNoProfileData } =
    useProfileFetchData();

  useCheckIsMyProfilePage();

  if (loadProfileLoading) {
    return <Loading />;
  }

  if (isNoProfileData) {
    return (
      <>
        <Header type='profile' />
        <InvalidPage text='유효하지 않은 프로필입니다.' />
      </>
    );
  }

  return (
    <>
      <Profile
        myProfile={myProfile || ({} as IMyProfileData)}
        userProfile={userProfile || ({} as IUserProfileData)}
      />
      {isOpenFollowerModal && (
        <FollowModal
          myProfile={myProfile || ({} as IMyProfileData)}
          followModalType={"FOLLOWER"}
        />
      )}
      {isOpenFollowingModal && (
        <FollowModal
          myProfile={myProfile || ({} as IMyProfileData)}
          followModalType={"FOLLOWING"}
        />
      )}
      {isOpenProfileUpdateModal && (
        <ProfileUpdateModal myProfile={myProfile || ({} as IMyProfileData)} />
      )}
      {isOpenCommentModal && <CommentModalWrapper postType={"PROFILE"} />}
    </>
  );
}
