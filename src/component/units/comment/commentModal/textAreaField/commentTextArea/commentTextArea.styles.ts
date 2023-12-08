import styled from "styled-components";

export const CommentTextAreaInner = styled.div`
  position: relative;
  width: calc(100% - 45px);
  height: 100%;
  border-radius: 20px;
  background-color: #f5f5f5;
  padding: 8px 36px 8px 15px;
  margin-left: ${(props: { textareaType: "write" | "edit" | "reply" }) =>
    props.textareaType === "edit" && "45px"};
  max-width: ${(props: { textareaType: "write" | "edit" | "reply" }) =>
    props.textareaType === "edit" && "424px"};
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
