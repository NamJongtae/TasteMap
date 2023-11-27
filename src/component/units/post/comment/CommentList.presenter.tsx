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
  loadRepliesLoading: boolean;
  loadCommentsLoading: boolean;
  handlerRefresh: () => void;
  replies: IReplyData[];
  comments: ICommentData[];
  infiniteScrollRef: (node?: Element | null | undefined) => void;
  loadMoreDataLoading: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  CommentListRef: React.RefObject<HTMLUListElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  isError: boolean | undefined;
  postType: "HOME" | "FEED" | "PROFILE";
}
export default function CommentListUI({
  isReply,
  loadRepliesLoading,
  loadCommentsLoading,
  handlerRefresh,
  replies,
  comments,
  infiniteScrollRef,
  loadMoreDataLoading,
  closeBtnRef,
  textareaRef,
  CommentListRef,
  firstItemLinkRef,
  isError,
  postType,
}: IProps) {
  return (
    <>
      {isError ? null : (
        <>
          {(isReply && loadRepliesLoading) || (!isReply && loadCommentsLoading) ? (
            <ScrollLoading />
          ) : (
            <>
              {(
                isReply
                  ? replies.length > 0
                  : comments.filter((comment) => !comment.isBlock).length > 0
              ) ? (
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
                        postType={postType}
                      />
                    );
                  })}
                  {(!isReply ? comments.length > 0 : replies.length > 0) && (
                    <InfinityScrollTarget
                      ref={infiniteScrollRef}
                    ></InfinityScrollTarget>
                  )}
                  {loadMoreDataLoading && (
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
      )}
    </>
  );
}
