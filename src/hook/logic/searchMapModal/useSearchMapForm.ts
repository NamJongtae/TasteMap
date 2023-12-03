import { useEffect } from "react";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { IMapData } from "../../../api/apiType";
import { UseMutateFunction } from "@tanstack/react-query";

interface IProps {
  mapSearchMutate: UseMutateFunction<IMapData[], Error, string, unknown>;
  searchKeyword: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
export const useSearchMapForm = ({
  mapSearchMutate,
  searchKeyword,
  setSearchKeyword,
  setIsSearch
}: IProps) => {
  /**
   * 검색어 change 함수
   */
  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " " && e.target.value.length === 1) return;
    setSearchKeyword(e.currentTarget.value);
  };

  /**
   * 맛집 검색 함수
   */
  const searchMapHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어가 없는 경우 return 처리
    if (!searchKeyword) return sweetToast("검색어를 입력해주세요.", "warning");
    // redux thunk를 이용해 비동기 처리 서버로 부터 검색한 내용을 받아옴
    mapSearchMutate(searchKeyword);
    setIsSearch(true);
  };

  useEffect(() => {
    return () => {
      setSearchKeyword("");
    };
  }, []);

  return {
    searchKeyword,
    onChangeValue,
    searchMapHandler
  };
};
