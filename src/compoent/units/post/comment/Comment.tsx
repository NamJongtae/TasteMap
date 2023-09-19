import React, { useRef } from "react";
import { Wrapper } from "../postItem.styles";
import {
  CloseBtn,
  CommentBottom,
  CommentBtn,
  CommentDate,
  CommentItem,
  CommentList,
  CommentModal,
  CommentSubmitBtn,
  CommentText,
  CommentTextArea,
  CommentTextAreaInner,
  CommentTextAreaWrapper,
  Dim,
  ModalTitle,
  ModalTitleBar
} from "./comment.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import UserInfo from "../UserInfo.container";

export default function Comment() {
  const userData = useSelector((state: RootState) => state.user.data);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };
  return (
    <Wrapper>
      <Dim></Dim>
      <CommentModal>
        <ModalTitleBar>
          <ModalTitle>댓글</ModalTitle>
        </ModalTitleBar>
        <CommentList>
          <CommentItem>
            <UserInfo userData={userData} postData={{}} activeMoreBtn={false} />
            <CommentText>
              {"안녕하세요\n반갑습니다."}
            </CommentText>
            <CommentBottom>
              <CommentDate>방금전</CommentDate>
              <CommentBtn>답글</CommentBtn>
              <CommentBtn>수정</CommentBtn>
              <CommentBtn>삭제</CommentBtn>
            </CommentBottom>
          </CommentItem>
          <CommentItem>
            <UserInfo userData={userData} postData={{}} activeMoreBtn={false} />
            <CommentText>안녕하세요.</CommentText>
            <CommentBottom>
              <CommentDate>방금전</CommentDate>
              <CommentBtn>답글</CommentBtn>
              <CommentBtn>수정</CommentBtn>
              <CommentBtn>삭제</CommentBtn>
            </CommentBottom>
          </CommentItem>
          <CommentItem>
            <UserInfo userData={userData} postData={{}} activeMoreBtn={false} />
            <CommentText>안녕하세요.</CommentText>
            <CommentBottom>
              <CommentDate>방금전</CommentDate>
              <CommentBtn>답글</CommentBtn>
              <CommentBtn>수정</CommentBtn>
              <CommentBtn>삭제</CommentBtn>
            </CommentBottom>
          </CommentItem>
        </CommentList>
        <CommentTextAreaWrapper>
          <CommentTextAreaInner>
            <CommentTextArea
              ref={textareaRef}
              onChange={handleResizeHeight}
              placeholder='댓글을 입력하세요.'
              rows={1}
            />

            <CommentSubmitBtn type='button' />
          </CommentTextAreaInner>
        </CommentTextAreaWrapper>
        <CloseBtn type='button' aria-label='닫기' />
      </CommentModal>
    </Wrapper>
  );
}
