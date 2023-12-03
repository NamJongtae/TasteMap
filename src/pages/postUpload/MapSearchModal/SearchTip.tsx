import React from 'react'
import { SerachTipWrapper, TipDescription, TipExample, TipTitle } from './searchModal.styles'

export default function SearchTip() {
  return (
    <SerachTipWrapper>
    <TipTitle>tip</TipTitle>
    <TipDescription>
      아래와 같이 검색을 하시면 정확한 결과가 검색됩니다.
    </TipDescription>
    <TipDescription>가게명 + 지역명</TipDescription>
    <TipExample>예&#41; 나만의맛집 + 서울 강남</TipExample>
  </SerachTipWrapper>
  )
}
