import React from "react";
import { ICommentData, IReplyData } from "../../../../../../../api/apiType";
import { setDateFormat } from "../../../../../../../library/setDateFormat";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../store/store";

import {
  CommentBottomWrapper,
  CommentBtn,
  CommentDate
} from "./commentBottom.styles";
import CommentRemoveBtn from './CommentRemoveBtn'
import CommentReportBtn from './CommentReportBtn';

interface IProps {
  postType: "HOME" | "FEED" | "PROFILE";
  isEdit: boolean;
  isReply: boolean;
  data: ICommentData | IReplyData;
  openEditTextareaHandler: () => void;
  closeEditTextareaHandler: () => void;
  openReplyModalHandler: (data: ICommentData) => void;
}

export default function CommentBottom({
  postType,
  isEdit,
  isReply,
  data,
  openEditTextareaHandler,
  closeEditTextareaHandler,
  openReplyModalHandler
}: IProps) {
  const myInfo = useSelector((state: RootState) => state.user.myInfo);

  return (
    <CommentBottomWrapper>
      {isEdit ? (
        <CommentBtn onClick={closeEditTextareaHandler}>취소</CommentBtn>
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
              <CommentBtn onClick={openEditTextareaHandler}>수정</CommentBtn>
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
