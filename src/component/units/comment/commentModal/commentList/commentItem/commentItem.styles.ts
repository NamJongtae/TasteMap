import styled from "styled-components";

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
