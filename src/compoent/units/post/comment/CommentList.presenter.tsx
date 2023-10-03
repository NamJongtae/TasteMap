import React from "react";
import {
  CommentWrpper,
  InfinityScrollTarget,
  RefreshBtn
} from "./comment.styles";
import CommentItem from "./CommentItem.container";
import ScrollLoading from "../../../commons/loading/ScrollLoading";
import NoData from "../../../commons/noData/NoData";
import { ICommentData, IReplyData } from "../../../../api/apiType";
interface IProps {
  isReply: boolean;
  replyLoading: boolean;
  commentLoading: boolean;
  handlerRefresh: () => void;
  replyListData: IReplyData[];
  commentDataList: ICommentData[];
  infiniteScrollRef: (node?: Element | null | undefined) => void;
  isScrollLoading: boolean;
}
export default function CommentListUI({
  isReply,
  replyLoading,
  commentLoading,
  handlerRefresh,
  replyListData,
  commentDataList,
  infiniteScrollRef,
  isScrollLoading
}: IProps) {
  return (
    <>
      {(isReply && replyLoading) || (!isReply && commentLoading) ? (
        <ScrollLoading />
      ) : (
        <>
          <RefreshBtn onClick={handlerRefresh} />
          {(isReply ? replyListData.length > 0 : commentDataList.length > 0) ? (
            <CommentWrpper>
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
              {(!isReply
                ? commentDataList.length > 0
                : replyListData.length > 0) && (
                <InfinityScrollTarget
                  ref={infiniteScrollRef}
                ></InfinityScrollTarget>
              )}
              {isScrollLoading && (
                <li>
                  <ScrollLoading />
                </li>
              )}
            </CommentWrpper>
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  );
}
