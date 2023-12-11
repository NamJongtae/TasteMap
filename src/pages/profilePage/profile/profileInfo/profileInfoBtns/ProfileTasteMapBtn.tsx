import React from "react";
import { useMoveTasteMapPage } from "../../../../../hook/logic/profile/profileInfo/useMoveTasteMapPage";
import { ProfileBtn } from "../profileInfo.styles";

export const ProfileTasteMapBtn = () => {
  const { moveTasteMapPageHandler } = useMoveTasteMapPage();

  return <ProfileBtn onClick={moveTasteMapPageHandler}>맛집 지도</ProfileBtn>;
};
