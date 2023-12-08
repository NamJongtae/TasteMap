import React from "react";
import { SearchResultList } from "./searchResultList/SearchResultList";
import SearchTip from "./searchTip/SearchTip";
import ScrollLoading from "../../loading/ScrollLoading";
import NoneSearchResult from "./noneSearchResult/NoneSearchResult";
import { IMapData } from "../../../../api/apiType";

interface IProps {
  isSearched: boolean;
  searchKeyword: string;
  searchResult: IMapData[] | undefined;
  selectedResultMapHandler: (data: IMapData) => void;
  searchLoading: boolean;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function SearchResult({
  isSearched,
  searchKeyword,
  searchResult,
  selectedResultMapHandler,
  searchLoading,
  lastResultSelectBtnRef
}: IProps) {
  if (!isSearched) {
    return <SearchTip />;
  }

  if (isSearched && (searchResult?.length || 0) > 0) {
    return (
      <SearchResultList
        data={searchResult}
        selectedResultMapHandler={selectedResultMapHandler}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
      />
    );
  }

  if (isSearched && searchLoading) {
    return <ScrollLoading />;
  }

  if (isSearched && (searchResult?.length || 0) === 0) {
    return <NoneSearchResult searchKeyword={searchKeyword} />;
  }

  return null;
}
