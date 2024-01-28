import React from "react";
import UserInfo from "../../../../../component/commons/userInfo/UserInfo";
import { useTextHighLight } from "../../../../../hook/logic/search/searchResultItem/useTextHighLight";
import { IUserProfileData } from "../../../../../types/apiTypes";

interface IProps {
  highLightText: string;
  userProfile: IUserProfileData;
}
export default function HighLightedUserInfo({
  highLightText,
  userProfile
}: IProps) {
  const { getTextHighLight } = useTextHighLight({ highLightText });
  const highLightUserData = {
    displayName: getTextHighLight(userProfile.displayName),
    uid: userProfile.uid,
    photoURL: userProfile.photoURL
  };
  return <UserInfo userData={highLightUserData} />;
}
