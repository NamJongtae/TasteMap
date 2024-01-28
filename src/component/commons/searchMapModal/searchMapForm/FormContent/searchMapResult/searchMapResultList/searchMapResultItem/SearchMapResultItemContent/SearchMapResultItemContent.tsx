import React from "react";
import {
  ResultContentItem,
  ResultContentList,
  ResultContentTag,
  ResultContentText
} from "../../../../../../searchMapModal.styles";
import { IMapData } from "../../../../../../../../../types/apiTypes";

interface IProps {
  data: IMapData;
}

export default function SearchMapResultItemContent({ data }: IProps) {
  return (
    <ResultContentList>
      <ResultContentItem>
        <ResultContentTag>가게명</ResultContentTag>
        <ResultContentText>{data.title}</ResultContentText>
      </ResultContentItem>
      <ResultContentItem>
        <ResultContentTag>도로명 주소</ResultContentTag>
        <ResultContentText>{data.roadAddress}</ResultContentText>
      </ResultContentItem>
      <ResultContentItem>
        <ResultContentTag>지번 주소</ResultContentTag>
        <ResultContentText>{data.address}</ResultContentText>
      </ResultContentItem>
      <ResultContentItem>
        <ResultContentTag>카테고리</ResultContentTag>
        <ResultContentText>{data.category}</ResultContentText>
      </ResultContentItem>
      <ResultContentItem>
        <ResultContentTag>홈페이지</ResultContentTag>
        <ResultContentText>{data.link}</ResultContentText>
      </ResultContentItem>
    </ResultContentList>
  );
}
