import styled from 'styled-components';

export const ActiveMapBtn = styled.button`
  position: absolute;
  bottom: 25px;
  right: 34px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: {
    contentType: "MAP" | "IMAGE";
    $isWebpSupported: boolean | null;
  }) =>
    props.contentType === "MAP"
      ? props.$isWebpSupported
        ? 'url("/assets/webp/icon-thumbnailMapBtnActive.webp") no-repeat center / 30px'
        : 'url("/assets/icon-thumbnailMapBtnActive.svg") no-repeat center / 30px'
      : props.$isWebpSupported
      ? 'url("/assets/webp/icon-thumbnailMapBtn.webp") no-repeat center / 18px #E9E9E9'
      : 'url("/assets/icon-thumbnailMapBtn.svg") no-repeat center / 18px #E9E9E9'};
`;

export const ActiveImageBtn = styled.button`
  position: absolute;
  bottom: 25px;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: {
    contentType: "MAP" | "IMAGE";
    $isWebpSupported: boolean | null;
  }) =>
    props.contentType === "IMAGE"
      ? props.$isWebpSupported
        ? 'url("/assets/webp/icon-thumbnailImgBtnActive.webp") no-repeat center / 30px'
        : 'url("/assets/icon-thumbnailImgBtnActive.svg") no-repeat center / 30px'
      : props.$isWebpSupported
      ? 'url("/assets/webp/icon-thumbnailImgBtn.webp") no-repeat center / 30px'
      : 'url("/assets/icon-thumbnailImgBtn.svg") no-repeat center / 30px'};
`;
