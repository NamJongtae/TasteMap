import React, { useMemo, useState } from "react";
import {
  CommentBottom,
  CommentBtn,
  CommentDate,
  CommentLi,
  CommentText,
  ReplyCountBtn
} from "./comment.styles";
import UserInfo from "../UserInfo.container";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { ICommentData, IReplyData } from "../../../../api/apiType";
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
import CommentTextArea from "./CommentTextArea";
import {
  replySlice,
  thunkFetchRemoveReply,
  thunkFetchReportReply
} from "../../../../slice/replySlice";
import { profileSlice } from "../../../../slice/profileSlice";

interface IProps {
  data: ICommentData | IReplyData;
  isReply: boolean;
}
export default function CommentItem({ data, isReply }: IProps) {
  const postId = useSelector((state: RootState) => state.comment.postId);
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const profileData = useSelector(
    (state: RootState) => state.profile.profileData
  );
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
  );
  const commentListData = useSelector(
    (state: RootState) => state.comment.commentListData
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const onClickReply = () => {
    if (!isOpenReplyModal) {
      dispatch(replySlice.actions.setIsOpenReplyModal(true));
      if ("commentId" in data)
        dispatch(replySlice.actions.setParentCommentId(data.commentId));
    } else {
      dispatch(replySlice.actions.setIsOpenReplyModal(false));
    }
  };

  const onClickRemove = () => {
    if (data) {
      sweetConfirm("정말 삭제하겠습니까?", "삭제", "취소", () => {
        if (!isReply) {
          dispatch(thunkFetchRemoveComment(data as ICommentData));
          const newData = [...postListData];
          const index = newData.findIndex((item) => item.id === data.postId);
          newData[index] = {
            ...newData[index],
            commentCount: (newData[index].commentCount || 0) - 1
          };
          dispatch(postSlice.actions.setPostListData(newData));
        } else {
          dispatch(
            thunkFetchRemoveReply({
              parentCommentId: (data as IReplyData).parentCommentId,
              replyId: (data as IReplyData).replyId
            })
          );
          const newData = [...commentListData];
          const index = newData.findIndex(
            (item) => item.commentId === (data as IReplyData).parentCommentId
          );
          newData[index] = {
            ...newData[index],
            replyCount: (newData[index].replyCount || 0) - 1
          };
          dispatch(commentSlice.actions.setCommentListData(newData));
        }
      });
    }
  };

  const onClickReport = () => {
    // 댓글 신고
    if (!isReply && "commentId" in data) {
      // 중복 신고 방지
      if (profileData.reportCommentList?.includes(data.commentId)) {
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
        );
        // 댓글 신고후 profileData에 reportCommentList 신고한 댓글 id 값 추가
        const newData = {
          ...profileData,
          reportCommentList: [
            ...(profileData?.reportCommentList || []),
            data.commentId
          ]
        };
        dispatch(profileSlice.actions.setprofile(newData));
        // 댓글 신고후 블라인드 처리된 경우 게시물의 댓글 카운터 1 감소시킴
        if (data.reportCount >= 4) {
          const newData = [...postListData];
          const index = newData.findIndex((item) => item.id === postId);
          newData[index] = {
            ...newData[index],
            commentCount: (newData[index].commentCount || 0) - 1
          };
          dispatch(postSlice.actions.setPostListData(newData));
        }
      });
    } else if (isReply && "replyId" in data) {
      // 답글 신고
      // 중복 신고 방지
      if (profileData.reportReplyList?.includes(data.replyId)) {
        sweetToast("이미 신고한 답글 입니다.", "warning");
        return;
      }
      sweetConfirm("신고 하시겠습니까?", "신고", "취소", () => {
        dispatch(
          thunkFetchReportReply({
            parentCommentId: data.parentCommentId,
            replyId: data.replyId,
            reportCount: data.reportCount
          })
        );
        // 답글 신고후 블라인드 처리된 경우 댓글의 답글 카운터 1 감소시킴
        if (data.reportCount >= 4) {
          const newData = [...commentListData];
          const index = newData.findIndex(
            (item) => item.commentId === data.parentCommentId
          );
          newData[index] = {
            ...newData[index],
            replyCount: (newData[index].replyCount || 0) - 1
          };
          dispatch(commentSlice.actions.setCommentListData(newData));
        }
        // 답글 신고후 profileData에 reportCommentList 신고한 댓글 id 값 추가
        const newData = {
          ...profileData,
          reportReplyList: [
            ...(profileData?.reportReplyList || []),
            data.replyId
          ]
        };
        dispatch(profileSlice.actions.setprofile(newData));
      });
    }
  };

  const formattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  return (
    <>
      {!data.isBlock && (
        <CommentLi>
          <UserInfo
            userData={{ ...userData }}
            data={{ ...data }}
            activeMoreBtn={false}
          />
          {isEdit ? (
            <CommentTextArea
              initalvalue={data.content}
              isReply={isReply}
              textAreaType={"edit"}
              commentId={
                isReply
                  ? (data as IReplyData).parentCommentId
                  : (data as ICommentData).commentId
              }
              replyId={(data as IReplyData).replyId}
              closeTextArea={onClickEdit}
            />
          ) : (
            <CommentText>{data.content}</CommentText>
          )}
          <CommentBottom>
            {isEdit ? (
              <CommentBtn
                onClick={isEdit ? onClickEdit : onClickReply}
                style={{ marginLeft: isOpenReplyModal ? "50px" : "5px" }}
              >
                취소
              </CommentBtn>
            ) : (
              <>
                {data.createdAt && <CommentDate dateTime={new Date(data.createdAt?.seconds * 1000).toISOString()}>{formattedDate}</CommentDate>}
                {!isReply && (
                  <CommentBtn onClick={onClickReply}>답글</CommentBtn>
                )}
                {userData.uid === data.uid ? (
                  <>
                    <CommentBtn onClick={onClickEdit}>수정</CommentBtn>
                    <CommentBtn onClick={onClickRemove}>삭제</CommentBtn>
                  </>
                ) : (
                  <CommentBtn onClick={onClickReport}>신고</CommentBtn>
                )}
              </>
            )}
          </CommentBottom>
          {!isReply && (data as ICommentData).replyCount !== 0 && (
            <ReplyCountBtn onClick={onClickReply}>
              답글 {(data as ICommentData).replyCount}개
            </ReplyCountBtn>
          )}
        </CommentLi>
      )}
    </>
  );
}
