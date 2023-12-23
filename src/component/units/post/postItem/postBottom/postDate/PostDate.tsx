import { Timestamp } from "firebase/firestore";
import React from "react";
import { useMemoFormattedDate } from "../../../../../../hook/useMemoFormattedDate";
import { PostDateFormatted } from "../../../postList/post.styles";

interface IProps {
  createdAt: Timestamp;
}

export default function PostDate({ createdAt }: IProps) {
  const time = createdAt.seconds * 1000;
  const memoizedFormattedDate = useMemoFormattedDate(time);

  return (
    <PostDateFormatted dateTime={new Date(time).toISOString()}>
      {memoizedFormattedDate}
    </PostDateFormatted>
  );
}
