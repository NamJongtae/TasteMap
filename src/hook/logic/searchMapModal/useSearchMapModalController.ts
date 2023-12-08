import { useCallback, useEffect, useRef } from "react";
import { postSlice } from "../../../slice/postSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { searchSlice } from "../../../slice/searchSlice";
import { useHistoryMobileBackBtn } from "../../useHistoryMobileBackBtn";

export const useSearchMapModalController = () => {
  const dispatch = useDispatch<AppDispatch>();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

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
    };
  }, []);

  return {
    closeBtnRef,
    closeSearchModalHandler
  };
};
