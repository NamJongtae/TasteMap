import styled from "styled-components";

export const ModalTitleBar = styled.div`
  padding: 12px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ModalTitle = styled.h2`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const CommentTextAreaWrapper = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #bdbdbd;
  z-index: 990;
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f2f2f2;
  padding: 3px;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 3px;
  right: ${(props: { isReply: boolean; $isWebpSupported: boolean | null }) =>
    !props.isReply && "3px"};
  left: ${(props: { isReply: boolean; $isWebpSupported: boolean | null }) =>
    props.isReply && "3px"};
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-back.webp"
        : "/assets/icon-back.svg"
    }) no-repeat center / 16px`};

  transform: ${(props: {
    isReply: boolean;
    $isWebpSupported: boolean | null;
  }) => (props.isReply ? "rotate(0deg)" : "rotate(180deg)")};
`;

export const ModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 500px;
  background-color: #fff;
  z-index: 999;
  animation: ${(props: { isReply: boolean }) =>
    props.isReply ? "replyActive 1s" : "moveUp 1s"};
  @keyframes moveUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes moveDown {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: translate(-50%, 80%);
      opacity: 0;
    }
  }

  @keyframes replyActive {
    from {
      transform: translate(-30%, -50%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes replyInActive {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: translate(-30%, -50%);
      opacity: 0;
    }
  }
`;
