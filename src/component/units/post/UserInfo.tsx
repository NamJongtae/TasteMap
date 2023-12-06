import React from "react";
import { ICommentData, IPostData, IUserData } from "../../../api/apiType";
import { useUserInfo } from "../../../hook/logic/post/useUserInfo";
import {
  Username,
  MoreBtn,
  Option,
  OptionBtn,
  OptionList,
  UserImg,
  UserInfoWrapper,
  UserProfileLink
} from "./userInfo.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { resolveWebp } from "../../../library/resolveWebp";
interface IProps {
  userData: Omit<IUserData, "email">;
  data?: IPostData | ICommentData;
  activeMoreBtn: boolean;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function UserInfo({
  userData,
  data,
  activeMoreBtn,
  postType
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const {
    isOpenSelect,
    openSelectHandler,
    opectionListRef,
    moveUpdatePageHandler,
    postRemoveHandler,
    postReportHandler
  } = useUserInfo({ data, postType, userData });

  return (
    <UserInfoWrapper>
      <h2 className='a11y-hidden'>유저 프로필</h2>
      <UserProfileLink to={`/profile/${data?.uid || userData.uid}`}>
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

      {activeMoreBtn && (
        <MoreBtn
          type='button'
          aria-label='게시물 메뉴'
          onClick={openSelectHandler}
          $isWebpSupported={isWebpSupported}
        />
      )}
      {isOpenSelect && data && (
        <>
          {userData.uid === data?.uid ? (
            <OptionList ref={opectionListRef}>
              <Option>
                <OptionBtn
                  className='opctionBtn'
                  type='button'
                  onClick={moveUpdatePageHandler}
                >
                  수정
                </OptionBtn>
              </Option>
              <Option>
                <OptionBtn
                  className='opctionBtn'
                  type='button'
                  onClick={(e) => postRemoveHandler(e, data as IPostData)}
                >
                  삭제
                </OptionBtn>
              </Option>
            </OptionList>
          ) : (
            <OptionList ref={opectionListRef}>
              <Option>
                <OptionBtn
                  className='opctionBtn'
                  type='button'
                  onClick={(e) => postReportHandler(e, data as IPostData)}
                >
                  신고
                </OptionBtn>
              </Option>
            </OptionList>
          )}
        </>
      )}
    </UserInfoWrapper>
  );
}
