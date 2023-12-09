import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}

export default function useCheckFollow({ myProfile, userProfile }: IProps) {
  const isFollow = myProfile!.followingList.includes(userProfile.uid);
  const isMe = userProfile.uid === myProfile?.uid;

  return { isFollow, isMe };
}
