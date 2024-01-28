import React from "react";
import { usePostRemove } from "../../../../../../hook/logic/post/postItem/usePostRemove";
import { usePostReport } from "../../../../../../hook/logic/post/postItem/usePostReport";
import { IPostData, IUserData } from "../../../../../../types/apiTypes";

import { useMoveToUpdatePage } from "../../../../../../hook/logic/post/postItem/useMoveToUpdatePage";
import { MenuItemBtn, MenuItem, MenuList } from "../../../postList/post.styles";

interface IProps {
  menuRef: React.RefObject<HTMLUListElement>;
  userData: Omit<IUserData, "email">;
  postType: "HOME" | "FEED" | "PROFILE";
  data: IPostData;
  closeMenu: () => void;
}
export default function PostMenu({
  menuRef,
  postType,
  userData,
  data,
  closeMenu
}: IProps) {
  const { postRemoveHandler } = usePostRemove({ postType });

  const { postReportHandler } = usePostReport({ userData, postType });

  const { moveUpdatePageHandler } = useMoveToUpdatePage();

  return (
    <>
      {userData.uid === data?.uid ? (
        <MenuList ref={menuRef}>
          <MenuItem>
            <MenuItemBtn
              className='opctionBtn'
              type='button'
              onClick={() => {
                moveUpdatePageHandler(data);
                closeMenu();
              }}
            >
              수정
            </MenuItemBtn>
          </MenuItem>
          <MenuItem>
            <MenuItemBtn
              className='opctionBtn'
              type='button'
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                postRemoveHandler(e, data);
                closeMenu();
              }}
            >
              삭제
            </MenuItemBtn>
          </MenuItem>
        </MenuList>
      ) : (
        <MenuList ref={menuRef}>
          <MenuItem>
            <MenuItemBtn
              className='opctionBtn'
              type='button'
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                postReportHandler(e, data);
                closeMenu();
              }}
            >
              신고
            </MenuItemBtn>
          </MenuItem>
        </MenuList>
      )}
    </>
  );
}
