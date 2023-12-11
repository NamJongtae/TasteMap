import React from "react";
import {
  ProfileImgDescItem,
  ProfileImgDescList
} from "../../../ProfileUpdateModal.styles";

interface IProps {
  descList: string[];
}

export default function ProfileUpdateImgDesc({ descList }: IProps) {
  return (
    <ProfileImgDescList>
      {descList.map((desc) => (
        <ProfileImgDescItem key={desc}>⦁ {desc}</ProfileImgDescItem>
      ))}
    </ProfileImgDescList>
  );
}
