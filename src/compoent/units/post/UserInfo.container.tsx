import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICommentData, IPostData, IProfileData } from "../../../api/apiType";

import {
  thunkFetchRemovePost,
  thunkFetchReportPost
} from "../../../slice/postSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import UserInfoUI from "./UserInfo.presenter";
import { profileSlice } from "../../../slice/profileSlice";

interface IProps {
  userData: IProfileData;
  data?: IPostData | ICommentData;
  activeMoreBtn: boolean;
  isProfilePage: boolean;
}

export default function UserInfo({
  userData,
  data,
  activeMoreBtn,
  isProfilePage
}: IProps) {
  const myProfileData = useSelector(
    (state: RootState) => state.profile.myProfileData
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { postId } = useParams();
  const profilePostListData = useSelector(
    (state: RootState) => state.profile.profilePostListData
  );
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  // 더보기 메뉴 ref 메뉴창이 닫힐 때 애니메이션 효과를 바꾸기 위해 사용
  const opectionListRef = useRef<HTMLUListElement>(null);
  /**
   * 게시물 수정 페이지 이동
   */
  const onClickEditBtn = () => {
    if (data && "id" in data) navigate(`/post/${data?.id}/edit`);
  };

  /**
   * 게시물 삭제 함수
   */
  const onCliceRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: IPostData
  ) => {
    e.stopPropagation();
    setIsOpenSelect(false);
    sweetConfirm("정말 삭제 하시겠습니까?", "삭제", "취소", () => {
      if (isProfilePage) {
        const newData = [...profilePostListData].filter(
          (item) => item.id !== data.id
        );
        dispatch(profileSlice.actions.setProfilePostListData(newData));
      }
      // 게시물 삭제 api 비동기 처리
      dispatch(thunkFetchRemovePost(data));
      if (postId) {
        navigate("/");
      }
    });
  };

  /**
   * 게시물 신고 함수
   */
  const onClickReport = (
    e: React.MouseEvent<HTMLButtonElement>,
    postData: IPostData
  ) => {
    e.stopPropagation();
    setIsOpenSelect(false);
    sweetConfirm("정말 신고 하시겠습니까?", "신고", "취소", () => {
      // 유저 프로필 데이터의 reportList에서 현재 게시물의 id값이 있으면 이미 신고한 게시물 이므로
      // 신고를 하지 못하도록 return
      if (postData.id && userData.reportPostList?.includes(postData.id)) {
        return sweetToast("이미 신고한 게시물입니다.", "warning");
      }
      // 게시물 신고 api 비동기 처리
      dispatch(thunkFetchReportPost(postData));
      // myProfileData reportPostList에 신고한 게시물 id 추가
      const newData = {
        ...myProfileData,
        reportPostList: [...(myProfileData.reportPostList || []), postData.id]
      };
      dispatch(profileSlice.actions.setMyprofile(newData));
    });
  };

  /**
   * 더보기 메뉴 활성화/비활성화 함수
   */
  const onClickSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      // 더보기 메뉴가 열려 있을 경우 닫기 애니메이션 추가
      // 애니메이션 실행 후 닫히 도록 하기위해 setTimeout 설정
      if (opectionListRef.current && isOpenSelect) {
        opectionListRef.current.style.animation = "fadeOutOption 0.5s";
        setTimeout(() => {
          setIsOpenSelect(!isOpenSelect);
        }, 300);
      } else {
        setIsOpenSelect(!isOpenSelect);
      }
    },
    [isOpenSelect]
  );

  // 더보기 메뉴가 아닌 다른 요소를 클릭 시 더보기 메뉴가 닫히 도록하는 이벤트를 body에 추가
  useEffect(() => {
    // 더보기 메뉴가 닫히도록 하는  이벤트 함수 생성
    const inActiveMoreMenu = (e: MouseEvent) => {
      // 더보기 메뉴가 열려있고, 현재 target이 더보기 메뉴 하위 요소가 아닐 때
      if (
        isOpenSelect &&
        !opectionListRef.current?.contains(e.target as Node)
      ) {
        if (opectionListRef.current) {
          opectionListRef.current.style.animation = "fadeOutOption 0.5s";
          setTimeout(() => {
            setIsOpenSelect(!isOpenSelect);
          }, 300);
        }
      }
    };

    // 더보기 메뉴가 열렸을 경우 이벤트를 추가
    if (isOpenSelect) {
      document.body.addEventListener("click", inActiveMoreMenu);
    } else {
      // 더보기 메뉴가 닫히는 경우 이벤트를 제거
      document.body.removeEventListener("click", inActiveMoreMenu);
    }

    // clearn up 컴포넌트가 제거 되기 전 이벤트 제거
    return () => {
      document.body.removeEventListener("click", inActiveMoreMenu);
    };
  }, [isOpenSelect]);

  return (
    <UserInfoUI
      userData={userData}
      data={data}
      activeMoreBtn={activeMoreBtn}
      onClickSelect={onClickSelect}
      isOpenSelect={isOpenSelect}
      opectionListRef={opectionListRef}
      onClickEditBtn={onClickEditBtn}
      onCliceRemove={onCliceRemove}
      onClickReport={onClickReport}
      isProfilePage={isProfilePage}
    />
  );
}
