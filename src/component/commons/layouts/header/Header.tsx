import React from "react";
import {
  BackBtn,
  LeftSideWrapper,
  LogoImg,
  LogoLink,
  RightSideWrapper,
  Title,
  UploadLink,
  ProfileLink,
  Wrapper,
  SearchLink,
  SubmitBtn,
  CancelBtn,
  LogoutBtn
} from "./header.styles";
import { resolveWebp } from "../../../../library/webpSupport";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { thunkFetchLogout } from "../../../../slice/userSlice";
import { sweetConfirm } from "../../../../library/sweetAlert/sweetAlert";

interface IParms {
  type: string;
  onSubmit?: () => void;
  btnText?: string;
  disabled?: boolean;
}
export default function Header({ type, onSubmit, btnText, disabled }: IParms) {
  const navigate = useNavigate();
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const onClickLogout = () => {
    sweetConfirm("정말 로그아웃 하시겠습니까?", "확인", "취소", () => {
      dispatch(thunkFetchLogout());
    });
  };
  const setHeader = () => {
    switch (type) {
      case "home":
        return (
          <>
            <LeftSideWrapper>
              <UploadLink to={"/post/upload"} aria-label='작성'></UploadLink>
              <LogoLink to={"/"}>
                <Title>
                  <span className='a11y-hidden'>TasteMap</span>
                  <LogoImg
                    src={resolveWebp("/assets/webp/icon-logo.webp", "svg")}
                    alt=''
                  />
                </Title>
              </LogoLink>
            </LeftSideWrapper>
            <RightSideWrapper>
              <SearchLink aria-label='검색' to={"/search"} />
              <ProfileLink aria-label='프로필' to={"/profile"} />
            </RightSideWrapper>
          </>
        );
      case "upload":
        return (
          <>
            <LeftSideWrapper>
              <CancelBtn type='button' onClick={() => navigate("/")}>
                취소
              </CancelBtn>
              <LogoLink to={"/"}>
                <Title>
                  <span className='a11y-hidden'>TasteMap</span>
                  <LogoImg
                    src={resolveWebp("/assets/webp/icon-logo.webp", "svg")}
                    alt=''
                  />
                </Title>
              </LogoLink>
            </LeftSideWrapper>
            <RightSideWrapper>
              <SubmitBtn
                type='button'
                onClick={onSubmit}
                disabled={disabled === undefined ? false : disabled}
              >
                {btnText}
              </SubmitBtn>
            </RightSideWrapper>
          </>
        );
      case "search":
        return (
          <>
            <LeftSideWrapper>
              <BackBtn
                type='button'
                aria-label='뒤로가기'
                onClick={() => navigate(-1)}
              />
              <LogoLink to={"/"}>
                <Title>
                  <span className='a11y-hidden'>TasteMap</span>
                  <LogoImg
                    src={resolveWebp("/assets/webp/icon-logo.webp", "svg")}
                    alt=''
                  />
                </Title>
              </LogoLink>
            </LeftSideWrapper>
            <RightSideWrapper>
              <ProfileLink aria-label='프로필' to={"/profile"} />
            </RightSideWrapper>
          </>
        );
      case "profile":
        return (
          <>
            <LeftSideWrapper>
              <BackBtn
                type='button'
                aria-label='뒤로가기'
                onClick={() => navigate(-1)}
              />
              <LogoLink to={"/"}>
                <Title>
                  <span className='a11y-hidden'>TasteMap</span>
                  <LogoImg
                    src={resolveWebp("/assets/webp/icon-logo.webp", "svg")}
                    alt=''
                  />
                </Title>
              </LogoLink>
            </LeftSideWrapper>
            <RightSideWrapper>
              {uid ? (
                <>
                  <ProfileLink aria-label='프로필' to={"/profile"} />
                </>
              ) : (
                <LogoutBtn aria-label='로그아웃' onClick={onClickLogout} />
              )}
            </RightSideWrapper>
          </>
        );

      case "tasteMap":
        return (
          <>
            <LeftSideWrapper>
              <BackBtn
                type='button'
                aria-label='뒤로가기'
                onClick={() => navigate(-1)}
              />
              <LogoLink to={"/"}>
                <Title>
                  <span className='a11y-hidden'>TasteMap</span>
                  <LogoImg
                    src={resolveWebp("/assets/webp/icon-logo.webp", "svg")}
                    alt=''
                  />
                </Title>
              </LogoLink>
            </LeftSideWrapper>
            <RightSideWrapper>
              <ProfileLink aria-label='프로필' to={"/profile"} />
            </RightSideWrapper>
          </>
        );
    }
  };

  return (
    <>
      <Wrapper>{setHeader()}</Wrapper>
      <div style={{ paddingTop: "54px" }}></div>
    </>
  );
}
