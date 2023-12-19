import styled from "styled-components";

// ------------------CommentModal style-----------------

export const ModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 900px;
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

// ------------------CommentList style-----------------

export const CommentWrpper = styled.ul`
  position: relative;
  padding: 20px;
  padding-bottom: 80px;
  height: calc(100% - 41px);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 20px;
`;

export const RefreshBtn = styled.button`
  position: absolute;
  z-index: 99;
  top: 45px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-refresh.webp"
        : "/assets/icon-refresh.svg"
    }) no-repeat center / 25px`};
`;

// ------------------CommentItem style-----------------

export const CommentLi = styled.li`
  :not(:last-child) {
    margin-bottom: 20px;
  }
  animation: replyFadeIn 1s;
  @keyframes replyFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ReplyCountBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #065fd4;
  background: none;
  margin: 5px 0 0 53px;
`;

// ------------------CommentBottom style-----------------

export const CommentBottomWrapper = styled.div`
  margin-left: 53px;
`;

export const CommentDate = styled.time`
  font-size: 12px;
  color: #bdbdbd;
  margin: 0 5px 5px 0px;
`;

export const CommentBtn = styled.button`
  font-size: 12px;
  color: #bdbdbd;
  background: none;
  margin-left: 5px;
`;

// ------------------commentContent style-----------------

export const CommentText = styled.div`
  margin: 0 0 5px 53px;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.5;
`;

// ------------------TextAreaFormField style-----------------

export const TextAreaFormWrapper = styled.div`
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

// ------------------CommentTextArea style-----------------

export const CommentTextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #f5f5f5;
  padding: 8px 36px 8px 15px;
  margin-left: ${(props: { textareaType: "leave" | "update" }) =>
    props.textareaType === "update" && "45px"};
  max-width: ${(props: { textareaType: "leave" | "update" }) =>
    props.textareaType === "update" && "424px"};
`;

export const TextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  line-height: 1.5;
  overflow: hidden;
  max-height: 120px;
  background-color: #f5f5f5;
`;

export const CommentSubmitBtn = styled.button`
  position: absolute;
  height: 100%;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: ${(props: {
    disabled: boolean;
    $isWebpSupported: boolean | null;
  }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-commentSend.webp"
        : "/assets/icon-commentSend.svg"
    }) no-repeat center / 20px`};
  opacity: ${(props: {
    disabled: boolean;
    $isWebpSupported: boolean | null;
  }) => (props.disabled ? "0.3" : "1")};
`;
