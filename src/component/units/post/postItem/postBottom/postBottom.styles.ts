import styled from 'styled-components';

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

export const Count = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #888;
`;

export const PostDate = styled.time`
  font-size: 12px;
  color: #888;
`;