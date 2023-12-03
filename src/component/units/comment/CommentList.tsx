import React from "react";
import { useCommentList } from "../../../hook/logic/comment/useCommentList";
import { useSupportedWebp } from "../../../hook/useSupportedWebp";
import CommentItem from "./CommentItem";
import ScrollLoading from "../../commons/loading/ScrollLoading";
import NoData from "../../commons/noData/NoData";
import {
  CommentWrpper,
  InfinityScrollTarget,
  RefreshBtn
} from "./comment.styles";
import { ICommentData, IReplyData } from "../../../api/apiType";
interface IProps {
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function CommentList({
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType
}: IProps) {
  const { isWebpSupported } = useSupportedWebp();
  const {
    isError,
    loadDataLoading,
    isNoData,
    handlerRefresh,
    data,
    infiniteScrollRef,
    loadMoreDataLoading,
    commentListRef
  } = useCommentList({ isReply, postType });

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
