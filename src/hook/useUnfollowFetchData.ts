import { useUnfollowMutation } from "./query/profile/useUnfollowMutation";

interface IProps {
  userUid: string;
  myUid: string;
}

export const useUnfollowFetchData = ({ userUid, myUid }: IProps) => {
  const { mutate: unfollowMutate } = useUnfollowMutation();

  const unfollowHandler = () => {
    unfollowMutate({ myUid, userUid });
  };

  return { unfollowHandler };
};
