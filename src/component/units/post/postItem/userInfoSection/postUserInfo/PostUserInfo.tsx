import React from "react";
import {
  ICommentData,
  IPostData,
  IUserData
} from "../../../../../../types/apiTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { usePostMenu } from "../../../../../../hook/logic/post/postItem/usePostMenu";
import PostMenu from "../postMenu/PostMenu";
import UserInfo from "../../../../../commons/userInfo/UserInfo";
import { MenuBtn } from "../../../postList/post.styles";

interface IProps {
  userData: Omit<IUserData, "email">;
  data?: IPostData | ICommentData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function PostUserInfo({ userData, data, postType }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const { menuRef, toggleMenuHandler, isOpenMenu, closeMenu } = usePostMenu();

  return (
    <UserInfo userData={userData} data={data}>
      <MenuBtn
        type='button'
        aria-label='게시물 메뉴'
        onClick={toggleMenuHandler}
        $isWebpSupported={isWebpSupported}
      />
      {isOpenMenu && (
        <PostMenu
          menuRef={menuRef}
          data={data as IPostData}
          userData={userData}
          postType={postType}
          closeMenu={closeMenu}
        />
      )}
    </UserInfo>
  );
}
