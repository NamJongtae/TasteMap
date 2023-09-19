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
  background-color: #fff;
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
  right: 3px;
  width: 30px;
  height: 30px;
  background: url("/assets/icon-back.svg") no-repeat center / 16px;
  transform: rotate(180deg);
`;

export const CommentModal = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  height: 600px;
  background-color: #fff;
  z-index: 999;
`;

export const CommentList = styled.ul`
  position: relative;
  padding: 20px;
  max-height: 500px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const CommentItem = styled.li`
  :not(:last-child) {
    margin-bottom: 20px;
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
`

export const CommentDate = styled.time`
  font-size: 12px;
  color: #bdbdbd;
  margin: 0 5px 5px 53px;
`;

export const CommentBtn = styled.button`
  font-size: 12px;
  color: #bdbdbd;
  background: none;
  margin-left: 5px;
`;

export const UserImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: none;
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
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-color: #f5f5f5;
  padding: 8px 36px 8px 15px;
`

export const CommentTextArea = styled.textarea`
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
  bottom: 21px;
  right: 20px;
  width: 20px;
  height: 20px;
  background: url("/assets/icon-commentSend.svg") no-repeat center / 16px;
`;
