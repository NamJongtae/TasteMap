import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo.container";
import ProfilePost from "./ProfilePost";
import Header from "../../compoent/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProfileEditModal from "./profileEditModal/ProfileEditModal.container";
import InvalidPage from "../../compoent/commons/invalidPage/InvalidPage";
import TopButton from "../../compoent/commons/topButton/TopButton";
import Loading from "../../compoent/commons/loading/Loading";

export default function Profile() {
  const isOpenFollowModal = useSelector(
    (state: RootState) => state.user.isOpenFollowerModal
  );
  const isOpenFollowingModal = useSelector(
    (state: RootState) => state.user.isOpenFollowingModal
  );
  const invaildUserProfile = useSelector(
    (state: RootState) => state.user.invaildUserProfile
  );
  const isOpenProfileEditModal = useSelector(
    (state: RootState) => state.user.isOpenProfileEditModal
  );
  const updateProfileLoading = useSelector(
    (state: RootState) => state.user.updateProfileLoading
  );

  return (
    <>
      {invaildUserProfile ? (
        <>
          <Header type='profile' />
          <InvalidPage text='유효하지 않은 계정입니다.' />
        </>
      ) : updateProfileLoading ? (
        <Loading />
      ) : (
        <>
          <Wrapper>
            <Header type='profile' />
            <ProfileInfo />
            <ProfilePost />
            <TopButton />
          </Wrapper>
          {isOpenFollowModal && <FollowModal isFollower={true} />}
          {isOpenFollowingModal && <FollowModal isFollower={false} />}
          {isOpenProfileEditModal && <ProfileEditModal />}
        </>
      )}
    </>
  );
}
