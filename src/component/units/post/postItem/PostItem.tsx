import React from "react";
import { IPostData, IMyProfileData } from "../../../../types/apiTypes";
import UserInfoSection from "./userInfoSection/UserInfoSection";
import ContentSection from "./contentSection/ContentSection";
import { usePostContentType } from "../../../../hook/logic/post/postItem/usePostContentType";
import RatingSection from "./ratingSection/RatingSection";
import ContentTypeBtns from "./contentTypeBtns/ContentTypeBtns";
import PostBottom from "./postBottom/PostBottom";
import { PostItemWrapper } from "../postList/post.styles";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export default function PostItem({ data, myProfile, postType }: IProps) {
  const { contentType, changeMapTypeHandler, changeImgTypeHandler } =
    usePostContentType();

  return (
    <>
      {myProfile.uid && (
        <PostItemWrapper>
          <h2 className='a11y-hidden'>홈</h2>
          <UserInfoSection
            myProfile={myProfile}
            data={data}
            postType={postType}
          />
          <ContentSection
            contentType={contentType}
            data={data}
            myProfile={myProfile}
          />
          <RatingSection rating={data.rating} />
          <ContentTypeBtns
            contentType={contentType}
            changeImgTypeHandler={changeImgTypeHandler}
            changeMapTypeHandler={changeMapTypeHandler}
            imgURL={data.imgURL}
          />
          <PostBottom data={data} myProfile={myProfile} postType={postType} />
        </PostItemWrapper>
      )}
    </>
  );
}
