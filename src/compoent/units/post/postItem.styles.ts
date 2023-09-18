import { Rate } from "antd";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.li`
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 30px;
`;

export const UserInfoWrapper = styled.section``;

export const MoreBtn = styled.button`
  width: 30px;
  height: 45px;
  body.webp & {
    background: url("/assets/webp/icon-more.webp") no-repeat center / 15px;
  }
  body.no-webp & {
    background: url("/assets/icon-more.svg") no-repeat center / 15px;
  }
`;

export const OptionList = styled.ul`
  position: absolute;
  top: 40px;
  right: 0;
  width: 70px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
  overflow: hidden;
  transition: all 0.5s;
  animation: fadeInOption 0.5s;
  @keyframes fadeInOption {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOutOption {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const Option = styled.li`
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const OptionBtn = styled.button`
  padding: 6px;
  display: block;
  border: none;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  :focus {
    outline: none;
    background-color: #f2f2f2;
  }
  :hover {
    background-color: ${isMobile ? "" : "#f2f2f2"};
  }
`;

export const ContentWrapper = styled.section``;

export const RatingWrapper = styled.section`
  margin-top: 10px;
`;

export const Rating = styled(Rate)`
  font-size: 20px;
  margin-right: 5px;
`;

export const RatingCount = styled.span`
  font-size: 14px;
  color: #888;
  font-weight: 500;
`;

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

export const MoreContentBtn = styled.button`
  width: calc(100% - 32px);
  height: 35px;
  display: block;
  border-top: 1px solid #bdbdbd;
  margin: 0 auto 0px auto;
  font-weight: 500;
  body.webp & {
    background: url("/assets/webp/icon-moreTextBtn.webp") no-repeat center /
      15px 11px;
  }
  body.no-webp & {
    background: url("/assets/icon-moreTextBtn.svg") no-repeat center/ 19px 14px;
  }
`;

export const StoredMapBtn = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 99;
  width: 35px;
  height: 35px;
  transition: all 0.3s;
  background: ${(props: { storedMap: boolean }) =>
    props.storedMap
      ? `url(${
          document.body.classList.contains("webp")
            ? "/assets/webp/icon-yummyActive.webp"
            : "/assets/icon-yummyActive.svg"
        }) no-repeat center / cover`
      : `url(${
          document.body.classList.contains("webp")
            ? "/assets/webp/icon-yummy.webp"
            : "/assets/icon-yummy.svg"
        }) no-repeat center / cover`};
`;

export const ActiveMapBtn = styled.button`
  position: absolute;
  bottom: 25px;
  right: 34px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: { postType: string }) =>
    props.postType === "map"
      ? document.body.classList.contains("webp")
        ? 'url("/assets/webp/icon-thumbnailMapBtnActive.webp") no-repeat center / 30px'
        : 'url("/assets/icon-thumbnailMapBtnActive.svg") no-repeat center / 30px'
      : document.body.classList.contains("webp")
      ? 'url("/assets/webp/icon-thumbnailMapBtn.webp") no-repeat center / 30px'
      : 'url("/assets/icon-thumbnailMapBtn.svg") no-repeat center / 30px'};
`;

export const ActiveImageBtn = styled.button`
  position: absolute;
  bottom: 25px;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: ${(props: { postType: string }) =>
    props.postType === "image"
      ? document.body.classList.contains("webp")
        ? 'url("/assets/webp/icon-thumbnailImgBtnActive.webp") no-repeat center / 30px'
        : 'url("/assets/icon-thumbnailImgBtnActive.svg") no-repeat center / 30px'
      : document.body.classList.contains("webp")
      ? 'url("/assets/webp/icon-thumbnailImgBtn.webp") no-repeat center / 30px'
      : 'url("/assets/icon-thumbnailImgBtn.svg") no-repeat center / 30px'};
`;

export const KakaoMapWrapper = styled.section`
  position: relative;
  width: 100%;
  height: ${(props: { postType: "map" | "image" }) =>
    props.postType === "image" && "300px"};
`;

export const PostItemButtom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
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
            ? "/assets/webp/icon-heartFill.webp"
            : "/assets/icon-heartFill.svg"
        }) no-repeat center / cover`
      : `url(${
          document.body.classList.contains("webp")
            ? "/assets/webp/icon-heart.webp"
            : "/assets/icon-heart.svg"
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
