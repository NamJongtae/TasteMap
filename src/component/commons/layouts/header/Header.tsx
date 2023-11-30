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
import { useNavigate, useParams } from "react-router-dom";
import { sweetConfirm } from "../../../../library/sweetAlert/sweetAlert";
import { useLogoutMutation } from "../../../../hook/query/auth/useLogoutMutation";
import { useSupportedWebp } from '../../../../hook/useSupportedWebp';

interface IParms {
  type: string;
  onSubmit?: () => void;
  btnText?: string;
  disabled?: boolean;
}
export default function Header({ type, onSubmit, btnText, disabled }: IParms) {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { mutate } = useLogoutMutation();
  const { isWebpSupported, resolveWebp } = useSupportedWebp();
  const onClickLogout = () => {
    sweetConfirm("정말 로그아웃 하시겠습니까?", "확인", "취소", () => {
      mutate();
    });
  };
  const setHeader = () => {
    switch (type) {
      case "home":
        return (
          <>
            <LeftSideWrapper>
              <UploadLink
                to={"/post/upload"}
                $isWebpSupported={isWebpSupported}
                aria-label='작성'
              ></UploadLink>
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
              <SearchLink
                aria-label='검색'
                to={"/search"}
                $isWebpSupported={isWebpSupported}
              />
              <ProfileLink
                aria-label='프로필'
                to={"/profile"}
                $isWebpSupported={isWebpSupported}
              />
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
                $isWebpSupported={isWebpSupported}
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
              <ProfileLink
                aria-label='프로필'
                to={"/profile"}
                $isWebpSupported={isWebpSupported}
              />
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
                $isWebpSupported={isWebpSupported}
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
                  <ProfileLink
                    aria-label='프로필'
                    to={"/profile"}
                    $isWebpSupported={isWebpSupported}
                  />
                </>
              ) : (
                <LogoutBtn
                  aria-label='로그아웃'
                  onClick={onClickLogout}
                  $isWebpSupported={isWebpSupported}
                />
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
                $isWebpSupported={isWebpSupported}
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
              <ProfileLink
                aria-label='프로필'
                to={"/profile"}
                $isWebpSupported={isWebpSupported}
              />
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
