import React from "react";
import { ICommentData, IPostData, IUserData } from "../../../api/apiType";
import {
  Username,
  UserImg,
  UserInfoWrapper,
  UserProfileLink
} from "./userInfo.styles";
import { resolveWebp } from "../../../library/resolveWebp";
interface IProps {
  userData: Omit<IUserData, "email">;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  replace?: boolean;
  data?: IPostData | ICommentData;
  children?: React.ReactNode;
  userLinkRef?: React.RefObject<HTMLAnchorElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLAnchorElement>;
}

export default function UserInfo({
  userData,
  data,
  children,
  replace,
  onClick,
  userLinkRef,
  onKeyDown
}: IProps) {
  return (
    <UserInfoWrapper>
      <h2 className='a11y-hidden'>유저 프로필</h2>
      <UserProfileLink
        to={`/profile/${data?.uid || userData.uid}`}
        ref={userLinkRef}
        replace={replace}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <UserImg
          src={data?.photoURL || userData.photoURL}
          alt='프로필 이미지'
          onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
            (e.currentTarget.src = resolveWebp(
              "/assets/webp/icon-defaultProfile.webp",
              "svg"
            ))
          }
        />
        <Username>{data?.displayName || userData.displayName}</Username>
      </UserProfileLink>
      {children}
    </UserInfoWrapper>
  );
}
