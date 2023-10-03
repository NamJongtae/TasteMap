import React, { useEffect, useState } from "react";
import {
  commentSlice,
  thunkFetchFirstPageCommentData,
  thunkFetchPagingCommentData
} from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { IKnownError } from "../../../../api/apiType";
import { useInView } from "react-intersection-observer";
import {
  replySlice,
  thunkFetchFirstPageReplyData,
  thunkFetchPagingReplyData
} from "../../../../slice/replySlice";

import { postSlice } from "../../../../slice/postSlice";
import CommentListUI from "./CommentList.presenter";

interface IProps {
  isReply: boolean;
}
export default function CommentList({ isReply }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const postListData = useSelector(
    (state: RootState) => state.post.postListData
  );
  // 댓글 데이터 목록
  const commentDataList = useSelector(
    (state: RootState) => state.comment.commentListData
  );
  // 댓글 모달창 로딩 여부
  const commentLoading = useSelector(
    (state: RootState) => state.comment.isLoading
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
  const replyLoading = useSelector((state: RootState) => state.reply.isLoading);
  // 답글의 부모 댓글 아이디
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  // 답글 데이터 목록
  const replyListData = useSelector(
    (state: RootState) => state.reply.replyListData
  );
  // 답글 현재 페이지
  const replyPage = useSelector((state: RootState) => state.reply.page);
  // 다음 답글 존재 여부
  const replyHasMore = useSelector((state: RootState) => state.reply.hasMore);
  // 페이지 당 최대 답글 수
  const replyPagePerData = useSelector(
    (state: RootState) => state.reply.pagePerData
  );
  // 무한 스크롤 댓글/답글 추가 시 로딩
  const [isScrollLoading, setIsScrollLoading] = useState(false);
  // react-intersection-observer 라이브러리
  const [ref, inview] = useInView();

  useEffect(() => {
    // 모달창이 사라질 때 commenDataList 및 ReplyDataList 초기화
    return () => {
      if (!isReply) {
        dispatch(commentSlice.actions.setCommentListData([]));
      } else {
        dispatch(replySlice.actions.setReplyListData([]));
      }
    };
  }, []);

  // 무한스크롤 처리 inview의 상태가 변경될 때 마다 댓글 목록/답글 목록을 추가로 받아옴
  // isReply props 통해 데이터를 다르게 처리
  useEffect(() => {
    // 댓글 모달인 경우
    if (!isReply) {
      // 첫 페이지 댓글 목록 가져오기
      if (commentDataList.length === 0) {
        dispatch(
          thunkFetchFirstPageCommentData({
            postId,
            pagePerData: commentPagePerData
          })
        ).then((result) => {
          if (
            (result.payload as IKnownError).message ===
            "게시물이 존재하지 않습니다."
          ) {
            dispatch(commentSlice.actions.setIsOpenCommentModal(false));
            const newData = [...postListData].filter(
              (item) => item.id !== postId
            );
            dispatch(postSlice.actions.setPostListData(newData));
          }
        });
      }
      // 이후 페이지에 따라 댓글 목록 추가로 가져오기
      if (
        commentDataList.length > 0 &&
        commentHasMore &&
        inview &&
        commentPage
      ) {
        setIsScrollLoading(true);
        (async () => {
          await dispatch(
            thunkFetchPagingCommentData({
              page: commentPage,
              postId,
              pagePerData: commentPagePerData
            })
          );
          setIsScrollLoading(false);
        })();
      }
    } else {
      // 답글 모달인 경우
      // 첫 페이지 답글 목록 가져오기
      if (replyListData.length === 0) {
        dispatch(
          thunkFetchFirstPageReplyData({
            parentCommentId,
            pagePerData: replyPagePerData
          })
        ).then((result) => {
          if (
            (result.payload as IKnownError).message ===
            "댓글이 존재하지 않습니다."
          ) {
            dispatch(replySlice.actions.setIsOpenReplyModal(false));
            const newData = [...commentDataList].filter(
              (item) => item.commentId !== parentCommentId
            );
            dispatch(commentSlice.actions.setCommentListData(newData));
          }
        });
      } // 이후 페이지에 따라 답글 목록 추가로 가져오기
      if (replyListData.length > 0 && replyHasMore && inview && replyPage) {
        dispatch(
          thunkFetchPagingReplyData({
            page: replyPage,
            parentCommentId,
            pagePerData: replyPagePerData
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
          pagePerData: replyPagePerData
        })
      );
    }
  };

  return (
    <CommentListUI
      isReply={isReply}
      replyLoading={replyLoading}
      commentLoading={commentLoading}
      handlerRefresh={handlerRefresh}
      replyListData={replyListData}
      commentDataList={commentDataList}
      infiniteScrollRef={ref}
      isScrollLoading={isScrollLoading}
    />
  );
}
