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
  replies: IReplyData[];
  comments: ICommentData[];
  infiniteScrollRef: (node?: Element | null | undefined) => void;
  isScrollLoading: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  CommentListRef: React.RefObject<HTMLUListElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
}
export default function CommentListUI({
  isReply,
  replyLoading,
  commentLoading,
  handlerRefresh,
  replies,
  comments,
  infiniteScrollRef,
  isScrollLoading,
  closeBtnRef,
  textareaRef,
  CommentListRef,
  firstItemLinkRef,
}: IProps) {
  return (
    <>
      {(isReply && replyLoading) || (!isReply && commentLoading) ? (
        <ScrollLoading />
      ) : (
        <>
          {(isReply ? replies.length > 0 : comments.length > 0) ? (
            <CommentWrpper ref={CommentListRef} tabIndex={-1}>
              {(isReply ? replies : comments).map((item, idx) => {
                return (
                  <CommentItem
                    key={
                      isReply
                        ? (item as IReplyData).replyId
                        : (item as ICommentData).commentId
                    }
                    data={item}
                    idx={idx}
                    isReply={isReply}
                    closeBtnRef={closeBtnRef}
                    textareaRef={textareaRef}
                    firstItemLinkRef={firstItemLinkRef}
                  />
                );
              })}
              {(!isReply
                ? comments.length > 0
                : replies.length > 0) && (
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
          <RefreshBtn onClick={handlerRefresh} />
        </>
      )}
    </>
  );
}
