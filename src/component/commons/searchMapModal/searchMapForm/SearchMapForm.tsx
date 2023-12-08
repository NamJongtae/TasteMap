import React from "react";
import { optModalTabFocus } from "../../../../library/optModalTabFocus";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { SearchInput, SearchInputForm } from "./searchMapForm.styles";

interface IProps {
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  searchKeyword: string;
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchMapHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
}
export default function SearchMapForm({
  setIsSearched,
  onChangeKeyword,
  searchMapHandler,
  searchKeyword,
  inputRef,
  closeBtnRef
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  return (
    <SearchInputForm
      onSubmit={(e) => {
        searchMapHandler(e);
        setIsSearched(true);
      }}
      $isWebpSupported={isWebpSupported}
    >
      <SearchInput
        type='text'
        name='searchKeyword'
        value={searchKeyword}
        onChange={onChangeKeyword}
        placeholder='가게명, 상호명 검색'
        ref={inputRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          optModalTabFocus(e, closeBtnRef.current);
        }}
      />
    </SearchInputForm>
  );
}
