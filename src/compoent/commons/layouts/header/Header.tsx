import React from "react";
import {
  BackBtn,
  LeftSideWrapper,
  LogoImg,
  LogoLink,
  RightSideWrapper,
  Title,
  UploadLink,
  MypageLink,
  Wrapper,
  SearchLink,
  SubmitBtn
} from "./header.styles";
import { resolveWebp } from "../../../../library/webpSupport";
import { useNavigate } from "react-router-dom";

interface IParms {
  type: string;
  onSubmit?: () => void;
  btnText?: string;
  disabled?: boolean
}
export default function Header({ type, onSubmit, btnText, disabled }: IParms) {
  const navigate = useNavigate();
  const setHeader = () => {
    switch (type) {
      case "home":
        return (
          <>
            <LeftSideWrapper>
              <UploadLink to={"/upload"}></UploadLink>
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
              <MypageLink aria-label='마이페이지' to={"/mypage"} />
            </RightSideWrapper>
          </>
        );
      case "upload":
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
              <SubmitBtn type='button' onSubmit={onSubmit} disabled={disabled as boolean}>
                {btnText}
              </SubmitBtn>
            </RightSideWrapper>
          </>
        );
      case "search":
        return (
          <>
            <LeftSideWrapper>
              <BackBtn type='button' aria-label='뒤로가기' />
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
              <MypageLink aria-label='마이페이지' to={"/mypage"} />
            </RightSideWrapper>
          </>
        );
      case "mypage":
        return (
          <>
            <LeftSideWrapper>
              <BackBtn type='button' aria-label='뒤로가기' />
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
            </RightSideWrapper>
          </>
        );
    }
  };

  return <Wrapper>{setHeader()}</Wrapper>;
}
