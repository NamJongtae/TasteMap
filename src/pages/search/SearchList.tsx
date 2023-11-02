import React, { useEffect } from "react";
import {
  InfinityScrollTarget,
  NoUserData,
  NoUserKeyword,
  NoUserText,
  SearchUl
} from "./search.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import SearchItem from "./SearchItem";
import { useInView } from "react-intersection-observer";
import { thunkFetchSearchPagingData } from "../../slice/searchSlice";
import ScrollLoading from "../../component/commons/loading/ScrollLoading";
import { thunkFetchMyProfile } from "../../slice/userSlice";

export default function SearchList() {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const searchResult = useSelector(
    (state: RootState) => state.search.searchResult
  );

  const page = useSelector((state: RootState) => state.search.page);
  const pagePerData = useSelector(
    (state: RootState) => state.search.pagePerData
  );
  const hasMore = useSelector((state: RootState) => state.search.hasMore);
  const loadSerachLoading = useSelector(
    (state: RootState) => state.search.loadSerachLoading
  );
  const loadMoreSerachLoading = useSelector(
    (state: RootState) => state.search.loadMoreSearchLoading
  );
  const dispatch = useDispatch<AppDispatch>();
  const [ref, inview] = useInView();

  useEffect(() => {
    if (searchResult.length > 0 && inview && hasMore) {
      dispatch(
        thunkFetchSearchPagingData({
          keyword: searchKeyword,
          page,
          limitPage: pagePerData
        })
      );
    }
  }, [inview, hasMore]);

  useEffect(() => {
    if (myInfo.uid) {
      dispatch(thunkFetchMyProfile(myInfo.uid));
    }
  }, []);

  return (
    <>
      <SearchUl>
        {searchResult.length === 0 && loadSerachLoading ? (
          <ScrollLoading />
        ) : (
          <>
            {searchResult.length > 0 ? (
              <>
                {searchResult.map((item) => {
                  return <SearchItem key={item.uid} item={item} />;
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
        {searchResult.length > 0 && loadMoreSerachLoading && <ScrollLoading />}
      </SearchUl>
    </>
  );
}
