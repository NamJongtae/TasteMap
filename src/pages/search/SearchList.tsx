import React, { useEffect } from "react";
import {
  InfinityScrollTarget,
  NoUserData,
  NoUserKeyword,
  NoUserText,
  SearchUl
} from "./search.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SearchItem from "./SearchItem";
import { useInView } from "react-intersection-observer";
import ScrollLoading from "../../component/commons/loading/ScrollLoading";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from "@tanstack/react-query";
import { IMyProfileData, IUserProfileData } from "../../api/apiType";
import { DocumentData, QuerySnapshot } from "firebase/firestore";

interface InfiniteSearchType {
  userDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IUserProfileData[];
}

interface IProps {
  myProfile: IMyProfileData | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<InfiniteSearchType, unknown>,
      Error
    >
  >;
  hasNextPage: boolean;
  searchResult: IUserProfileData[] | undefined;
  isPending: boolean;
  isFetchingNextPage: boolean;
  isRefetching: boolean;
}
export default function SearchList({
  myProfile,
  fetchNextPage,
  hasNextPage,
  searchResult,
  isPending,
  isFetchingNextPage,
  isRefetching
}: IProps) {
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );

  const [ref, inview] = useInView();
  const pagePerData = useSelector((state: RootState) => state.search.pagePerData);

  useEffect(() => {
    if (searchKeyword && searchResult?.length || 0 >= pagePerData && inview && hasNextPage) {
      fetchNextPage();
    }
  }, [inview]);

  return (
    <>
      {searchKeyword && (
        <SearchUl>
          {isPending || isRefetching ? (
            <ScrollLoading />
          ) : (
            <>
              {searchResult?.length || 0 > 0 ? (
                <>
                  {searchResult!.map((item) => {
                    return (
                      <SearchItem
                        key={item.uid}
                        item={item}
                        myProfile={myProfile}
                      />
                    );
                  })}
                  <InfinityScrollTarget ref={ref}></InfinityScrollTarget>
                </>
              ) : (
                <>
                  {searchKeyword && (
                    <NoUserData>
                      <NoUserText>
                        {'"'}
                        <NoUserKeyword>{searchKeyword}</NoUserKeyword>
                        {'"'}의{"\n"} 계정 검색 결과가 존재하지 않습니다.
                      </NoUserText>
                    </NoUserData>
                  )}
                </>
              )}
            </>
          )}
          {isFetchingNextPage && <ScrollLoading />}
        </SearchUl>
      )}
    </>
  );
}
