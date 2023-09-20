import React, { useEffect } from "react";
import PostItem from "./PostItem.container";
import { InfinityScrollTarget, PostWrapper, Wrapper } from "./postList.styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  thunkFetchFirstPagePostData,
  thunkFetchPagingPostData
} from "../../../slice/postSlice";
import Loading from "../../commons/loading/Loading";
import { useInView } from "react-intersection-observer";
import { thunkFetchUserProfile } from '../../../slice/profileSlice';
import Comment from './comment/Comment';

export default function PostList() {
  const isOpenCommentModal = useSelector((state: RootState) => state.comment.isOpenCommentModal);
  const userProfile = useSelector((state: RootState) => state.profile.profileData);
  // 게시물 데이터 목록을 가져옴
  const postListData = useSelector((state: RootState) => state.post.postListData);
  // 현재 페이지를 가져옴
  const page = useSelector((state: RootState) => state.post.page);
  // 다음 게시물 여부가 있는지를 판변하는 hasMore를 가져옴
  const hasMore = useSelector((state: RootState) => state.post.hasMore);
  // 페이장 최대 게시물 수
  const pagePerData = useSelector((state: RootState) => state.post.pagePerData);
  // react-intersection-observer의 customhook 무한 스크롤을 위해 사용
  const [ref, inview] = useInView();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.post.isLoading);

  // 무한스크롤 처리 inview의 상태가 변경될 때 마다 게시물 목록을 추가로 받아옴
  useEffect(() => {
    // 첫 게시물 가져오기, 데이터가 존재하지 않을 시
    if (postListData.length === 0) {
      dispatch(thunkFetchFirstPagePostData(pagePerData));
    } 
    // 이후 페이지에 따라 게시물 목록 추가로 가져오기
    if (postListData.length > 0 && hasMore && inview) {
      dispatch(thunkFetchPagingPostData({ page, pagePerData }));
    }
  }, [inview]);

  useEffect(()=>{
    dispatch(thunkFetchUserProfile());
  },[])


  return (
    <>
      <Wrapper>
        <PostWrapper>
          {postListData.length > 0 &&
            postListData.map((item) => {
              return !item.isBlock && <PostItem key={item.id} data={item} userProfile={userProfile}/>;
            })}
        </PostWrapper>
      </Wrapper>
      {postListData.length > 0&&<InfinityScrollTarget ref={ref}></InfinityScrollTarget>}
      {isLoading && <Loading />}
      {isOpenCommentModal&&<Comment />}
    </>
  );
}
