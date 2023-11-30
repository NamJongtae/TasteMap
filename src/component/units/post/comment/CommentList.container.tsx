import React, { useEffect, useRef } from "react";
import { commentSlice } from "../../../../slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import { useInView } from "react-intersection-observer";
import { replySlice } from "../../../../slice/replySlice";
import CommentListUI from "./CommentList.presenter";
import { useCommentInfiniteQuery } from "../../../../hook/query/post/comment/useCommentInfiniteQuery";
import { sweetToast } from "../../../../library/sweetAlert/sweetAlert";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ICommentData, IPostData } from "../../../../api/apiType";
import { useReplyInfiniteQuery } from "../../../../hook/query/post/reply/useReplyInfiniteQuery";
import { useParams } from "react-router-dom";
import { useSupportedWebp } from '../../../../hook/useSupportedWebp';

interface IProps {
  isReply: boolean;
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  firstItemLinkRef: React.RefObject<HTMLAnchorElement>;
  postType: "HOME" | "FEED" | "PROFILE";
}

type InfinitePostsType = {
  commentDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: IPostData[];
};

type InfiniteCommentsType = {
  replyDocs: QuerySnapshot<DocumentData, DocumentData>;
  data: ICommentData[];
};

export default function CommentList({
  isReply,
  closeBtnRef,
  textareaRef,
  firstItemLinkRef,
  postType
}: IProps) {
  const { uid } = useParams();
  const { isWebpSupported } = useSupportedWebp();
  const dispatch = useDispatch<AppDispatch>();
  // 현재 댓글들의 게시물 아이디
  const postId = useSelector((state: RootState) => state.comment.postId);
  // 페이지 당 최대 댓글 수
  const commentPagePerData = useSelector(
    (state: RootState) => state.comment.pagePerData
  );

  // 답글의 부모 댓글 아이디
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  // 페이지 당 최대 답글 수
  const repliesPagePerData = useSelector(
    (state: RootState) => state.reply.pagePerData
  );
  const [ref, inview] = useInView();
  const CommentListRef = useRef<HTMLUListElement>(null);
  const queryClient = useQueryClient();

  const {
    data: comments,
    hasNextPage: commentsHasNextPage,
    fetchNextPage: commentFetchNextPage,
    isFetching: commentsIsFetching,
    isFetchingNextPage: commentsIsFetchingNextPage,
    refetch: commentsRefetch,
    isError: commentsIsError,
    error: commentsError,
    isRefetchError: commentsIsRefetchError
  } = useCommentInfiniteQuery(postId, commentPagePerData, isReply);

  const {
    data: replies,
    hasNextPage: repliesHasNextPage,
    fetchNextPage: repliesFetchNextPage,
    isFetchingNextPage: repliesIsFetchingNextPage,
    refetch: repliesRefetch,
    isFetching: repliesIsFetching,
    isError: repliesIsError,
    error: repliesError,
    isRefetchError: repliesIsRefetchError
  } = useReplyInfiniteQuery(
    postId,
    parentCommentId,
    repliesPagePerData,
    isReply
  );

  // isReply props 통해 데이터를 다르게 처리
  useEffect(() => {
    // 댓글 모달인 경우
    if (!isReply) {
      if (
        (commentsHasNextPage && inview && comments?.length) ||
        0 >= commentPagePerData
      ) {
        commentFetchNextPage();
      }
    } else {
      // 답글 모달인 경우
      if (
        (repliesHasNextPage && inview && replies?.length) ||
        0 >= repliesPagePerData
      ) {
        repliesFetchNextPage();
      }
    }
  }, [inview, isReply, commentsHasNextPage, repliesHasNextPage]);

  const handlerRefresh = () => {
    if (!isReply) {
      commentsRefetch();
    } else {
      repliesRefetch();
    }
  };

  // 초기 tab focus를 줌
  useEffect(() => {
    if (CommentListRef.current) {
      CommentListRef.current.focus();
    }
  }, [CommentListRef.current]);

  // comments 무한스크롤 에러 처리
  useEffect(() => {
    if (commentsIsError || commentsIsRefetchError) {
      if (commentsError?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning", 2000);
        // 게시물 삭제
        queryClient.setQueryData(
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType],
          (postsData: InfiniteData<InfinitePostsType, unknown>) => ({
            ...postsData,
            pages: postsData.pages.map((page: InfinitePostsType) => ({
              ...page,
              data: page.data.filter((post: IPostData) => post.id !== postId)
            }))
          })
        );
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(commentsError);
      }
    }
  }, [commentsIsError, commentsIsRefetchError]);

  // replies 무한스크롤 에러 처리
  useEffect(() => {
    if (repliesIsError || repliesIsRefetchError) {
      if (repliesError?.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다!", "warning", 2000);
        // 게시물 삭제
        queryClient.setQueryData(
          postType === "PROFILE"
            ? ["posts", postType, uid]
            : ["posts", postType],
          (postsData: InfiniteData<InfinitePostsType, unknown>) => ({
            ...postsData,
            pages: postsData.pages.map((page: InfinitePostsType) => ({
              ...page,
              data: page.data.filter((post: IPostData) => post.id !== postId)
            }))
          })
        );
        dispatch(commentSlice.actions.setIsOpenCommentModal(false));
      } else if (repliesError?.message === "댓글이 존재하지 않습니다.") {
        sweetToast("삭제된 댓글입니다!", "warning", 2000);
        // 댓글 삭제
        queryClient.setQueryData(
          ["post", postId, "comments"],
          (commentsData: InfiniteData<InfiniteCommentsType, unknown>) => ({
            ...commentsData,
            pages: commentsData.pages.map((page: InfiniteCommentsType) => ({
              ...page,
              data: page.data.filter(
                (comment: ICommentData) => comment.commentId !== parentCommentId
              )
            }))
          })
        );
        dispatch(replySlice.actions.setIsOpenReplyModal(false));
        // 부모 댓글이 존재하지 않는경우 모든 답글 삭제 : 답글 쿼리 제거
        queryClient.removeQueries({
          queryKey: ["post", postId, "comment", parentCommentId, "replies"]
        });
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(repliesError);
      }
    }
  }, [repliesIsError, repliesIsRefetchError]);

  const isError = isReply
    ? commentsIsError || commentsIsRefetchError
    : repliesIsError || repliesIsRefetchError;

  const loadDataLoading = isReply
    ? repliesIsFetching && !repliesIsFetchingNextPage
    : commentsIsFetching && !commentsIsFetchingNextPage;

  const loadMoreDataLoading = isReply
    ? repliesIsFetchingNextPage && (replies?.length || 0) >= repliesPagePerData
    : commentsIsFetchingNextPage &&
      (comments?.length || 0) >= commentPagePerData;

  const isNoData = isReply
    ? (replies?.filter((reply) => !reply.isBlock).length || 0) === 0
    : (comments?.filter((comment) => !comment.isBlock).length || 0) === 0;

  return (
    <CommentListUI
      isReply={isReply}
      isError={isError}
      loadDataLoading={loadDataLoading}
      isNoData={isNoData}
      handlerRefresh={handlerRefresh}
      replies={replies || []}
      comments={comments || []}
      infiniteScrollRef={ref}
      loadMoreDataLoading={loadMoreDataLoading}
      closeBtnRef={closeBtnRef}
      textareaRef={textareaRef}
      CommentListRef={CommentListRef}
      firstItemLinkRef={firstItemLinkRef}
      postType={postType}
      isWebpSupported={isWebpSupported}
    />
  );
}
