import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { useCommentInfiniteQuery } from "../../query/post/comment/useCommentInfiniteQuery";
import { useReplyInfiniteQuery } from "../../query/post/reply/useReplyInfiniteQuery";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { DocumentData, QuerySnapshot } from "firebase/firestore";
import { ICommentData, IPostData, IReplyData } from "../../../api/apiType";
import { commentSlice } from "../../../slice/commentSlice";
import { replySlice } from "../../../slice/replySlice";

interface IProps {
  isReply: boolean;
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

export const useCommentList = ({ isReply, postType }: IProps) => {
  const { uid } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  // 현재 댓글들의 게시물 아이디
  const postId = useSelector((state: RootState) => state.comment.postId);
  // 페이지 당 최대 댓글 수
  const pagePerData = useSelector((state: RootState) =>
    isReply ? state.reply.pagePerData : state.comment.pagePerData
  );
  // 답글의 부모 댓글 아이디
  const parentCommentId = useSelector(
    (state: RootState) => state.reply.parentCommentId
  );
  const [infiniteScrollRef, inview] = useInView();
  const commentListRef = useRef<HTMLUListElement>(null);
  const queryClient = useQueryClient();

  const infiniteQueriesType = isReply ? "REPLIES" : "COMMENTS";

  const infiniteQueries = {
    REPLIES: () =>
      useReplyInfiniteQuery(postId, parentCommentId, pagePerData, isReply),
    COMMENTS: () => useCommentInfiniteQuery(postId, pagePerData, isReply)
  };

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    isError,
    error,
    isRefetchError
  } = infiniteQueries[infiniteQueriesType]();

  // isReply props 통해 데이터를 다르게 처리
  useEffect(() => {
    // 댓글 모달인 경우

    if ((hasNextPage && inview && data?.length) || 0 >= pagePerData) {
      fetchNextPage();
    }
  }, [inview, isReply, hasNextPage]);
  const handlerRefresh = () => {
    refetch();
  };

  // 초기 tab focus를 줌
  useEffect(() => {
    if (commentListRef.current) {
      commentListRef.current.focus();
    }
  }, [commentListRef.current]);

  // comments 무한스크롤 에러 처리
  useEffect(() => {
    if (isError || isRefetchError) {
      if (error?.message === "게시물이 존재하지 않습니다.") {
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
      } else if (error?.message === "댓글이 존재하지 않습니다.") {
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
        console.error(error);
      }
    }
  }, [isError, error]);

  const loadDataLoading = isFetching && !isFetchingNextPage;

  const loadMoreDataLoading =
    isFetchingNextPage && (data?.length || 0) >= pagePerData;

  const isNoData = isReply
    ? (data as IReplyData[])?.filter((v) => !v.isBlock).length === 0
    : (data as ICommentData[])?.filter((v) => !v.isBlock).length === 0;

  return {
    isError,
    loadDataLoading,
    isNoData,
    handlerRefresh,
    data,
    infiniteScrollRef,
    loadMoreDataLoading,
    commentListRef
  };
};
