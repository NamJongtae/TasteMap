import React from "react";
import { IMyProfileData, IPostData } from "../../../../../types/apiTypes";
import PostLikeBtn from "./postLikeBtn/PostLikeBtn";
import PostCommentBtn from "./postCommentBtn/PostCommentBtn";
import PostDate from "./postDate/PostDate";
import { PostItemBottomWrapper } from "../../postList/post.styles";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function PostBottom({ data, myProfile, postType }: IProps) {
  return (
    <PostItemBottomWrapper>
      <PostLikeBtn data={data} myProfile={myProfile} postType={postType} />
      <PostCommentBtn commentCount={data.commentCount} postId={data.id} />
      <PostDate createdAt={data.createdAt} />
    </PostItemBottomWrapper>
  );
}
