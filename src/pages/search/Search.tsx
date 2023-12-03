import React from "react";
import { Wrapper } from "./search.styles";
import Header from "../../component/commons/layouts/header/Header";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import TopButton from "../../component/commons/topButton/TopButton";
import Loading from "../../component/commons/loading/Loading";
import { useSearch } from "../../hook/logic/search/useSearch";

export default function Search() {
  const {
    myProfile,
    myProfileIsPending,
    isError,
    searchResult,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    isRefetching
  } = useSearch();

  return (
    <>
      {myProfileIsPending && <Loading />}
      <Header type='search' />
      <Wrapper>
        <h2 className='a11y-hidden'>계정 검색</h2>
        <SearchInput />
        {isError ? null : (
          <SearchList
            myProfile={myProfile}
            searchResult={searchResult}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isPending={isPending}
            isFetchingNextPage={isFetchingNextPage}
            isRefetching={isRefetching}
          />
        )}
      </Wrapper>
      <TopButton />
    </>
  );
}
