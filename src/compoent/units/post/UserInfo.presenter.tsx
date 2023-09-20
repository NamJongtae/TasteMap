import React from "react";
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
import { resolveWebp } from "../../../library/webpSupport";
import { ICommentData, IPostData, IProfileData } from "../../../api/apiType";
interface IProps {
  userData: Pick<IProfileData, "uid" | "displayName" | "photoURL">;
  data?: IPostData | ICommentData;
  activeMoreBtn: boolean;
  onClickSelect: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isOpenSelect: boolean;
  opectionListRef: React.RefObject<HTMLUListElement>;
  onClickEditBtn: () => void;
  onCliceRemove: (
    e: React.MouseEvent<HTMLButtonElement>,
    data: IPostData
  ) => void;
  onClickReport: (
    e: React.MouseEvent<HTMLButtonElement>,
    postData: IPostData
  ) => void;
}
export default function UserInfoUI({
  userData,
  data,
  activeMoreBtn,
  onClickSelect,
  isOpenSelect,
  opectionListRef,
  onClickEditBtn,
  onCliceRemove,
  onClickReport
}: IProps) {
  return (
    <UserInfoWrapper>
      <h2 className='a11y-hidden'>유저 프로필</h2>
      <UserProfileLink to={`profile/${data?.uid || userData.uid}`}>
        <UserImg
          src={
            data?.photoURL === ""
              ? resolveWebp("/assets/webp/icon-defaultProfile.webp", "svg")
              : data?.photoURL || userData.photoURL
          }
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
        <MoreBtn type='button' aria-label='더보기' onClick={onClickSelect} />
      )}
      {isOpenSelect && data && (
        <>
          {userData.uid === data?.uid ? (
            <OptionList ref={opectionListRef}>
              <Option>
                <OptionBtn
                  className='opctionBtn'
                  type='button'
                  onClick={onClickEditBtn}
                >
                  수정
                </OptionBtn>
              </Option>
              <Option>
                <OptionBtn
                  className='opctionBtn'
                  type='button'
                  onClick={(e) => onCliceRemove(e, data)}
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
                  onClick={(e) => onClickReport(e, userData)}
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
