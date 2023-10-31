import React, { useEffect, useRef } from "react";
import {
  commentSlice,
  thunkFetchFirstPageCommentData,
  thunkFetchPagingCommentData
} from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useInView } from "react-intersection-observer";
import {
  replySlice,
  thunkFetchFirstPageReplyData,
  thunkFetchPagingReplyData
} from "../../../../slice/replySlice";
import CommentListUI from "./CommentList.presenter";

interface IProps {
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
}
export default function CommentList({
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef
}: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  // 댓글 데이터 목록
  const comments = useSelector(
    (state: RootState) => state.comment.comments
  );
  // 댓글 모달창 로딩 여부
  const commentLoading = useSelector(
    (state: RootState) => state.comment.loadCommentsLoading
  );
  // 현재 댓글들의 게시물 아이디
  const postId = useSelector((state: RootState) => state.comment.postId);
  // 댓글 현재 페이지
  const commentPage = useSelector((state: RootState) => state.comment.page);
  // 다음 댓글 존재 여부
  const commentHasMore = useSelector(
    (state: RootState) => state.comment.hasMore
  );
  // 페이지 당 최대 댓글 수
  const commentPagePerData = useSelector(
    (state: RootState) => state.comment.pagePerData
  );

  // 답글 모달창 로딩 여부
  const replyLoading = useSelector(
    (state: RootState) => state.reply.loadReplyLoading
  );
  // 답글의 부모 댓글 아이디
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  // 답글 데이터 목록
  const replies = useSelector((state: RootState) => state.reply.replies);
  // 답글 현재 페이지
  const repliesPage = useSelector((state: RootState) => state.reply.page);
  // 다음 답글 존재 여부
  const repliesHasMore = useSelector((state: RootState) => state.reply.hasMore);
  // 페이지 당 최대 답글 수
  const repliesPagePerData = useSelector(
    (state: RootState) => state.reply.pagePerData
  );
  // 무한 스크롤 댓글/답글 추가 시 로딩
  const loadMoreCommentsLoading = useSelector(
    (state: RootState) => state.comment.loadMoreCommentsLoading
  );
  // react-intersection-observer 라이브러리
  const [ref, inview] = useInView();
  const CommentListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // 모달창이 사라질 때 commenDataList 및 ReplyDataList 초기화
    return () => {
      if (!isReply) {
        dispatch(commentSlice.actions.setCommentListData([]));
      } else {
        dispatch(replySlice.actions.setReplies([]));
      }
    };
  }, []);

  // 무한스크롤 처리 inview의 상태가 변경될 때 마다 댓글 목록/답글 목록을 추가로 받아옴
  // isReply props 통해 데이터를 다르게 처리
  useEffect(() => {
    // 댓글 모달인 경우
    if (!isReply) {
      // 첫 페이지 댓글 목록 가져오기
      if (comments.length === 0) {
        dispatch(
          thunkFetchFirstPageCommentData({
            postId,
            pagePerData: commentPagePerData
          })
        );
      }
      // 이후 페이지에 따라 댓글 목록 추가로 가져오기
      if (
        comments.length > 0 &&
        commentHasMore &&
        inview &&
        commentPage
      ) {
        dispatch(
          thunkFetchPagingCommentData({
            page: commentPage,
            postId,
            pagePerData: commentPagePerData
          })
        );
      }
    } else {
      // 답글 모달인 경우
      // 첫 페이지 답글 목록 가져오기
      if (replies.length === 0) {
        dispatch(
          thunkFetchFirstPageReplyData({
            parentCommentId,
            pagePerData: repliesPagePerData
          })
        );
      } // 이후 페이지에 따라 답글 목록 추가로 가져오기
      if (replies.length > 0 && repliesHasMore && inview && repliesPage) {
        dispatch(
          thunkFetchPagingReplyData({
            page: repliesPage,
            parentCommentId,
            pagePerData: repliesPagePerData
          })
        );
      }
    }
  }, [inview]);

  const handlerRefresh = () => {
    if (!isReply) {
      dispatch(
        thunkFetchFirstPageCommentData({
          postId,
          pagePerData: commentPagePerData
        })
      );
    } else {
      dispatch(
        thunkFetchFirstPageReplyData({
          parentCommentId,
          pagePerData: repliesPagePerData
        })
      );
    }
  };

  useEffect(() => {
    if (CommentListRef.current) {
      CommentListRef.current.focus();
    }
  }, [CommentListRef.current]);

  return (
    <CommentListUI
      isReply={isReply}
      replyLoading={replyLoading}
      commentLoading={commentLoading}
      handlerRefresh={handlerRefresh}
      replies={replies}
      comments={comments}
      infiniteScrollRef={ref}
      isScrollLoading={loadMoreCommentsLoading}
      closeBtnRef={closeBtnRef}
      textareaRef={textareaRef}
      CommentListRef={CommentListRef}
      firstItemLinkRef={firstItemLinkRef}
    />
  );
}
