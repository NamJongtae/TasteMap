import { FieldValues } from "react-hook-form";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useMapSearchMutation } from "../../query/post/useMapSearchMutation";
import { useState } from "react";

export const useSearchMapDataFetch = () => {
  const [isSearched, setIsSearched] = useState(false);

  const searchedHandler = () => {
    setIsSearched(true);
  };

  const {
    mutate: mapSearchMutate,
    data: searchResult,
    isPending: searchLoading
  } = useMapSearchMutation();

  /**
   * 맛집 검색 함수
   */
  const searchMapHandler = async (data: FieldValues) => {
    const searchKeyword = data.searchKeyword;
    if (!searchKeyword) {
      return sweetToast("검색어를 입력해주세요.", "warning");
    }
    mapSearchMutate(searchKeyword);
    searchedHandler();
  };

  return {
    searchMapHandler,
    searchResult,
    searchLoading,
    isSearched,
    searchedHandler
  };
};
