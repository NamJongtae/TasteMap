import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";
import { useFollowMutation } from "../../../query/profile/useFollowMutation";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}

export const useFollowFetchData = ({ myProfile, userProfile }: IProps) => {
  const { mutate: followMuate } = useFollowMutation();

  const followHandler = () => {
    followMuate({ myUid: myProfile!.uid, userUid: userProfile.uid });
  };

  return { followHandler };
};
