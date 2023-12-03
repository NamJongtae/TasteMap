import { useCallback, useEffect, useRef, useState } from "react";
import { IMapData } from "../../../api/apiType";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { postSlice } from "../../../slice/postSlice";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useAddTasteMapMutation } from "../../query/profile/useAddTasteMapMutation";
import { useMyProfileQuery } from "../../query/profile/useMyProfileQuery";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";
import { useMapSearchMutation } from "../../query/post/useMapSearchMutation";
import { searchSlice } from "../../../slice/searchSlice";

interface IProps {
  isTasteMapPage: boolean;
}

export const useSearchMapModal = ({ isTasteMapPage }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastItemSelectBtnRef = useRef<HTMLButtonElement>(null);
  // 검색을 했는지 초기상태를 체크 초기 툴팁을 표시하기위해
  const [isSarch, setIsSearch] = useState(false);
  // 검색어를 저장 검색결과가 없을 시 해당 검색어를 표시하기 위해
  const [searchKeyword, setSearchKeyword] = useState("");

  const { mutate: mapSearchMutate, data, isPending } = useMapSearchMutation();

  const { mutate: addTasteMapMutate } = useAddTasteMapMutation();
  const { data: myProfile } = useMyProfileQuery(myInfo.uid);

  /**
   * 검색 모달창 닫기 */
  const closeSearchModalHandler = useCallback(() => {
    dispatch(searchSlice.actions.setIsOpenSearchMapModal(false));
  }, []);

  /**
   * 맛집 검색 데이터 선택 함수 */
  const selectedMapHandler = (item: IMapData) => {
    if (isTasteMapPage) {
      // 저장된 맛집 데이터가 20개 이상일 경우 맛집 저장 제한
      if (myProfile!.storedMapList.length > 20) {
        sweetToast(
          "저장 가능한 맛집 수를 초과하였습니다.\n(최대 20개)",
          "warning",
          1500
        );
        return;
      }
      // 저장된 맛집 데이터에 추가할 맛집 데이터가 있다면 저장 제한
      if (
        myProfile!.storedMapList?.find(
          (data: IMapData) => data.address === item.address
        )
      ) {
        sweetToast("이미 추가된 맛집입니다!", "warning");
        return;
      }
      // 선택한 맛집 데이터를 api 함수를 통해 db에 저장
      addTasteMapMutate(item);
      // 추가한 맛집 상세정보를 표시하기 clickMapData를 선택한 맛집 데이터로 업데이트
      dispatch(tasteMapSlice.actions.setClickMarkerData(item));
    }

    dispatch(tasteMapSlice.actions.setSearchSelectedMap(item));
    // searchMapData 상태 리셋
    dispatch(postSlice.actions.resetSearchMapData());
    // 모달 창 닫기
    closeSearchModalHandler();
  };

  // 모바일 뒤로가기 구현을 위해 빈 히스토리 생성
  // 뒤로가기 버튼을 눌러도 현재 페이지가 유지됨
  useEffect(() => {
    if (isMobile) {
      window.history.pushState(null, "", window.location.href);
    }
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handlePopState = () => {
        closeSearchModalHandler();
      };

      window.onpopstate = handlePopState;

      return () => {
        // 컴포넌트가 언마운트될 때 이벤트 핸들러를 삭제
        window.onpopstate = null;
      };
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return {
    inputRef,
    closeBtnRef,
    lastItemSelectBtnRef,
    selectedMapHandler,
    searchKeyword,
    setSearchKeyword,
    isSarch,
    setIsSearch,
    mapSearchMutate,
    closeSearchModalHandler,
    data,
    isPending
  };
};
