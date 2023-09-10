import React, { useEffect, useRef, useState } from "react";
import {
  ButtonWrapper,
  CommentBtn,
  ContentText,
  ContentWrapper,
  Count,
  LikeBtn,
  MoreBtn,
  Opection,
  OpectionBtn,
  OpectionList,
  PostDate,
  PostItemButtom,
  PostItemTop,
  UserImg,
  UserInfo,
  Username,
  Wrapper
} from "./postItem.styles";
import ImgSlider from "../imgSlider/ImgSlider";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { setDateFormat } from "../../../library/setDateFormat";
import { postSlice } from "../../../slice/postSlice";
import { sweetConfirm } from "../../../library/sweetAlert/sweetAlert";
import { IPostData } from "../../../api/firebase/firebaseAPIType";
import { useNavigate } from "react-router-dom";

interface IProps {
  data: IPostData;
}
export default function PostItem({ data }: IProps) {
  const userData = useSelector((state: RootState) => state.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const [openSelect, setOpenSelect] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const opectionListRef = useRef<HTMLUListElement>(null);
  const detailBtnRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const onClickSelect = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenSelect(!openSelect);
  };

  const onClickLike = () => {
    setIsLike(!isLike);
  };

  const onCliceRemove = (id: string) => {
    sweetConfirm("정말 삭제 하시겠습니까?", "삭제", "취소", () => {
      dispatch(postSlice.actions.remove(id));
    });
  };

  const onClickReport = (id: string) => {
    setOpenSelect(false);
    sweetConfirm("정말 신고 하시겠습니까?", "신고", "취소", () => {
      console.log(id);
    });
  };

  useEffect(() => {
    if (openSelect && detailBtnRef.current) {
      detailBtnRef.current.focus();
    }
  }, [openSelect]);
  return (
    <Wrapper>
      <PostItemTop onClick={()=>navigate(`/profile/${data.uid}`)}>
        <UserInfo>
          <UserImg src='/assets/icon-defaultProfile.svg' alt='프로필 이미지' />
          <Username>{data.displayName}</Username>
        </UserInfo>
        <MoreBtn type='button' aria-label='더보기' onClick={onClickSelect} />
        {openSelect && (
          <>
            {data.displayName === userData.displayName ? (
              <OpectionList ref={opectionListRef}>
                <Opection>
                  <OpectionBtn
                    type='button'
                    ref={detailBtnRef}
                    onClick={() => navigate(`/post/${data.id}`)}
                  >
                    상세보기
                  </OpectionBtn>
                </Opection>
                <Opection>
                  <OpectionBtn
                    type='button'
                    onClick={() => onCliceRemove(data.id)}
                  >
                    삭제
                  </OpectionBtn>
                </Opection>
                <Opection>
                  <OpectionBtn type='button'>수정</OpectionBtn>
                </Opection>
              </OpectionList>
            ) : (
              <OpectionList ref={opectionListRef}>
                <Opection>
                  <OpectionBtn
                    type='button'
                    ref={detailBtnRef}
                    onClick={() => navigate(`/post/${data.id}`)}
                  >
                    상세보기
                  </OpectionBtn>
                </Opection>
                <Opection>
                  <OpectionBtn
                    type='button'
                    onClick={() => onClickReport(data.id)}
                  >
                    신고
                  </OpectionBtn>
                </Opection>
              </OpectionList>
            )}
          </>
        )}
      </PostItemTop>
      <ContentWrapper>
        <ContentText>{data.content}</ContentText>
        {data.img.length>0&&<ImgSlider imgArray={data.img} />}
      </ContentWrapper>
      <PostItemButtom>
        <ButtonWrapper>
          <LikeBtn
            type='button'
            aria-label='좋아요'
            onClick={onClickLike}
            like={isLike}
          />
          <Count>{data.likeCount}</Count>
        </ButtonWrapper>
        <ButtonWrapper>
          <CommentBtn type='button' aria-label='댓글' />
          <Count>{data.commentCount}</Count>
        </ButtonWrapper>
        <PostDate dateTime='2023-09-09'>
          {setDateFormat(data.createdAt)}
        </PostDate>
      </PostItemButtom>
    </Wrapper>
  );
}
