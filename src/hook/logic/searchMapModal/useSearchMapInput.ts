import { useEffect, useRef, useState } from "react";

export default function useSearchMapInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  // 검색어를 저장 검색결과가 없을 시 해당 검색어를 표시하기 위해
  const [searchKeyword, setSearchKeyword] = useState("");

  /**
   * 검색어 change 함수
   */
  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === " " && e.target.value.length === 1) return;
    setSearchKeyword(e.currentTarget.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    return () => {
      setSearchKeyword("");
    };
  }, []);

  return {
    inputRef,
    searchKeyword,
    onChangeKeyword,
    setSearchKeyword,
  };
}
