import React, { useEffect, useState } from "react";
import { LoadingImg, LoadingText, Title, Wrapper } from "./loading.styles";

export default function Loading() {
  const [imageLoaded, setImageLoaded] = useState(false);

  // 로딩 gif 이미지 로딩 상태를 확인하고 이미지가 로딩 완료되면 상태를 변경합니다.
  useEffect(() => {
    const img = new Image();
    img.src = "/assets/spinner.gif";
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

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
