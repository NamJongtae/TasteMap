import { useFollowModalFollowMutation } from "./query/profile/useFollowModalFollowMutation";
import { useProfileFollowMutation } from "./query/profile/useProfileFollowMutation";

interface IProps {
  userUid: string;
  myUid: string;
}

export const useFollowFetchData = ({ myUid, userUid }: IProps) => {
  const { mutate: profileFollowMuate } = useProfileFollowMutation();
  const { mutate: followModalFollowMutate } =
  useFollowModalFollowMutation();

  const profileFollowHandler = () => {
    profileFollowMuate({ myUid, userUid });
  };

  const followModalFollowHandler = () => {
    followModalFollowMutate({ myUid, userUid });
  };

  return {
    profileFollowHandler,
    followModalFollowHandler
  };
};
