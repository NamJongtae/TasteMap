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
} from "./searchMapModal.styles";
import { PortalModal } from "../UI/portalModal/PortalModal";

interface IPortalProps {
  isWebpSupported: boolean | null;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  closeSearchModalHandler: () => void;
  lastResultSelectBtnRef: React.RefObject<HTMLButtonElement>;
  inputRef: React.RefObject<HTMLInputElement>;
  isTasteMapPage: boolean;
}

const SearchModalPortal = ({
  isWebpSupported,
  closeBtnRef,
  closeSearchModalHandler,
  lastResultSelectBtnRef,
  inputRef,
  isTasteMapPage
}: IPortalProps) => {
  return (
    <ModalWrapper>
      <ModalTitleBar>
        <ModalTitle>맛집 검색</ModalTitle>
      </ModalTitleBar>

      <SearchMapForm
        inputRef={inputRef}
        closeBtnRef={closeBtnRef}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
        isTasteMapPage={isTasteMapPage}
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

  const {
    closeBtnRef,
    inputRef,
    lastResultSelectBtnRef,
    closeSearchModalHandler
  } = useSearchMapModalController();

  return (
    <PortalModal
      closeModalHandler={closeSearchModalHandler}
      targetId='modal-root'
    >
      <SearchModalPortal
        isWebpSupported={isWebpSupported}
        closeBtnRef={closeBtnRef}
        inputRef={inputRef}
        closeSearchModalHandler={closeSearchModalHandler}
        lastResultSelectBtnRef={lastResultSelectBtnRef}
        isTasteMapPage={isTasteMapPage}
      />
    </PortalModal>
  );
}
