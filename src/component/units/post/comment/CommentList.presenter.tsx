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
  loadDataLoading: boolean;
  isNoData: boolean;
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
  loadDataLoading,
  isNoData,
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
  postType
}: IProps) {
  if (isError) {
    return null;
  }

  if (loadDataLoading) {
    return <ScrollLoading />;
  }

  if (isNoData) {
    return (
      <>
        <NoData /> <RefreshBtn onClick={handlerRefresh} />
      </>
    );
  }

  return (
    <>
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
        <InfinityScrollTarget ref={infiniteScrollRef}></InfinityScrollTarget>
        {loadMoreDataLoading && (
          <li>
            <ScrollLoading />
          </li>
        )}
      </CommentWrpper>
      <RefreshBtn onClick={handlerRefresh} />
    </>
  );
}
