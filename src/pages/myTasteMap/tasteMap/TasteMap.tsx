import React from "react";
import { Wrapper } from "./TasteMap.styles";
import TasteMapBtns from "./tasteMapBtns/TasteMapBtns";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import SearchMapModal from "../../../component/commons/searchMapModal/SearchMapModal";
import TasteMapContent from "./tasteMapContent/TasteMapContent";
import TasteMapTitlte from "./tasteMapTitle/TasteMapTitlte";
import { TProfile } from "../../../types/types";

interface IProps {
  profile: TProfile | undefined;
  isSharePage: boolean;
}
export default function TasteMap({ profile, isSharePage }: IProps) {
  const isOpenSearchMapModal = useSelector(
    (state: RootState) => state.search.isOpenSearchMapModal
  );

  return (
    <Wrapper>
      <TasteMapTitlte profile={profile} isSharePage={isSharePage} />

      <TasteMapBtns profile={profile} isSharePage={isSharePage} />

      <TasteMapContent profile={profile} isSharePage={isSharePage} />

      {isOpenSearchMapModal && <SearchMapModal isTasteMapPage={true} />}
    </Wrapper>
  );
}
