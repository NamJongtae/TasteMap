import React, { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { ICommentData, IKnownError, IReplyData } from "../../../../api/apiType";
import { setDateFormat } from "../../../../library/setDateFormat";
import {
  commentSlice,
  thunkFetchRemoveComment,
  thunkFetchReportComment
} from "../../../../slice/commentSlice";
import {
  sweetConfirm,
  sweetToast
} from "../../../../library/sweetAlert/sweetAlert";
import { postSlice } from "../../../../slice/postSlice";
import {
  replySlice,
  thunkFetchRemoveReply,
  thunkFetchReportReply
} from "../../../../slice/replySlice";
import CommentItemUI from "./CommentItem.presenter";

interface IProps {
  data: ICommentData | IReplyData;
  idx: number;
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
}
export default function CommentItem({
  data,
  idx,
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef
}: IProps) {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
  );
  const commentListData = useSelector(
    (state: RootState) => state.comment.commentListData
  );
  const replyListData = useSelector(
    (state: RootState) => state.reply.replyListData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = useCallback(() => {
    setIsEdit(!isEdit);
  },[isEdit]);

  const onClickReply = () => {
    if (!isOpenReplyModal) {
      dispatch(replySlice.actions.setIsOpenReplyModal(true));
      if ("commentId" in data)
        dispatch(replySlice.actions.setParentCommentId(data.commentId));
    } else {
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    }
  };

  // 댓글 에러 처리 ( 이미 삭제된 댓글. 이미 삭제된 게시글 )
  const commentError = useCallback((type: "noPost" | "noComment") => {
    if (type === "noPost") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));

      // 해당 게시물 삭제
      const newData = [...postListData].filter(
        (item) => item.id !== (data as ICommentData).postId
      );
      dispatch(postSlice.actions.setPostListData(newData));
    } else if (type === "noComment") {
      // 해당 댓글 삭제
      const newCommentListData = [...commentListData].filter(
        (item) => item.commentId !== (data as ICommentData).commentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));

      // 답글 모달창 닫기
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
    }
  },[]);

  const replyError = useCallback((type: "noReply" | "noPost" | "noComment") => {
    if (type === "noReply") {
      // 해당 답글 삭제
      const newReplyData = [...replyListData].filter(
        (item) => item.replyId !== (data as IReplyData).replyId
      );
      dispatch(replySlice.actions.setReplyListData(newReplyData));
    } else if (type === "noComment") {
      // 해당 댓글 삭제
      const newCommentListData = [...commentListData].filter(
        (item) => item.commentId !== (data as IReplyData).parentCommentId
      );
      dispatch(commentSlice.actions.setCommentListData(newCommentListData));

      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    } else if (type === "noPost") {
      // 댓글 모달창 닫기
      document.body.style.overflow = "auto";
      dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      // 답글 모달창 닫기
      dispatch(replySlice.actions.setIsOpenReplyModal(false));

      // 게시물 삭제
      const newData = [...postListData].filter(
        (item) => item.id !== (data as IReplyData).postId
      );
      dispatch(postSlice.actions.setPostListData(newData));
    }
  },[]);

  const onClickRemove = useCallback(() => {
    if (data) {
      sweetConfirm("정말 삭제하겠습니까?", "삭제", "취소", () => {
        if (!isReply) {
          dispatch(thunkFetchRemoveComment(data as ICommentData)).then(
            (result) => {
              if (result.payload) {
                if (
                  // 삭제할 댓글이 존재하지 않는다면 해당 댓글 삭제, 게시물의 댓글 카운터 감소 처리
                  (result.payload as IKnownError).message ===
                  "댓글이 존재하지 않습니다."
                ) {
                  commentError("noComment");
                } else if (
                  // 삭제할 댓글의 게시물이 유효하지 않다면 댓글 모달창을 닫고 해당 게시물 삭제 처리
                  (result.payload as IKnownError).message ===
                  "게시물이 존재하지 않습니다."
                ) {
                  commentError("noPost");
                }
              }
            }
          );
        } else {
          dispatch(
            thunkFetchRemoveReply({
              parentCommentId: (data as IReplyData).parentCommentId,
              replyId: (data as IReplyData).replyId,
              postId: data.postId
            })
          ).then((result) => {
            if (result.payload) {
              if (
                // 삭제할 답글이 존재하지 않는다면 해당 답글 삭제 댓글의 답글 가운터 감소 처리
                (result.payload as IKnownError).message ===
                "답글이 존재하지 않습니다."
              ) {
                replyError("noReply");
              } else if (
                // 삭제할 답글의 댓글이 존재하지 않는다면 답글 모달창울 닫고 해당 댓글 삭제 게시물의 댓글 수 감소 처리
                (result.payload as IKnownError).message ===
                "댓글이 존재하지 않습니다."
              ) {
                replyError("noComment");
              } else if (
                // 삭제할 답글의 게시물이 유효하지 않다면 댓글 모달창 및 답글 모달창을 닫고, 해당 게시물 삭제 처리
                (result.payload as IKnownError).message ===
                "게시물이 존재하지 않습니다."
              ) {
                replyError("noPost");
              }
            }
          });
        }
      });
    }
  },[data]);

  const onClickReport = useCallback(() => {
    // 댓글 신고
    if (!isReply && "commentId" in data) {
      // 중복 신고 방지
      if (userData.uid && data.reportUidList.includes(userData.uid)) {
        sweetToast("이미 신고한 댓글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
        dispatch(
          thunkFetchReportComment({
            commentId: data.commentId,
            reportCount: data.reportCount,
            postId
          })
        ).then((result) => {
          if (result.payload) {
            if ("postId" in result.payload) {
              if (userData.uid) {
                let newData = [...commentListData];
                const index = newData.findIndex(
                  (item) => item.commentId === (data as ICommentData).commentId
                );
                newData[index] = {
                  ...newData[index],
                  reportUidList: [
                    ...(newData[index].reportUidList || []),
                    userData.uid
                  ]
                };
                if (data.reportCount >= 4) {
                  newData = newData.filter(
                    (item) => item.commentId !== data.commentId
                  );
                }
                dispatch(commentSlice.actions.setCommentListData(newData));
              }
            } else if (
              // 신고할 댓글이 존재하지 않는다면 해당 댓글 삭제, 게시물의 댓글 카운터 감소 처리
              (result.payload as IKnownError).message ===
              "댓글이 존재하지 않습니다."
            ) {
              commentError("noComment");
            } else if (
              // 신고할 댓글의 게시물이 유효하지 않다면 댓글 모달창을 닫고 해당 게시물 삭제 처리
              (result.payload as IKnownError).message ===
              "게시물이 존재하지 않습니다."
            ) {
              commentError("noPost");
            }
          }
        });
      });
    } else if (isReply && "replyId" in data) {
      // 답글 신고
      // 중복 신고 방지
      if (userData.uid && data.reportUidList.includes(userData.uid)) {
        sweetToast("이미 신고한 답글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
        dispatch(
          thunkFetchReportReply({
            parentCommentId: data.parentCommentId,
            replyId: data.replyId,
            reportCount: data.reportCount,
            postId: data.postId
          })
        ).then((result) => {
          if (result.payload) {
            if (
              (
                result.payload as Pick<
                  IReplyData,
                  "reportCount" | "parentCommentId" | "replyId"
                >
              ).replyId
            ) {
              if (userData.uid) {
                let newData = [...replyListData];
                const index = newData.findIndex(
                  (item) => item.replyId === (data as IReplyData).replyId
                );
                newData[index] = {
                  ...newData[index],
                  reportUidList: [
                    ...(newData[index].reportUidList || []),
                    userData.uid
                  ]
                };
                if (data.reportCount >= 4) {
                  newData = newData.filter(
                    (item) => item.replyId !== data.replyId
                  );
                }
                dispatch(replySlice.actions.setReplyListData(newData));
              }
            } else if (
              // 신고할 답글이 존재하지 않는다면 해당 답글 삭제 처리 댓글의 답글 카운터 감소 처리
              (result.payload as IKnownError).message ===
              "답글이 존재하지 않습니다."
            ) {
              replyError("noReply");
            } else if (
              // 신고할 답글의 댓글이 존재하지 않는다면 답글 모달창울 닫고 해당 댓글 삭제, 게시물의 댓글 카운터 감소 처리
              (result.payload as IKnownError).message ===
              "댓글이 존재하지 않습니다."
            ) {
              replyError("noComment");
            } else if (
              (result.payload as IKnownError).message ===
              "게시물이 존재하지 않습니다."
            ) {
              replyError("noPost");
            }
          }
        });
      });
    }
  },[isReply]);

  // 유저 프로필 클릭 시 프로필 페이지 이동 전 모달 창 닫기
  const onClickProfileLink = () => {
    document.body.style.overflow = "auto";
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
      userData={userData}
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
    />
  );
}
