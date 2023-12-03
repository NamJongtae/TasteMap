import React from "react";
import { LoadingImg, LoadingText, Title, Wrapper } from "./loading.styles";
import { useLoading } from "../../../hook/logic/loading/useLoading";

export default function Loading() {
  const { imageLoaded } = useLoading();

  return (
    <Wrapper>
      <Title className='a11y-hidden'>로딩중</Title>
      {/* 로딩 이미지 gif가 로딩 완료된 후 Loading 이미지와 텍스트 출력 */}
      {imageLoaded && (
        <>
          <LoadingImg src='/assets/spinner.gif' alt='Loading' />
          <LoadingText>Loading...</LoadingText>
        </>
      )}
    </Wrapper>
  );
}
