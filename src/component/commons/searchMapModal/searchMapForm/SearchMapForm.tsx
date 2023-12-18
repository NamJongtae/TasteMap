import React from "react";
import { MyForm } from "../../UI/myForm/MyForm";
import { useSearchMapDataFetch } from "../../../../hook/logic/searchMapModal/useSearchMapDataFetch";
import FormContent from "./FormContent/FormContent";

interface IProps {
  inputRef: React.RefObject<HTMLInputElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
  isTasteMapPage: boolean;
}
export default function SearchMapForm({
  inputRef,
  closeBtnRef,
  lastResultSelectBtnRef,
  isTasteMapPage
}: IProps) {
  const {
    searchMapHandler,
    searchResult,
    searchLoading,
    isSearched
  } = useSearchMapDataFetch();

  return (
    <MyForm
      onSubmit={searchMapHandler}
      formOptions={{ mode: "onSubmit", defaultValues: { searchKeyword: "" } }}
    >
      <FormContent
        inputRef={inputRef}
        closeBtnRef={closeBtnRef}
        searchResult={searchResult}
        searchLoading={searchLoading}
        isSearched={isSearched}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
        isTasteMapPage={isTasteMapPage}
      />
    </MyForm>
  );
}
