import React from "react";
import CommentItem from "./commentItem/CommentItem";
import ScrollLoading from "../../../../commons/loading/ScrollLoading";
import NoData from "../../../../commons/noData/NoData";
import { ICommentData, IReplyData } from "../../../../../api/apiType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { useCommentsInfiniteScroll } from "../../../../../hook/logic/comment/commentList/useCommentsInfiniteScroll";
import { CommentWrpper, InfinityScrollTarget, RefreshBtn } from '../commentModal.styles';

interface IProps {
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
  openReplyModalHandler: (data: ICommentData) => void;
  closeNoHistoryBackModalHandler: () => void;
}

export default function CommentList({
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType,
  openReplyModalHandler,
  closeNoHistoryBackModalHandler
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const {
    isError,
    loadDataLoading,
    isNoData,
    handlerRefresh,
    data,
    infiniteScrollRef,
    loadMoreDataLoading,
    commentListRef
  } = useCommentsInfiniteScroll({ isReply, postType });

  if (isError) {
    return null;
  }

  if (loadDataLoading) {
    return <ScrollLoading />;
  }

  if (isNoData) {
    return (
      <>
        <NoData />{" "}
        <RefreshBtn
          onClick={handlerRefresh}
          $isWebpSupported={isWebpSupported}
        />
      </>
    );
  }

  return (
    <>
      <CommentWrpper ref={commentListRef} tabIndex={-1}>
        {data?.map((item, idx) => {
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
              openReplyModalHandler={openReplyModalHandler}
              closeNoHistoryBackModalHandler={closeNoHistoryBackModalHandler}
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
      <RefreshBtn onClick={handlerRefresh} $isWebpSupported={isWebpSupported} />
    </>
  );
}
