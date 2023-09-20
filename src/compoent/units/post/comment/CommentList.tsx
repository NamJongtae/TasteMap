import React, { useEffect } from "react";
import { CommenWrpper } from "./comment.styles";
import { thunkFetchCommentList } from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import CommentItem from "./CommentItem";
import { ICommentData, IReplyData } from "../../../../api/apiType";
import { thunkFetchReplyListData } from "../../../../slice/replySlice";
// import Loading from "../../../commons/loading/Loading";

interface IProps {
  isReply: boolean;
}
export default function CommentList({ isReply }: IProps) {
  const commentLoading = useSelector(
    (state: RootState) => state.comment.isLoading
  );
  const replyLoading = useSelector((state: RootState) => state.reply.isLoading);
  const postId = useSelector((state: RootState) => state.comment.postId);
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  const dispatch = useDispatch<AppDispatch>();
  const commentDataList = useSelector(
    (state: RootState) => state.comment.commentListData
  );
  const replyListData = useSelector(
    (state: RootState) => state.reply.replyListData
  );
  useEffect(() => {
    if (!isReply) {
      dispatch(thunkFetchCommentList(postId));
    } else {
      dispatch(thunkFetchReplyListData(parentCommentId));
    }
  }, []);

  return (
    <>
      {(isReply && replyLoading) || (!isReply && commentLoading) ? (
        <></>
      ) : (
        <CommenWrpper>
          {(isReply ? replyListData : commentDataList).map((item) => {
            return (
              <CommentItem
                key={
                  isReply
                    ? (item as IReplyData).replyId
                    : (item as ICommentData).commentId
                }
                data={item}
                isReply={isReply}
              />
            );
          })}
        </CommenWrpper>
      )}
    </>
  );
}
