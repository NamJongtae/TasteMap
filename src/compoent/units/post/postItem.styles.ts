import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.li`
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 20px;
`;

export const PostItemTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  :hover {
    cursor: ${isMobile ? "default" : "pointer"};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Username = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const UserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #f2f2f2;
  padding: 3px;
`;

export const MoreBtn = styled.button`
  width: 24px;
  height: 24px;
  body.webp & {
    background: url("/assets/webp/icon-more.webp") no-repeat center / 15px;
  }
  body.no-webp & {
    background: url("/assets/icon-more.svg") no-repeat center / 15px;
  }
`;

export const OpectionList = styled.ul`
  position: absolute;
  top: 40px;
  right: 0;
  width: 60px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
  overflow: hidden;
`;

export const Opection = styled.li`
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const OpectionBtn = styled.button`
  padding: 5px;
  display: block;
  border: none;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  cursor: pointer;
  font-size: 12px;
  :focus {
    outline: none;
    background-color: #f2f2f2;
  }
  :hover {
    background-color: ${isMobile ? "" : "#f2f2f2"};
  }
  @media screen and (max-width: 486px) {
    font-size: 12px;
  }
`;

export const ContentWrapper = styled.div``;

export const ContentText = styled.p`
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  word-break: keep-all;
  padding: 8px 16px 13px 16px;
`;

export const ContentImg = styled.img`
  width: 100%;
  max-width: 320px;
  object-fit: cover;
  background-color: #f5f5f5;
  vertical-align: top;
  height: 100%;
`;

export const PostItemButtom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const LikeBtn = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props: { like: boolean }) =>
    props.like
      ? `url(${
          document.body.classList.contains("webp")
            ? "assets/webp/icon-heartFill.webp"
            : "assets/icon-heartFill.svg"
        }) no-repeat center / cover`
      : `url(${
          document.body.classList.contains("webp")
            ? "assets/webp/icon-heart.webp"
            : "assets/icon-heart.svg"
        }) no-repeat center / cover`};
`;

export const CommentBtn = styled.button`
  width: 20px;
  height: 20px;
  body.webp & {
    background: url("/assets/webp/icon-comment.webp") no-repeat center / 20px;
  }
  body.no-webp & {
    background: url("/assets/icon-comment.svg") no-repeat center / 20px;
  }
`;

export const Count = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #888;
`;

export const PostDate = styled.time`
  font-size: 12px;
  color: #888;
`;
