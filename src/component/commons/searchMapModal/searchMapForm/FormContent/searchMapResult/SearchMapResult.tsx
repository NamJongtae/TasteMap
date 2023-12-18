import React from "react";
import { SearchMapResultList } from "./searchMapResultList/SearchMapResultList";
import SearchMapTip from "./searchMapTip/SearchMapTip";
import ScrollLoading from "../../../../loading/ScrollLoading";
import NoneSearchMapResult from "./noneSearchMapResult/NoneSearchMapResult";
import { IMapData } from "../../../../../../api/apiType";
import { useFormContext } from "react-hook-form";

interface IProps {
  isSearched: boolean;
  searchResult: IMapData[] | undefined;
  searchLoading: boolean;
  isTasteMapPage: boolean;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function SearchMapResult({
  isSearched,
  searchResult,
  searchLoading,
  isTasteMapPage,
  lastResultSelectBtnRef
}: IProps) {
  const { getValues } = useFormContext();
  const searchKeyword = getValues("searchKeyword");

  if (!isSearched) {
    return <SearchMapTip />;
  }

  if (isSearched && (searchResult?.length || 0) > 0) {
    return (
      <SearchMapResultList
        data={searchResult}
        isTasteMapPage={isTasteMapPage}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
      />
    );
  }

  if (isSearched && searchLoading) {
    return <ScrollLoading />;
  }

  if (isSearched && (searchResult?.length || 0) === 0) {
    return <NoneSearchMapResult searchKeyword={searchKeyword} />;
  }

  return null;
}
