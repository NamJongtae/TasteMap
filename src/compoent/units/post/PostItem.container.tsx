import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  thuckFetchAddPostLike,
  thuckFetchRemovePost,
  thuckFetchRemovePostLike,
  thuckFetchReportPost
} from "../../../slice/postSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../library/sweetAlert/sweetAlert";
import { IPostData, IProfileData } from "../../../api/apiType";
import { useNavigate } from "react-router-dom";

import PostItemUI from "./PostItem.present";
import { fetchProfile } from "../../../api/firebase/profileAPI";
interface IProps {
  data: IPostData;
}

export default function PostItem({ data }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  // 사용자 프로필
  const [userProfile, setUserProfile] = useState({} as IProfileData);
  // 더보기 메뉴 활성화 관리
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  // 좋아요 유무
  const [isLike, setIsLike] = useState(false);
  // 좋아요 수
  const [likeCount, setLikeCount] = useState(data.likeCount);
  // 더보기 메뉴 ref 메뉴창이 닫힐 때 애니메이션 효과를 바꾸기 위해 사용
  const opectionListRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  /**
   * 유저 정보 페이지 이동
   */
  const onClickUserInfo = () => {
    navigate(`/profile/${data.uid}`);
  };

  /**
   * 게시물 상세 페이지 이동
   */
  const onClickDetailBtn = () => {
    navigate(`/post/${data.id}`);
  };

  /**
   * 게시물 수정 페이지 이동
   */
  const onClickEditBtn = () => {
    navigate(`/post/${data.id}/edit`);
  };

  /**
   * 더보기 메뉴 활성화/비활성화 함수
   */
  const onClickSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  };

  /**
   * 좋아요 추가 함수
   */
  const onClickLike = async (id: string | undefined) => {
    if (!id) return;
    // 자기 자신의 게시물에 좋아요를 누르면 retun
    if (userProfile.uid === data.uid) {
      sweetToast("자신의 게시물은 좋아요할 수 없습니다!", "warning");
      return;
    }

    if (!isLike) {
      // 좋아요 상태가 아닐경우 해당 게시물 좋아요 수를 1 늘림
      setLikeCount((prev) => (prev as number) + 1);
      // 좋아요 추가 api 비동기 처리
      dispatch(thuckFetchAddPostLike(id));
    } else {
      // 좋아요 상태가 아닐경우 해당 게시물 좋아요 수를 1 줄임
      setLikeCount((prev) => (prev as number) - 1);
      // 좋아요 제거 api 비동기 처리
      dispatch(thuckFetchRemovePostLike(id));
    }
    // 좋아요 유무 변경
    setIsLike(!isLike);
  };

  /**
   * 좋아요 제거 함수
   */
  const onCliceRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    data: IPostData
  ) => {
    e.stopPropagation();
    setIsOpenSelect(false);
    sweetConfirm("정말 삭제 하시겠습니까?", "삭제", "취소", () => {
      // 게시물 삭제 api 비동기 처리
      dispatch(thuckFetchRemovePost(data));
    });
  };

  /**
   * 좋아요 신고 함수
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
      if (data.id && userProfile.reportList?.includes(data.id)) {
        return sweetToast("이미 신고한 게시물입니다.", "warning");
      }
      // 게시물 신고 api 비동기 처리
      dispatch(thuckFetchReportPost(postData));
    });
  };

  // userProfile 데이터 가져오기
  useEffect(() => {
    const getProfile = async () => {
      const res = (await fetchProfile()) as IProfileData;
      setUserProfile(res);
    };
    getProfile();
  }, []);

  // userProfile의 likeList 데이터를 이용하여 게시물의 좋아요 유무를 판별
  useEffect(() => {
    if (userProfile?.likeList && data.id)
      setIsLike(userProfile.likeList.includes(data.id));
  }, [userProfile]);

  // 더보기 메뉴가 아닌 다른 요소를 클릭 시 더보기 메뉴가 닫히 도록하는 이벤트를 body에 추가
  useEffect(() => {
    // 더보기 메뉴가 닫히도록 하는  이벤트 함수 생성
    const inActiveMoreBtnMenu = (e: MouseEvent) => {
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
      document.body.addEventListener("click", inActiveMoreBtnMenu);
    } else {
      // 더보기 메뉴가 닫히는 경우 이벤트를 제거
      document.body.removeEventListener("click", inActiveMoreBtnMenu);
    }

    // clearn up 컴포넌트가 제거 되기 전 이벤트 제거
    return () => {
      document.body.removeEventListener("click", inActiveMoreBtnMenu);
    };
  }, [isOpenSelect]);

  return (
    <PostItemUI
      data={data}
      onClickSelect={onClickSelect}
      isOpenSelect={isOpenSelect}
      userProfile={userProfile}
      opectionListRef={opectionListRef}
      onCliceRemove={onCliceRemove}
      onClickReport={onClickReport}
      isLike={isLike}
      likeCount={likeCount}
      onClickLike={onClickLike}
      onClickUserInfo={onClickUserInfo}
      onClickDetailBtn={onClickDetailBtn}
      onClickEditBtn={onClickEditBtn}
    />
  );
}
