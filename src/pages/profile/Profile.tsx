import { Wrapper } from "./profile.styles";
import ProfileInfo from "./ProfileInfo";
import ProfilePost from "./ProfilePost";
import Header from "../../component/commons/layouts/header/Header";
import FollowModal from "./followModal/FollowModal";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";
import TopButton from "../../component/commons/topButton/TopButton";
import Loading from "../../component/commons/loading/Loading";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import { useProfile } from "../../hook/logic/profile/useProfile";
import ProfileUpdateModal from "./profileUpdateModal/ProfileUpdateModal";

export default function Profile() {
  const {
    myProfile,
    userProfile,
    isOpenProfileUpdateModal,
    isOpenFollowerModal,
    isOpenFollowingModal,
    updateProfileMutate,
    loadProfileLoading,
    isInvaildPoage,
    closeProfileUpdateModalHandler
  } = useProfile();

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
        />
        <ProfilePost myProfile={myProfile || ({} as IMyProfileData)} />
        <TopButton />
      </Wrapper>
      {isOpenFollowerModal && <FollowModal isFollower={true} />}
      {isOpenFollowingModal && <FollowModal isFollower={false} />}
      {isOpenProfileUpdateModal && (
        <ProfileUpdateModal
          updateProfileMutate={updateProfileMutate}
          closeProfileUpdateModalHandler={closeProfileUpdateModalHandler}
          myProfile={myProfile || ({} as IMyProfileData)}
        />
      )}
    </>
  );
}
