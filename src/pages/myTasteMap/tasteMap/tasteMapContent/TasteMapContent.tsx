import React from "react";
import KakaoampSection from "./kakaomapSection/KakaoampSection";
import MapTypeMarkerData from "./mapTypeMarkerData/MapTypeMarkerDataList";
import ListTypeMarkerData from "./listTypeMarkerData/ListTypeMarkerData";
import { EMapContentType } from "../../../../slice/tasteMapSlice";
import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";

interface IProps {
  profile: IMyProfileData | IUserProfileData | undefined;
  isSharePage: boolean;
}
export default function TasteMapContent({ profile, isSharePage }: IProps) {
  const contentType = useSelector(
    (state: RootState) => state.tasteMap.contentType
  );

  return contentType === EMapContentType.MAP ? (
    <>
      <KakaoampSection profile={profile} isSharePage={isSharePage} />
      <MapTypeMarkerData isSharePage={isSharePage} />
    </>
  ) : (
    <ListTypeMarkerData
      items={profile?.storedMapList}
      isSharePage={isSharePage}
    />
  );
}
