import React from "react";
import Loading from "../../component/commons/loading/Loading";
import {
  InvaildMap,
  InvaildMapImg,
  InvaildMapText
} from "./ShareTasteMap.styles";
import { useShareTasteMap } from "../../hook/logic/shareTasteMap/useShareTasteMap";
import { resolveWebp } from "../../library/resolveWebp";
import TasteMap from '../myTasteMap/tasteMap/TasteMap';
import ShareTasteMapMetaTag from "./ShareTasteMapMeatTag/ShareTasteMapMetaTag";
import ShareTasteMapHeader from "./ShareTasteMapHeader/ShareTasteMapHeader";

export default function ShareTasteMap() {
  const { userProfile, userIsFetching, isInvalidMap } = useShareTasteMap();

  if (userIsFetching) {
    return <Loading />;
  }

  if (isInvalidMap) {
    return (
      <InvaildMap>
        <InvaildMapImg
          src={resolveWebp("/assets/webp/icon-cloche.webp", "svg")}
        />
        <InvaildMapText>유효하지 않은 맛집 지도입니다.</InvaildMapText>
      </InvaildMap>
    );
  }

  return (
    <>
      <ShareTasteMapMetaTag userProfile={userProfile} />
      <ShareTasteMapHeader />
      <TasteMap profile={userProfile} isSharePage={true} />
    </>
  );
}
