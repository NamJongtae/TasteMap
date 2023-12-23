import { Rate } from "antd";
import { isMobile } from "react-device-detect";
import styled from "styled-components";

// -------------------------PostList style-------------------------

export const Wrapper = styled.div`
  position: relative;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostListWrapper = styled.ul`
  width: 100%;
  max-width: 360px;
  padding: 10px 20px 20px 20px;
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 20px;
`;

// -------------------------PostItem style-------------------------

export const PostItemWrapper = styled.li`
  width: 100%;
  height: 100%;
  position: relative;
  margin-bottom: 30px;
`;

// -------------------------UserInfoSection style-------------------------

export const UserInfoWrapper = styled.section``;

// -------------------------PostUserInfo style-------------------------

export const MenuBtn = styled.button`
  width: 30px;
  height: 45px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-more.webp"
        : "/assets/icon-more.svg"
    }) no-repeat center / 15px`};
`;

// -------------------------PostMenu style-------------------------

export const MenuList = styled.ul`
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

export const MenuItem = styled.li`
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const MenuItemBtn = styled.button`
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

// -------------------------RatingSection style-------------------------

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

// -------------------------ContentSection style-------------------------

export const ContentWrapper = styled.section``;

export const MoreBtn = styled.button`
  width: 30px;
  height: 45px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-more.webp"
        : "/assets/icon-more.svg"
    }) no-repeat center / 15px`};
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

export const KakaoMapWrapper = styled.section`
  position: relative;
  width: 100%;
  height: ${(props: { contentType: "MAP" | "IMAGE" }) =>
    props.contentType === "IMAGE" && "300px"};
`;

// -------------------------ContentTypeBtn style-------------------------

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

// -------------------------PostBottom style-------------------------

export const PostItemBottomWrapper = styled.div`
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

// -------------------------PostLikeBtn style-------------------------

export const LikeBtn = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props: { like: boolean; $isWebpSupported: boolean | null }) =>
    props.like
      ? `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-heartFill.webp"
            : "/assets/icon-heartFill.svg"
        }) no-repeat center / cover`
      : `url(${
          props.$isWebpSupported
            ? "/assets/webp/icon-heart.webp"
            : "/assets/icon-heart.svg"
        }) no-repeat center / cover`};
`;

export const Count = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #888;
`;

// -------------------------PostCommentBtn style-------------------------

export const CommentBtn = styled.button`
  width: 20px;
  height: 20px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-comment.webp"
        : "/assets/icon-comment.svg"
    }) no-repeat center / 20px`};
`;

// -------------------------PostDate style-------------------------

export const PostDateFormatted = styled.time`
  font-size: 12px;
  color: #888;
`;
