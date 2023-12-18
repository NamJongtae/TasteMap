import { useCallback, useEffect, useRef } from "react";
import { postSlice } from "../../../slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { searchSlice } from "../../../slice/searchSlice";
import { useHistoryMobileBackBtn } from "../../useHistoryMobileBackBtn";

export const useSearchMapModalController = () => {
  const dispatch = useDispatch<AppDispatch>();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastResultSelectBtnRef = useRef<HTMLButtonElement>(null);
  const isOpenSearchMapModal = useSelector(
    (state: RootState) => state.search.isOpenSearchMapModal
  );

  const openSearchModalHandler = useCallback(() => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(true));
  }, []);

  /**
   * 검색 모달창 닫기 */
  const closeSearchModalHandler = useCallback(() => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(false));
  }, []);

  useHistoryMobileBackBtn({
    handlePopStateCb: closeSearchModalHandler
  });

  useEffect(() => {
    return () => {
      dispatch(postSlice.actions.resetSearchMapData());
      if (isOpenSearchMapModal) {
        closeSearchModalHandler();
      }
    };
  }, []);

  return {
    closeBtnRef,
    inputRef,
    lastResultSelectBtnRef,
    isOpenSearchMapModal,
    openSearchModalHandler,
    closeSearchModalHandler
  };
};
