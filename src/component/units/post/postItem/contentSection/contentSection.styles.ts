import styled from 'styled-components';

export const ContentWrapper = styled.section``;

export const ContentText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  word-break: break-all;
  margin: 8px 16px 13px 16px;
  white-space: pre-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
`;

export const ContentTextLine = styled.div`
  width: calc(100% - 32px);
  margin: 0 auto 10px auto;
  height: 1px;
  border-bottom: 1px solid #bdbdbd;
`;

export const MoreContentBtn = styled.button`
  display: block;
  margin: 0 auto 16px auto;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-moreTextBtn.webp"
        : "/assets/icon-moreTextBtn.svg"
    }) no-repeat right 2px top 7px / 9px`};
  padding-right: 16px;
  font-weight: 500;
`;

export const StoredMapBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
  width: 35px;
  height: 35px;
  transition: all 0.3s;
  background: ${(props: {
    storedMap: boolean;
    $isWebpSupported: boolean | null;
  }) =>
    props.storedMap
      ? `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-yummyActive.webp"
            : "/assets/icon-yummyActive.svg"
        }) no-repeat center / cover`
      : `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-yummy.webp"
            : "/assets/icon-yummy.svg"
        }) no-repeat center / cover`};
`;

export const KakaoMapWrapper = styled.section`
  position: relative;
  width: 100%;
  height: ${(props: { contentType: "MAP" | "IMAGE" }) =>
    props.contentType === "IMAGE" && "300px"};
`;

export const Placeholder = styled.div`
  width: 100%;
  max-width: 320px;
  height: 300px;
`;