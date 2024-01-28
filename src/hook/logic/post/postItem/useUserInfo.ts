import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostDeleteMutation } from "../../../query/post/usePostDeleteMutation";
import { usePostReportMutation } from "../../../query/post/usePostReportMutation";
import { ICommentData, IPostData, IUserData } from "../../../../types/apiTypes";
import {
  sweetConfirm,
  sweetToast
} from "../../../../library/sweetAlert/sweetAlert";

interface IProps {
  userData: Omit<IUserData, "email">;
  data?: IPostData | ICommentData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export const useUserInfo = ({ data, postType, userData }: IProps) => {
  const navigate = useNavigate();
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  // 더보기 메뉴 ref 메뉴창이 닫힐 때 애니메이션 효과를 바꾸기 위해 사용
  const opectionListRef = useRef<HTMLUListElement>(null);

  const { mutate } = usePostDeleteMutation(postType);

  const { mutate: postReportMutate } = usePostReportMutation(postType);

  /**
   * 게시물 수정 페이지 이동
   */
  const moveUpdatePageHandler = () => {
    if ((data as IPostData).id)
      navigate(`/post/${(data as IPostData).id}/edit`);
  };

  /**
   * 게시물 삭제 함수
   */
  const postRemoveHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, data: IPostData) => {
      e.stopPropagation();
      setIsOpenSelect(false);
      sweetConfirm("정말 삭제 하시겠습니까?", "삭제", "취소", () => {
        mutate({ id: data.id, imgName: data.imgName });
      });
    },
    [postType]
  );

  /**
   * 게시물 신고 함수
   */
  const postReportHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, postData: IPostData) => {
      e.stopPropagation();
      setIsOpenSelect(false);
      // 유저 프로필 데이터의 reportList에서 현재 게시물의 id값이 있으면 이미 신고한 게시물 이므로
      // 신고를 하지 못하도록 return
      if (userData.uid && postData.reportUidList?.includes(userData.uid)) {
        return sweetToast("이미 신고한 게시물입니다.", "warning");
      }
      sweetConfirm("정말 신고 하시겠습니까?", "신고", "취소", () => {
        postReportMutate({
          id: postData.id,
          reportCount: postData.reportCount
        });
      });
    },
    [userData, postType]
  );

  /**
   * 더보기 메뉴 활성화/비활성화 함수
   */
  const openSelectHandler = useCallback(
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
    }
    // clearn up 컴포넌트가 제거 되기 전 이벤트 제거
    return () => {
      document.body.removeEventListener("click", inActiveMoreMenu);
    };
  }, [isOpenSelect]);

  return {
    isOpenSelect,
    openSelectHandler,
    opectionListRef,
    moveUpdatePageHandler,
    postRemoveHandler,
    postReportHandler
  };
};
