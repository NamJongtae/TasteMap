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
import { commentSlice, thunkFetchRemoveComment } from "../../../../slice/commentSlice";
import { sweetConfirm } from "../../../../library/sweetAlert/sweetAlert";
import { postSlice } from "../../../../slice/postSlice";
import CommentTextArea from "./CommentTextArea";
import {
  replySlice,
  thunkFetchRemoveReply
} from "../../../../slice/replySlice";

interface IProps {
  data: ICommentData | IReplyData;
  isReply: boolean;
}
export default function CommentItem({ data, isReply }: IProps) {
  const isOpenReplyModal = useSelector(
    (state: RootState) => state.reply.isOpenReplyModal
  );
  const userData = useSelector((state: RootState) => state.user.data);
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
  );
  const commentListData = useSelector((state: RootState) => state.comment.commentListData);
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
          const index = newData.findIndex(
            (item) => item.id === data.postId
          );
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
          dispatch(commentSlice.actions.setCommentListData(newData))
        }
      });
    }
  };

  const formattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  return (
    <CommentLi>
      <UserInfo userData={userData} data={data} activeMoreBtn={false} />
      {isEdit ? (
        <CommentTextArea
          initalvalue={data.content}
          isReply={isReply}
          type={"edit"}
          commentId={isReply ? (data as IReplyData).parentCommentId: (data as ICommentData).commentId}
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
            {data.createdAt && (
              <CommentDate>{formattedDate}</CommentDate>
            )}
            {!isReply && <CommentBtn onClick={onClickReply}>답글</CommentBtn>}
            {userData.uid === data.uid ? (
              <>
                <CommentBtn onClick={onClickEdit}>수정</CommentBtn>
                <CommentBtn onClick={onClickRemove}>삭제</CommentBtn>
              </>
            ) : (
              <CommentBtn>신고</CommentBtn>
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
  );
}
