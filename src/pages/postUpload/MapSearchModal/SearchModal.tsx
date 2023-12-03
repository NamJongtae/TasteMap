import React from "react";
import { optModalTabFocus } from "../../../library/optModalTabFocus";
import ScrollLoading from "../../../component/commons/loading/ScrollLoading";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import { useSearchMapModal } from "../../../hook/logic/searchMapModal/useSearchMapModal";
import ReactDOM from "react-dom";
import {
  ModalTitleBar,
  ModalTitle,
  CloseBtn,
  ModalWrapper
} from "./searchModal.styles";
import { Modal } from "../../../component/commons/UI/Modal";
import { IMapData } from "../../../api/apiType";
import { SearchResultList } from "./SearchResultList";
import NoneSearchResult from "./NoneSearchResult";
import SearchTip from "./SearchTip";
import { UseMutateFunction } from "@tanstack/react-query";
import SearchMapForm from "./SearchMapForm";

interface IModalProps {
  inputRef: React.RefObject<HTMLInputElement>;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  lastItemSelectBtnRef: React.RefObject<HTMLButtonElement>;
  isSarch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  mapSearchMutate: UseMutateFunction<IMapData[], Error, string, unknown>;
  data: IMapData[] | undefined;
  isPending: boolean;
  selectedMapHandler: (item: IMapData) => void;
  closeSearchModalHandler: () => void;
  isWebpSupported: boolean | null;
}

const ModalPortal = ({
  inputRef,
  closeBtnRef,
  lastItemSelectBtnRef,
  searchKeyword,
  setSearchKeyword,
  isSarch,
  setIsSearch,
  mapSearchMutate,
  data,
  isPending,
  selectedMapHandler,
  closeSearchModalHandler,
  isWebpSupported
}: IModalProps) => {
  const searchResult = () => {
    if (!isSarch) {
      return <SearchTip />;
    }
    if (isSarch && (data?.length || 0) > 0) {
      return (
        <SearchResultList
          data={data}
          selectedMapHandler={selectedMapHandler}
          lastItemSelectBtnRef={lastItemSelectBtnRef}
        />
      );
    }
    if (isSarch && isPending) {
      return <ScrollLoading />;
    }
    if (isSarch && (data?.length || 0) === 0) {
      return <NoneSearchResult searchKeyword={searchKeyword} />;
    }
  };

  return (
    <Modal closeModalHanlder={closeSearchModalHandler}>
      <ModalWrapper>
        <ModalTitleBar>
          <ModalTitle>맛집 검색</ModalTitle>
        </ModalTitleBar>
        <SearchMapForm
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          setIsSearch={setIsSearch}
          mapSearchMutate={mapSearchMutate}
          inputRef={inputRef}
          closeBtnRef={closeBtnRef}
        />

        {searchResult()}

        <CloseBtn
          type='button'
          onClick={closeSearchModalHandler}
          ref={closeBtnRef}
          onKeyDown={(e: React.KeyboardEvent<HTMLButtonElement>) => {
            optModalTabFocus(
              e,
              lastItemSelectBtnRef.current || inputRef.current,
              inputRef.current
            );
          }}
          $isWebpSupported={isWebpSupported}
        />
      </ModalWrapper>
    </Modal>
  );
};

interface IProps {
  isTasteMapPage: boolean;
}

export default function SearchModal({ isTasteMapPage }: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    inputRef,
    closeBtnRef,
    lastItemSelectBtnRef,
    selectedMapHandler,
    searchKeyword,
    setSearchKeyword,
    isSarch,
    setIsSearch,
    closeSearchModalHandler,
    mapSearchMutate,
    data,
    isPending
  } = useSearchMapModal({ isTasteMapPage });

  return (
    <>
      {ReactDOM.createPortal(
        <ModalPortal
          inputRef={inputRef}
          closeBtnRef={closeBtnRef}
          lastItemSelectBtnRef={lastItemSelectBtnRef}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          isSarch={isSarch}
          setIsSearch={setIsSearch}
          mapSearchMutate={mapSearchMutate}
          data={data}
          isPending={isPending}
          selectedMapHandler={selectedMapHandler}
          closeSearchModalHandler={closeSearchModalHandler}
          isWebpSupported={isWebpSupported}
        />,
        document.getElementById("modal-root") as HTMLDivElement
      )}
    </>
  );
}
