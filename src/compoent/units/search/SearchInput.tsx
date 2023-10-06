import React, { useCallback, useEffect, useRef, useState } from "react";
import { SearchInputWrapper, SearchLabel, Input } from "./search.styles";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  searchSlice,
  thunkFetchSearchFirstPageData
} from "../../../slice/searchSlice";

export default function SearchInput() {
  const dispatch = useDispatch<AppDispatch>();
  const pagePerData = useSelector(
    (state: RootState) => state.search.pagePerData
  );
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState(searchKeyword);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value.trim());
    searchDebounce(e.target.value.trim());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 검색 디바운싱 적용
  const searchDebounce = useCallback(
    debounce(async (keyword) => {
      dispatch(searchSlice.actions.setSearchKeyword(keyword));
      if (!keyword) {
        return dispatch(searchSlice.actions.setSearchListData([]));
      }
      dispatch(
        thunkFetchSearchFirstPageData({ keyword, limitPage: pagePerData })
      );
    }, 500),
    []
  );
  return (
    <SearchInputWrapper>
      <SearchLabel className='a11y-hidden'>계정검색</SearchLabel>
      <Input
        placeholder='계정 검색'
        value={keyword}
        onChange={onChangeKeyword}
        maxLength={12}
        ref={inputRef}
      />
    </SearchInputWrapper>
  );
}
