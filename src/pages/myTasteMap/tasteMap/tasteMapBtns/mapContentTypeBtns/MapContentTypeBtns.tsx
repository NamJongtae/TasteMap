import React from "react";
import OpenSearchMapModalBtn from "./openSearchMapModalBtn/OpenSearchMapModalBtn";
import ShareTasteMapBtn from "./shareTasteMapBtn/ShareTasteMapBtn";
import { TProfile } from "../../../../../types/types";

interface IProps {
  profile: TProfile | undefined;
}

export default function MapContentTypeBtns({ profile }: IProps) {
  return (
    <>
      <OpenSearchMapModalBtn />
      <ShareTasteMapBtn profile={profile} />
    </>
  );
}
