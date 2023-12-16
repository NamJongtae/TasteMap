import React from "react";
import { BtnsWrapper, ListBtn, MapBtn } from "../TasteMap.styles";
import { usetasteMapContentTypeController } from "../../../../hook/logic/TasetMap/useTasteMapContentTypeController";
import MapContentTypeBtns from "./mapContentTypeBtns/MapContentTypeBtns";
import { IMyProfileData, IUserProfileData } from "../../../../api/apiType";

interface IProps {
  profile: IMyProfileData | IUserProfileData | undefined;
  isSharePage: boolean;
}

export default function TasteMapBtns({ profile, isSharePage }: IProps) {
  const { contentType, activeMapTypeHanlder, activeListTypeHanlder } =
    usetasteMapContentTypeController();

  return (
    <BtnsWrapper>
      <MapBtn
        onClick={activeMapTypeHanlder}
        contentType={contentType}
        isSharePage={isSharePage}
      >
        지도
      </MapBtn>
      <ListBtn
        onClick={activeListTypeHanlder}
        contentType={contentType}
        isSharePage={isSharePage}
      >
        목록
      </ListBtn>
      {!isSharePage && <MapContentTypeBtns profile={profile} />}
    </BtnsWrapper>
  );
}
