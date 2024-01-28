import React from "react";
import { MapDesc, KakaomapWrapper } from "../../TasteMap.styles";
import Kakaomap from "../../../../../component/units/kakaomap/Kakaomap";
import { TProfile } from "../../../../../types/types";

interface IProps {
  profile: TProfile | undefined;
  isSharePage: boolean;
}

export default function KakaoampSection({ profile, isSharePage }: IProps) {
  return (
    <KakaomapWrapper>
      <MapDesc>마커 클릭 시 맛집 정보가 지도 아래 표시 됩니다.</MapDesc>
      {profile?.storedMapList && (
        <Kakaomap
          items={profile?.storedMapList}
          isTasteMapPage={true}
          isSharePage={isSharePage}
        />
      )}
    </KakaomapWrapper>
  );
}
