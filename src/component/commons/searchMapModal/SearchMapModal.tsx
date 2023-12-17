import React from "react";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useSearchMapModalController } from "../../../hook/logic/searchMapModal/useSearchMapModalController";
import SearchMapForm from "./searchMapForm/SearchMapForm";
import {
  CloseBtn,
  ModalTitle,
  ModalTitleBar,
  ModalWrapper
} from "./searchModal.styles";
import useSearchMapResult from "../../../hook/logic/searchMapModal/useSearchMapResult";
import useSearchMapInput from "../../../hook/logic/searchMapModal/useSearchMapInput";
import { useSearchMapDataFetch } from "../../../hook/logic/searchMapModal/useSearchMapDataFetch";
import { IMapData } from "../../../api/apiType";
import SearchResult from "./searchResult/SearchResult";
import { PortalModal } from "../UI/portalModal/PortalModal";

interface IPortalProps {
  isWebpSupported: boolean | null;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  closeSearchModalHandler: () => void;
  isSearched: boolean;
  setIsSearched: React.Dispatch<React.SetStateAction<boolean>>;
  selectedResultMapHandler: (data: IMapData) => void;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  searchKeyword: string;
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchMapHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  searchResult: IMapData[] | undefined;
  searchLoading: boolean;
}

const SearchModalPortal = ({
  isWebpSupported,
  closeBtnRef,
  closeSearchModalHandler,
  isSearched,
  setIsSearched,
  selectedResultMapHandler,
  lastResultSelectBtnRef,
  inputRef,
  searchKeyword,
  onChangeKeyword,
  searchMapHandler,
  searchResult,
  searchLoading
}: IPortalProps) => {
  return (
    <ModalWrapper>
      <ModalTitleBar>
        <ModalTitle>맛집 검색</ModalTitle>
      </ModalTitleBar>

      <SearchMapForm
        inputRef={inputRef}
        closeBtnRef={closeBtnRef}
        setIsSearched={setIsSearched}
        searchKeyword={searchKeyword}
        onChangeKeyword={onChangeKeyword}
        searchMapHandler={searchMapHandler}
      />

      <SearchResult
        isSearched={isSearched}
        searchKeyword={searchKeyword}
        searchResult={searchResult}
        selectedResultMapHandler={selectedResultMapHandler}
        searchLoading={searchLoading}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
      />

      <CloseBtn
        type='button'
        onClick={closeSearchModalHandler}
        ref={closeBtnRef}
        onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
          optModalTabFocus(
            e,
            lastResultSelectBtnRef.current || inputRef.current,
            inputRef.current
          );
        }}
        $isWebpSupported={isWebpSupported}
      />
    </ModalWrapper>
  );
};

interface IProps {
  isTasteMapPage: boolean;
}

export default function SearchMapModal({ isTasteMapPage }: IProps) {
  const { isWebpSupported } = useSupportedWebp();

  const { closeBtnRef, closeSearchModalHandler } =
    useSearchMapModalController();

  const {
    isSearched,
    setIsSearched,
    selectedResultMapHandler,
    lastResultSelectBtnRef
  } = useSearchMapResult({ isTasteMapPage });

  const { inputRef, searchKeyword, onChangeKeyword } = useSearchMapInput();

  const { searchMapHandler, searchResult, searchLoading } =
    useSearchMapDataFetch();

  return (
    <PortalModal
      closeModalHandler={closeSearchModalHandler}
      targetId='modal-root'
    >
      <SearchModalPortal
        isWebpSupported={isWebpSupported}
        closeBtnRef={closeBtnRef}
        closeSearchModalHandler={closeSearchModalHandler}
        isSearched={isSearched}
        setIsSearched={setIsSearched}
        selectedResultMapHandler={selectedResultMapHandler}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
        inputRef={inputRef}
        searchKeyword={searchKeyword}
        onChangeKeyword={onChangeKeyword}
        searchMapHandler={searchMapHandler}
        searchResult={searchResult}
        searchLoading={searchLoading}
      />
    </PortalModal>
  );
}
