import React from "react";
import { SearchInput, SearchInputForm } from "./searchModal.styles";

import { optModalTabFocus } from "../../../library/optModalTabFocus";
import { useSearchMapForm } from "../../../hook/logic/searchMapModal/useSearchMapForm";
import { UseMutateFunction } from "@tanstack/react-query";
import { IMapData } from "../../../api/apiType";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";

interface IProps {
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  mapSearchMutate: UseMutateFunction<IMapData[], Error, string, unknown>;
  inputRef: React.RefObject<HTMLInputElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function SearchMapForm({
  setIsSearch,
  searchKeyword,
  setSearchKeyword,
  mapSearchMutate,
  inputRef,
  closeBtnRef
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const { onChangeValue, searchMapHandler } = useSearchMapForm({
    setIsSearch,
    searchKeyword,
    setSearchKeyword,
    mapSearchMutate
  });
  return (
    <SearchInputForm
      onSubmit={searchMapHandler}
      $isWebpSupported={isWebpSupported}
    >
      <SearchInput
        type='text'
        value={searchKeyword}
        onChange={onChangeValue}
        placeholder='가게명, 상호명 검색'
        ref={inputRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          optModalTabFocus(e, closeBtnRef.current);
        }}
      />
    </SearchInputForm>
  );
}
