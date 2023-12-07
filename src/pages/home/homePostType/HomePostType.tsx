import React from "react";
import {
  PostTypeWrapper,
  FeedBtn,
  HomeBtn,
  PostTypeTitle
} from "./homePostType.styles";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

interface IProps {
  postType: "HOME" | "FEED";
  homeBtnActiveHandler: () => void;
  FeedBtnActiveHandler: () => void;
}
export default function HomePostType({
  postType,
  homeBtnActiveHandler,
  FeedBtnActiveHandler
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  return (
    <PostTypeWrapper>
      <HomeBtn
        onClick={homeBtnActiveHandler}
        postType={postType}
        aria-label='Home'
        title='Home'
        $isWebpSupported={isWebpSupported}
      />
      <FeedBtn
        onClick={FeedBtnActiveHandler}
        postType={postType}
        aria-label='Feed'
        title='Feed'
        $isWebpSupported={isWebpSupported}
      />
      <PostTypeTitle>
        {postType === "HOME" ? "전체 게시물" : "피드 게시물"}
      </PostTypeTitle>
    </PostTypeWrapper>
  );
}
