import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo.container";
import ProfilePost from "./ProfilePost";
import Header from "../../compoent/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProfileEditModal from "./profileEditModal/ProfileEditModal.container";
import InvalidPage from "../../compoent/commons/invalidPage/InvalidPage";

export default function Profile() {
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
