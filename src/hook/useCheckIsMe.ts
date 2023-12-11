interface IProps {
  userUid: string;
  myUid: string;
}

export default function useCheckIsMe({
  userUid,
  myUid,
}: IProps) {
  const isMe = userUid === myUid

  return { isMe };
}
