import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useMapSearchMutation } from "../../query/post/useMapSearchMutation";

export const useSearchMapDataFetch = () => {
  const {
    mutate: mapSearchMutate,
    data: searchResult,
    isPending: searchLoading
  } = useMapSearchMutation();

  /**
   * 맛집 검색 함수
   */
  const searchMapHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색어가 없는 경우 return 처리
    const formData = new FormData(e.currentTarget);
    const searchKeyword = formData.get("searchKeyword") as string;
    if (!searchKeyword) {
      return sweetToast("검색어를 입력해주세요.", "warning");
    }
    mapSearchMutate(searchKeyword);
  };

  return { searchMapHandler, searchResult, searchLoading };
};
