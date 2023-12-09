import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { searchSlice } from "../../../../slice/searchSlice";

export const useSearchInput = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchKeyword = useSelector(
    (state: RootState) => state.search.searchKeyword
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState(searchKeyword);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value.trim());
    searchDebounce(e.target.value.trim());
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 검색 디바운싱 적용
  const searchDebounce = useCallback(
    debounce(async (keyword) => {
      dispatch(searchSlice.actions.setSearchKeyword(keyword));
    }, 500),
    []
  );

  return { keyword, onChangeKeyword, inputRef };
};
