import { useState } from "react";

export const usePostTypeBtnActions = () => {
  const [postType, setPostType] = useState<"HOME" | "FEED">("HOME");

  const homeBtnActiveHandler = () => {
    setPostType("HOME");
  };

  const FeedBtnActiveHandler = () => {
    setPostType("FEED");
  };

  return {
    postType,
    homeBtnActiveHandler,
    FeedBtnActiveHandler,
  };
};
