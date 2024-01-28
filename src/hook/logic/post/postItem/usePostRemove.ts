import { useCallback } from "react";
import { IPostData } from "../../../../types/apiTypes";
import { usePostDeleteMutation } from "../../../query/post/usePostDeleteMutation";
import { sweetConfirm } from "../../../../library/sweetAlert/sweetAlert";

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
}
export const usePostRemove = ({ postType }: IProps) => {
  const { mutate } = usePostDeleteMutation(postType);

  /**
   * SweetAlert로 확인 모달을 열어주는 함수
   */
  const openConfirmModal = (onConfirm: () => void) => {
    sweetConfirm("정말 삭제 하시겠습니까?", "삭제", "취소", onConfirm);
  };

  /**
   * 게시물 삭제 함수
   */
  const postRemoveHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, data: IPostData) => {
      e.stopPropagation();
      openConfirmModal(() => {
        mutate({ id: data.id, imgName: data.imgName });
      });
    },
    []
  );

  return { postRemoveHandler };
};
