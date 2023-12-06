import React from "react";
import { SearchInputWrapper, SearchLabel, Input } from "./search.styles";
import { useSearchInput } from "../../hook/logic/search/useSearchInput";
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function SearchInput() {
  const isWebpSupported = useSelector((state: RootState) => state.setting.isWebpSupported);
  const { keyword, onChangeKeyword, inputRef } = useSearchInput();

  return (
    <SearchInputWrapper>
      <SearchLabel className='a11y-hidden'>계정검색</SearchLabel>
      <Input
        placeholder='계정 검색'
        value={keyword}
        onChange={onChangeKeyword}
        maxLength={12}
        ref={inputRef}
        $isWebpSupported={isWebpSupported}
      />
    </SearchInputWrapper>
  );
}
