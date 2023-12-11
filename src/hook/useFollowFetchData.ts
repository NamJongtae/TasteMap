import { useFollowMutation } from "./query/profile/useFollowMutation";

interface IProps {
  userUid: string;
  myUid: string;
}

export const useFollowFetchData = ({ myUid, userUid }: IProps) => {
  const { mutate: followMuate } = useFollowMutation();

  const followHandler = () => {
    followMuate({ myUid, userUid });
  };

  return { followHandler };
};
