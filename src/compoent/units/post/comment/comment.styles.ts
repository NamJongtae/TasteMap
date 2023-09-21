import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const Dim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 999;
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
  right: ${(props: { isReply: boolean }) => !props.isReply && "3px"};
  left: ${(props: { isReply: boolean }) => props.isReply && "3px"};
  width: 30px;
  height: 30px;
  body.webp & {
    background: url("/assets/webp/icon-back.webp") no-repeat center / 16px;
  }
  body.no-webp & {
    background: url("/assets/icon-back.svg") no-repeat center / 16px;
  }
  transform: ${(props: { isReply: boolean }) =>
    props.isReply ? "rotate(0deg)" : "rotate(180deg)"};
`;

export const CommentModalWrapper = styled.article`
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

export const CommenWrpper = styled.ul`
  position: relative;
  padding: 20px;
  padding-bottom: 115px;
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

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

export const CommentText = styled.div`
  margin: 0 0 5px 53px;
  font-size: 14px;
  word-break: break-all;
  white-space: pre-wrap;
  line-height: 1.5;
`;

export const CommentBottom = styled.div`
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

export const UserImg = styled.img`
  align-self: flex-start;
  width: 42px;
  height: 42px;
  padding: 3px;
  border-radius: 50%;
  background: #f5f5f5;
`;

export const ReplyWrapper = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;
  margin-top: 20px;
  padding-left: 45px;
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
`;

export const CommentTextAreaInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #f5f5f5;
  padding: 8px 36px 8px 15px;
  margin-left: ${(props: { textAreaType: "write" | "edit" | "reply" }) =>
    props.textAreaType === "edit" && "45px"};
  max-width: ${(props: { textAreaType: "write" | "edit" | "reply" }) =>
    props.textAreaType === "edit" && "424px"};
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
  body.webp & {
    background: url("/assets/webp/icon-commentSend.webp") no-repeat center /
      20px;
  }
  body.no-webp & {
    background: url("/assets/icon-commentSend.svg") no-repeat center / 20px;
  }

  opacity: ${(props: { disabled: boolean }) => (props.disabled ? "0.3" : "1")};
`;

export const ReplyCountBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #065fd4;
  background: none;
  margin: 5px 0 0 53px;
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 20px;
`;
