import React from "react";
import {
  NoResultKeyword,
  NoResultText,
  NoResultWrapper
} from "../../search.styles";

interface IProps {
  searchKeyword: string;
}
export default function NoSearchResult({ searchKeyword }: IProps) {
  return (
    <NoResultWrapper>
      <NoResultText>
        {'"'}
        <NoResultKeyword>{searchKeyword}</NoResultKeyword>
        {'"'}의{"\n"} 유저 검색 결과가 존재하지 않습니다.
      </NoResultText>
    </NoResultWrapper>
  );
}
