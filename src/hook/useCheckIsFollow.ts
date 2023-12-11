interface IProps {
  userUid: string;
  myFollowingList: string[];
}

export default function useCheckIsFollow({ userUid, myFollowingList }: IProps) {
  const isFollow = myFollowingList.includes(userUid);

  return { isFollow };
}
