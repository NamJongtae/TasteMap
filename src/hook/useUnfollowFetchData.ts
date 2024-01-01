import { useFollowModalUnfollowMutation } from "./query/profile/useFollowModalUnfollowMutation";
import { useProfileUnfollowMutation } from "./query/profile/useProfileUnfollowMutation";

interface IProps {
  userUid: string;
  myUid: string;
}

export const useUnfollowFetchData = ({ userUid, myUid }: IProps) => {
  const { mutate: profileUnfollowMutate } = useProfileUnfollowMutation();
  const { mutate: followModalUnfollowMutate } =
    useFollowModalUnfollowMutation();

  const profileUnFollowHandler = () => {
    profileUnfollowMutate({ myUid, userUid });
  };

  const followModalUnfollowHandler = () => {
    followModalUnfollowMutate({ myUid, userUid });
  };

  return {
    profileUnFollowHandler,
    followModalUnfollowHandler,
  };
};
