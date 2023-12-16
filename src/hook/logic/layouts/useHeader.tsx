import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLogoutMutation } from "../../query/auth/useLogoutMutation";
import { sweetConfirm } from "../../../library/sweetAlert/sweetAlert";

import {
  BackBtn,
  LeftSideWrapper,
  LogoImg,
  LogoLink,
  RightSideWrapper,
  Title,
  UploadLink,
  ProfileLink,
  SearchLink,
  SubmitBtn,
  CancelBtn,
  LogoutBtn
} from "../../../component/commons/layouts/header/header.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { resolveWebp } from "../../../library/resolveWebp";

interface IProps {
  type: "home" | "upload" | "search" | "profile" | "tasteMap";
  onSubmit?: () => void;
  btnText?: string;
  disabled?: boolean;
}

export const useHeader = ({ type, onSubmit, btnText, disabled }: IProps) => {
  const navigate = useNavigate();
  const { uid } = useParams();
  const { mutate } = useLogoutMutation();
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const logoutHandler = () => {
    sweetConfirm("정말 로그아웃 하시겠습니까?", "확인", "취소", () => {
      mutate();
    });
  };

  const LeftSide = ({ children }: { children: React.ReactNode }) => (
    <LeftSideWrapper>
      {children}
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
  );

  const RightSide = ({ children }: { children: React.ReactNode }) => (
    <RightSideWrapper>{children}</RightSideWrapper>
  );

  const getHeader = () => {
    switch (type) {
      case "home":
        return (
          <>
            <LeftSide>
              <UploadLink
                to={"/post/upload"}
                $isWebpSupported={isWebpSupported}
                aria-label='작성'
              ></UploadLink>
            </LeftSide>
            <RightSide>
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
            </RightSide>
          </>
        );
      case "upload":
        return (
          <>
            <LeftSide>
              <CancelBtn type='button' onClick={() => navigate("/")}>
                취소
              </CancelBtn>
            </LeftSide>
            <RightSide>
              <SubmitBtn
                type='button'
                onClick={onSubmit}
                disabled={disabled === undefined ? false : disabled}
              >
                {btnText}
              </SubmitBtn>
            </RightSide>
          </>
        );
      case "search":
      case "profile":
      case "tasteMap":
        return (
          <>
            <LeftSide>
              <BackBtn
                type='button'
                aria-label='뒤로가기'
                onClick={() => navigate(-1)}
                $isWebpSupported={isWebpSupported}
              />
            </LeftSide>
            <RightSide>
              {type === "profile" && !uid ? (
                <LogoutBtn
                  aria-label='로그아웃'
                  onClick={logoutHandler}
                  $isWebpSupported={isWebpSupported}
                />
              ) : (
                <ProfileLink
                  aria-label='프로필'
                  to={"/profile"}
                  $isWebpSupported={isWebpSupported}
                />
              )}
            </RightSide>
          </>
        );
      default:
        return null;
    }
  };

  return { getHeader };
};
