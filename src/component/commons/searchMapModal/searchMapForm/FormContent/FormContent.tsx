import React from "react";
import SearchMapResult from "./searchMapResult/SearchMapResult";
import { IMapData } from "../../../../../types/apiTypes";
import SearchInputField from "./searchMapInputField/SearchMapInputField";

interface IProps {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
  searchResult: IMapData[] | undefined;
  searchLoading: boolean;
  isSearched: boolean;
  isTasteMapPage: boolean;
}
export default function FormContent({
  inputRef,
  closeBtnRef,
  lastResultSelectBtnRef,
  searchResult,
  searchLoading,
  isSearched,
  isTasteMapPage
}: IProps) {
  return (
    <>
      <SearchInputField inputRef={inputRef} closeBtnRef={closeBtnRef} />
      <SearchMapResult
        isSearched={isSearched}
        searchResult={searchResult}
        isTasteMapPage={isTasteMapPage}
        searchLoading={searchLoading}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
      />
    </>
  );
}
