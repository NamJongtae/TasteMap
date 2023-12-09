import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";
import { useUnfollowMutation } from "../../../query/profile/useUnfollowMutation";

interface IProps {
  myProfile: IMyProfileData;
  userProfile: IUserProfileData;
}
export const useUnfollowFetchData = ({ myProfile, userProfile }: IProps) => {
  const { mutate: unfollowMutate } = useUnfollowMutation();

  const unfollowHandler = () => {
    unfollowMutate({ myUid: myProfile!.uid, userUid: userProfile.uid });
  };

  return { unfollowHandler };
};
