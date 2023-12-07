import styled from 'styled-components';

export const PostTypeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 5px;
  max-width: 320px;
  margin: 0 auto;
  padding: 0 20px 10px 0;
  border-bottom: 1px solid #bdbdbd;
`;

export const PostTypeTitle = styled.h2`
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
  font-weight: 500;
  color: #555;
`;

export const HomeBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: {
    postType:  "HOME" | "FEED";
    $isWebpSupported: boolean | null;
  }) =>
    props.postType === "HOME"
      ? props.$isWebpSupported
        ? "url(/assets/webp/icon-homeBtnActive.webp) no-repeat center / 30px"
        : "url(/assets/icon-homeBtnActive.svg) no-repeat center / 30px"
      : props.$isWebpSupported
      ? "url(/assets/webp/icon-homeBtn.webp) no-repeat center / 30px"
      : "url(/assets/icon-homeBtn.svg) no-repeat center / 30px"};
`;

export const FeedBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: {
    postType:  "HOME" | "FEED";
    $isWebpSupported: boolean | null;
  }) =>
    props.postType === "FEED"
      ? `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-feedBtnActive.webp"
            : "/assets/icon-feedBtnActive.svg"
        }) no-repeat center / 30px`
      : `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-feedBtn.webp"
            : "/assets/icon-feedBtn.svg"
        })  no-repeat center / 30px`};
`;