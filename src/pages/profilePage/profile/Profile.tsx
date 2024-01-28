import { Wrapper } from "../profilePage.styles";
import ProfileInfo from "./profileInfo/ProfileInfo";
import ProfilePost from "./profilePost/ProfilePost";
import Header from "../../../component/commons/layouts/header/Header";
import TopButton from "../../../component/commons/topButton/TopButton";
import { IMyProfileData, IUserProfileData } from "../../../types/apiTypes";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export default function Profile({ myProfile, userProfile }: IProps) {
  return (
    <Wrapper>
      <Header type='profile' />
      <ProfileInfo
        myProfile={myProfile || ({} as IMyProfileData)}
        userProfile={userProfile || ({} as IUserProfileData)}
      />
      <ProfilePost myProfile={myProfile || ({} as IMyProfileData)} />
      <TopButton />
    </Wrapper>
  );
}
