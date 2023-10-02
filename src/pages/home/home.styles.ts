import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  max-width: 360px;
  height: 100%;
  margin: 20px auto;
`;

export const ButtonWrapper = styled.div`
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
`

export const HomeBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: { postType: "home" | "feed" }) =>
    props.postType === "home"
      ? document.body.classList.contains("webp")
        ? "url(/assets/webp/icon-homeBtnActive.webp) no-repeat center / 30px"
        : "url(/assets/icon-homeActiveBtn.svg) no-repeat center / 30px"
      : document.body.classList.contains("webp")
      ? "url(/assets/webp/icon-homeBtn.webp) no-repeat center / 30px"
      : "url(/assets/icon-homeBtn.svg) no-repeat center / 30px"};
`;

export const FeedBtn = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: { postType: "home" | "feed" }) =>
    props.postType === "feed"
      ? document.body.classList.contains("webp")
        ? "url(/assets/webp/icon-feedBtnActive.webp) no-repeat center / 30px"
        : "url(/assets/icon-feedActiveBtn.svg) no-repeat center / 30px"
      : document.body.classList.contains("webp")
      ? "url(/assets/webp/icon-feedBtn.webp) no-repeat center / 30px"
      : "url(/assets/icon-feedBtn.svg) no-repeat center / 30px"};
`;
