import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ICommentData,
  IKnownError,
  IPostData,
  IProfileData
} from "../../../api/apiType";

import {
  postSlice,
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
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
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
    // 유저 프로필 데이터의 reportList에서 현재 게시물의 id값이 있으면 이미 신고한 게시물 이므로
    // 신고를 하지 못하도록 return
    if (userData.uid && postData.reportUidList?.includes(userData.uid)) {
      return sweetToast("이미 신고한 게시물입니다.", "warning");
    }
    sweetConfirm("정말 신고 하시겠습니까?", "신고", "취소", () => {
      // 게시물 신고 api 비동기 처리
      dispatch(thunkFetchReportPost(postData)).then((result) => {
        // 신고한 게시물이 유효한지 체크
        if (result.payload) {
          // 신고한 게시물이 유효하다면 신고 후 postData 수정 로직 수행
          if ((result.payload as IPostData).id) {
            if (userData.uid) {
              const newData = [...postListData];
              const index = newData.findIndex(
                (item) => item.id === postData.id
              );
              newData[index] = {
                ...newData[index],
                reportUidList: [
                  ...(newData[index].reportUidList || []),
                  userData.uid
                ]
              };
              dispatch(postSlice.actions.setPostListData(newData));
            }
          } else if (
            // 신고한 게시물이 유효하지 않다면 모달창을 닫고 첫 페이지 게시물 가져오기
            (result.payload as IKnownError).message ===
            "게시물이 존재하지 않습니다."
          ) {
            if (!isProfilePage) {
              const newData = [...postListData].filter(
                (item) => item.id !== postData.id
              );
              dispatch(postSlice.actions.setPostListData(newData));
            } else {
              const newData = [...profilePostListData].filter(
                (item) => item.id !== postData.id
              );
              dispatch(profileSlice.actions.setProfilePostListData(newData));
            }
          }
        }
      });
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
