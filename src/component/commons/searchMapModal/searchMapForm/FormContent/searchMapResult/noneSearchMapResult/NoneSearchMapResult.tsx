import React from "react";
import { NoSearchData, NoSearchDataText, Strong, TipExample } from '../../../../searchMapModal.styles';

interface IProps {
  searchKeyword: string;
}
export default function NoneSearchMapResult({ searchKeyword }: IProps) {
  return (
    <NoSearchData>
      <NoSearchDataText>
        <Strong>{searchKeyword}</Strong>
        {` 와 일치하는 검색결과가 없습니다.
      검색어에 잘못된 부분이 있는지 확인해주세요.
      가게명, 상호명, 지역명을 다시 한번 확인해주세요.`}
      </NoSearchDataText>

      <NoSearchDataText>
        Tip &#41; 검색이 잘 안되시나요? 아래와 같이 검색해보세요.
      </NoSearchDataText>
      <NoSearchDataText>가게명 + 지역명</NoSearchDataText>
      <TipExample>예&#41; 나만의 맛집 + 서울 강남</TipExample>
    </NoSearchData>
  );
}
