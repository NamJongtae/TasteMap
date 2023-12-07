import { useCallback } from "react";
import { usePostReportMutation } from "../../../query/post/usePostReportMutation";
import { IPostData, IUserData } from "../../../../api/apiType";
import {
  sweetConfirm,
  sweetToast
} from "../../../../library/sweetAlert/sweetAlert";

interface IProps {
  userData: Omit<IUserData, "email">;
  postType: "HOME" | "FEED" | "PROFILE";
}

export const usePostReport = ({ postType, userData }: IProps) => {
  const { mutate: postReportMutate } = usePostReportMutation(postType);

  // 이미 신고한 게시물인지 체크
  const isAlreadyReported = (postData: IPostData) =>
    userData.uid && postData.reportUidList?.includes(userData.uid);

  // SweetAlert로 확인 모달을 열어주는 함수
  const openConfirmModal = (onConfirm: () => void) => {
    sweetConfirm("정말 신고 하시겠습니까?", "신고", "취소", onConfirm);
  };

  /**
   * 게시물 신고 함수
   */
  const postReportHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, postData: IPostData) => {
      e.stopPropagation();
      // 유저 프로필 데이터의 reportList에서 현재 게시물의 id값이 있으면 이미 신고한 게시물 이므로
      // 신고를 하지 못하도록 return
      if (isAlreadyReported(postData)) {
        return sweetToast("이미 신고한 게시물입니다.", "warning");
      }
      openConfirmModal(() => {
        postReportMutate({
          id: postData.id,
          reportCount: postData.reportCount
        });
      });
    },
    [userData, postType]
  );

  return { postReportHandler };
};
