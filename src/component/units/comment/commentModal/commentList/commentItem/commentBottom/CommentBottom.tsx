import React from "react";
import { ICommentData, IReplyData } from "../../../../../../../api/apiType";
import { setDateFormat } from "../../../../../../../library/setDateFormat";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../store/store";
import CommentRemoveBtn from './CommentRemoveBtn'
import CommentReportBtn from './CommentReportBtn';
import { CommentBottomWrapper, CommentBtn, CommentDate } from '../../../commentModal.styles';

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  isEdit: boolean;
  isReply: boolean;
  data: ICommentData | IReplyData;
  openUpdateTextareaHandler: () => void;
  closeUpdateTextareaHandler: () => void;
  openReplyModalHandler: (data: ICommentData) => void;
}

export default function CommentBottom({
  postType,
  isEdit,
  isReply,
  data,
  openUpdateTextareaHandler,
  closeUpdateTextareaHandler,
  openReplyModalHandler
}: IProps) {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  return (
    <CommentBottomWrapper>
      {isEdit ? (
        <CommentBtn onClick={closeUpdateTextareaHandler}>취소</CommentBtn>
      ) : (
        <>
          <CommentDate
            dateTime={new Date(data.createdAt?.seconds * 1000).toISOString()}
          >
            {setDateFormat(data.createdAt?.seconds * 1000)}
          </CommentDate>

          {!isReply && (
            <CommentBtn
              onClick={() => openReplyModalHandler(data as ICommentData)}
            >
              답글
            </CommentBtn>
          )}
          {myInfo.uid === data.uid ? (
            <>
              <CommentBtn onClick={openUpdateTextareaHandler}>수정</CommentBtn>
              <CommentRemoveBtn
                postType={postType}
                data={data}
                isReply={isReply}
              />
            </>
          ) : (
            <CommentReportBtn
              postType={postType}
              data={data}
              isReply={isReply}
            />
          )}
        </>
      )}
    </CommentBottomWrapper>
  );
}
