import React, { useEffect } from "react";
import { Wrapper } from "./search.styles";
import Header from "../../component/commons/layouts/header/Header";
import SearchInput from "./SearchInput";
import SearchList from "./SearchList";
import TopButton from "../../component/commons/topButton/TopButton";
import { useSearchMutation } from "../../hook/query/search/useSearchMutation";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";
import { useMyProfileQuery } from "../../hook/query/profile/useMyProfileQuery";
import Loading from "../../component/commons/loading/Loading";

export default function Search() {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const {
    data: searchResult,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetchingNextPage,
    isRefetching,
    refetch,
    isError,
    error
  } = useSearchMutation(searchKeyword, 20);

  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  const { data: myProfile, isPending: myProfileIsPending } = useMyProfileQuery(
    myInfo.uid
  );

    useEffect(() => {
      if (searchKeyword) {
        refetch();
      }
    }, [searchKeyword]);
    if (isError) {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.log(error);
    }
  

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
