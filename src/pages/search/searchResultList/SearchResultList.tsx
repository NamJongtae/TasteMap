import React from "react";
import { InfinityScrollTarget, SearchList } from "../search.styles";
import SearchResultItem from "./searchResultItem/SearchResultItem";
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
import { useSearchUserInfiniteScroll } from "../../../hook/logic/search/searchResultList/useSearchUserInfiniteScroll";
import { IMyProfileData } from "../../../types/apiTypes";
import NoSearchResult from "./NoSearchResult/NoSearchResult";

interface IProps {
  myProfile: IMyProfileData;
}

export default function SearchResultList({ myProfile }: IProps) {
  const {
    searchKeyword,
    infiniteScrollRef,
    searchResult,
    isPending,
    isFetchingNextPage,
    isRefetching,
    isNoSearchResult
  } = useSearchUserInfiniteScroll();

  if (!searchKeyword) {
    return null;
  }

  if (isPending || isRefetching) {
    return (
      <SearchList>
        <ScrollLoading />
      </SearchList>
    );
  }

  if (isNoSearchResult) {
    return (
      <SearchList>
        <NoSearchResult searchKeyword={searchKeyword} />
      </SearchList>
    );
  }

  return (
    <SearchList>
      {searchResult?.map((item) => {
        return (
          <SearchResultItem
            key={item.uid}
            userProfile={item}
            myProfile={myProfile}
            searchKeyword={searchKeyword}
          />
        );
      })}
      <InfinityScrollTarget ref={infiniteScrollRef} />
      {isFetchingNextPage && <ScrollLoading />}
    </SearchList>
  );
}
