import { useDispatch } from "react-redux";
import { IMapData } from "../../../api/apiType";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { AppDispatch } from "../../../store/store";
import { useAddTasteMapDataFetch } from "./useAddTasteMapDataFetch";
import { useCallback, useRef, useState } from "react";
import { searchSlice } from "../../../slice/searchSlice";

interface IProps {
  isTasteMapPage: boolean;
}
export default function useSearchMapResult({ isTasteMapPage }: IProps) {
  // 검색전 상태 체크 검색 팁을 표시하기위해
  const [isSearched, setIsSearched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const lastResultSelectBtnRef = useRef<HTMLButtonElement>(null);
  const { addTasteMapHandler } = useAddTasteMapDataFetch();

  /**
   * 검색 모달창 닫기 */
  const closeSearchModalHandler = useCallback(() => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(false));
  }, []);

  /**
   * 맛집 검색 결과 데이터 선택 함수 */
  const selectedResultMapHandler = (data: IMapData) => {
    // 맛집 지도 페이지인 경우 맛집을 추가하는 로직 추가
    if (isTasteMapPage) {
      addTasteMapHandler(data);
    }

    // 선택한 맵 데이터 저장
    dispatch(tasteMapSlice.actions.setSearchSelectedMap(data));
    // 맵 검색 모달 창 닫기
    closeSearchModalHandler();
  };

  return {
    isSearched,
    setIsSearched,
    selectedResultMapHandler,
    lastResultSelectBtnRef
  };
}
