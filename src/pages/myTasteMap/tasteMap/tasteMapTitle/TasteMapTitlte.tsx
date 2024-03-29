import React from "react";
import { ShareTasteMapTitle, ShareTasteMapTitleImg } from "../TasteMap.styles";
import { TProfile } from "../../../../types/types";

interface IProps {
  profile: TProfile | undefined;
  isSharePage: boolean;
}

export default function TasteMapTitlte({ profile, isSharePage }: IProps) {
  return isSharePage ? (
    <ShareTasteMapTitle>
      <ShareTasteMapTitleImg
        src={"/assets/icon-searchMap.svg"}
        alt='맛집지도'
      />
      {profile?.displayName}님의 맛집 지도
    </ShareTasteMapTitle>
  ) : (
    <h2 className='a11y-hidden'>나의 맛집 지도</h2>
  );
}
