import React, { useEffect } from "react";
import {
  InfinityScrollTarget,
  NoUserData,
  NoUserKeyword,
  NoUserText,
  SearchUl
} from "./search.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import SearchItem from "./SearchItem";
import { useInView } from "react-intersection-observer";
import { thunkFetchSearchPagingData } from "../../../slice/searchSlice";
import { thunkFetchMyProfile } from "../../../slice/profileSlice";
import ScrollLoading from "../../commons/loading/ScrollLoading";

export default function SearchList() {
  const userData = useSelector((state: RootState) => state.user.data);
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const searchListData = useSelector(
    (state: RootState) => state.search.searchListData
  );

  const page = useSelector((state: RootState) => state.search.page);
  const pagePerData = useSelector(
    (state: RootState) => state.search.pagePerData
  );
  const hasMore = useSelector((state: RootState) => state.search.hasMore);
  const isLoading = useSelector((state: RootState) => state.search.isLoading);
  const dispatch = useDispatch<AppDispatch>();
  const [ref, inview] = useInView();

  useEffect(() => {
    if (searchListData.length > 0 && inview && hasMore) {
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
    if (userData.uid) {
      dispatch(thunkFetchMyProfile(userData.uid));
    }
  }, []);

  return (
    <>
      <SearchUl>
        {searchListData.length === 0 && isLoading ? (
          <ScrollLoading />
        ) : (
          <>
            {searchListData.length > 0 ? (
              <>
                {searchListData.map((item) => {
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
        {searchListData.length > 0 && isLoading && <ScrollLoading />}
      </SearchUl>
    </>
  );
}
