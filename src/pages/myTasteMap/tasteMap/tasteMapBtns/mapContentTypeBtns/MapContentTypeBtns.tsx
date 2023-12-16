import React from "react";
import OpenSearchMapModalBtn from "./openSearchMapModalBtn/OpenSearchMapModalBtn";
import ShareTasteMapBtn from "./shareTasteMapBtn/ShareTasteMapBtn";
import { IMyProfileData, IUserProfileData } from "../../../../../api/apiType";

interface IProps {
  profile: IMyProfileData | IUserProfileData | undefined;
}

export default function MapContentTypeBtns({ profile }: IProps) {
  return (
    <>
      <OpenSearchMapModalBtn />
      <ShareTasteMapBtn profile={profile} />
    </>
  );
}
