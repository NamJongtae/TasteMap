import React, { useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { postSlice } from "../../slice/postSlice";
import { IMapData } from "../../api/apiType";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";
import SearchModalUI from "./SearchModal.presenter";
import { useMapSearchMutation } from "../../hook/query/post/useMapSearchMutation";
import { isMobile } from "react-device-detect";

interface IProps {
  closeSearchModal: () => void;
}

export default function SearchModal({ closeSearchModal }: IProps) {
  // 맛집 검색 데이터 가져오기
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastItemSelectBtn = useRef<HTMLButtonElement>(null);
  // 검색어
  const [inputValue, setInputValue] = useState("");
  // 검색을 했는지 초기상태를 체크 초기 툴팁을 표시하기위해
  const [isSarch, setIsSearch] = useState(false);
  // 검색어를 저장 검색결과가 없을 시 해당 검색어를 표시하기 위해
  const [searchKeyword, setSearchKeyword] = useState("");

  const { mutate: mapSearchMutate, data, isPending } = useMapSearchMutation();
  /**
   * 검색어 change 함수 */
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " " && e.target.value.length === 1) return;
    setInputValue(e.currentTarget.value);
  };

  /**
   * 맛집 검색 함수 */
  const onSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어가 없는 경우 return 처리
    if (!inputValue) return sweetToast("검색어를 입력해주세요.", "warning");
    // redux thunk를 이용해 비동기 처리 서버로 부터 검색한 내용을 받아옴
    mapSearchMutate(inputValue);
    setSearchKeyword(inputValue);
    setIsSearch(true);
  };

  /**
   * 맛집 검색 데이터 선택 함수 */
  const onClickSelected = (item: IMapData) => {
    // selectedMapData 상태 업데이트
    dispatch(postSlice.actions.setSelectedMapData(item));

    // searchMapData 상태 리셋
    dispatch(postSlice.actions.resetSearchMapData());
    // 검색 input값 초기화
    setInputValue("");
    // 모달 창 닫기
    closeSearchModal();
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
        closeSearchModal();
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

  return (
    <SearchModalUI
      closeSearchModal={closeSearchModal}
      onSubmitSearch={onSubmitSearch}
      inputValue={inputValue}
      onChangeValue={onChangeValue}
      inputRef={inputRef}
      closeBtnRef={closeBtnRef}
      lastItemSelectBtn={lastItemSelectBtn}
      isSarch={isSarch}
      searchMapData={data || []}
      onClickSelected={onClickSelected}
      searchKeyword={searchKeyword}
      isPending={isPending}
    />
  );
}
