import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { ICommentData, IReplyData } from "../../../../api/apiType";
import { setDateFormat } from "../../../../library/setDateFormat";
import {
  commentSlice,
} from "../../../../slice/commentSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../../library/sweetAlert/sweetAlert";
import {
  replySlice,
} from "../../../../slice/replySlice";
import CommentItemUI from "./CommentItem.presenter";
import { useCommentRemoveMutation } from '../../../../hook/query/post/comment/useCommentRemoveMutation';
import { useCommentReportMutation } from '../../../../hook/query/post/comment/useCommentReportMutation';
import { useReplyRemoveMutation } from '../../../../hook/query/post/reply/useReplyRemoveMutation';
import { useReplyReportMutation } from '../../../../hook/query/post/reply/useReplyReportMutation';

interface IProps {
  data: ICommentData | IReplyData;
  idx: number;
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function CommentItem({
  data,
  idx,
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType
}: IProps) {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState(false);
  const isReport = data.reportUidList.includes(myInfo.uid);

  const { mutate: commentRemoveMutate } = useCommentRemoveMutation(postType);
  const { mutate: commentReportMutate } = useCommentReportMutation(postType);
  const { mutate: replyRemoveMutate } = useReplyRemoveMutation(postType);
  const { mutate: replyReportMutate } = useReplyReportMutation(postType);

  const onClickEdit = useCallback(() => {
    setIsEdit(!isEdit);
  }, [isEdit]);

  const onClickReply = () => {
    if (!isOpenReplyModal) {
      dispatch(replySlice.actions.setIsOpenReplyModal(true));
      if ("commentId" in data)
        dispatch(replySlice.actions.setParentCommentId(data.commentId));
    } else {
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    }
  };

  const onClickRemove = useCallback(() => {
    if (data) {
      sweetConfirm("정말 삭제하겠습니까?", "삭제", "취소", () => {
        if (!isReply) {
          commentRemoveMutate(data as ICommentData);
        } else {
          replyRemoveMutate({
            parentCommentId: (data as IReplyData).parentCommentId,
            replyId: (data as IReplyData).replyId,
            postId: data.postId
          })
        }
      });
    }
  }, [data]);

  const onClickReport = useCallback(() => {
    // 댓글 신고
    if (!isReply && "commentId" in data) {
      // 중복 신고 방지
      if (isReport) {
        sweetToast("이미 신고한 댓글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
          commentReportMutate({
            commentId: data.commentId,
            reportCount: data.reportCount,
            postId
          })
      });
    } else if (isReply && "replyId" in data) {
      // 답글 신고
      // 중복 신고 방지
      if (isReport) {
        sweetToast("이미 신고한 답글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
        replyReportMutate({
          parentCommentId: data.parentCommentId,
          replyId: data.replyId,
          reportCount: data.reportCount,
          postId: data.postId,
        })
      });
    }
  }, [isReply, isReport]);

  // 유저 프로필 클릭 시 프로필 페이지 이동 전 모달 창 닫기
  const onClickProfileLink = () => {
    if (!isReply) {
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
    } else {
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    }
  };

  const formattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  return (
    <CommentItemUI
      data={data}
      idx={idx}
      myInfo={myInfo}
      isEdit={isEdit}
      isReply={isReply}
      onClickEdit={onClickEdit}
      onClickReply={onClickReply}
      isOpenReplyModal={isOpenReplyModal}
      formattedDate={formattedDate}
      onClickRemove={onClickRemove}
      onClickReport={onClickReport}
      onClickProfileLink={onClickProfileLink}
      closeBtnRef={closeBtnRef}
      textareaRef={textareaRef}
      firstItemLinkRef={firstItemLinkRef}
      postType={postType}
    />
  );
}
