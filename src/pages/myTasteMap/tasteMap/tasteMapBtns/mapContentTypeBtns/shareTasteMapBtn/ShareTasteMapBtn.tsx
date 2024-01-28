import React from "react";
import { ShareBtn } from "../../../TasteMap.styles";
import { useTasteMapShare } from "../../../../../../hook/logic/TasetMap/useTasteMapShare";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { TProfile } from "../../../../../../types/types";

interface IProps {
  profile: TProfile | undefined;
}

export default function ShareTasteMapBtn({ profile }: IProps) {
  const { shareTasteMapHanlder } = useTasteMapShare({ profile });
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <ShareBtn
      onClick={shareTasteMapHanlder}
      aria-label='공유'
      $isWebpSupported={isWebpSupported}
    />
  );
}
