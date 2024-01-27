export const AUTH_QUERYKEY = ["auth"];

export const HOME_POSTS_QUERYKEY = ["posts", "HOME"];

export const FEED_POSTS_QUERYKEY = ["posts", "FEED"];

export const My_PROFILE_QUERYKEY = ["profile", "my"];

export const FOLLOWERS_QUERYKEY = ["profile", "followers"];

export const FOLLOWING_QUERYKEY = ["profile", "following"];

export const SEARCH_QUERYKEY = ["search"];

export const getCommentsQuerykey = (postId: string) => {
  return ["post", postId, "comments"];
};

export const getRepliesQuerykey = (postId: string, parentCommentId: string) => {
  return ["post", postId, "comment", parentCommentId, "replies"];
};

export const getPostQuerykey = (postId: string) => {
  return ["post", postId];
};
export const getPostsQuerykey = (postType: string, uid: string | undefined) => {
  return postType === "PROFILE"
    ? ["posts", postType, uid]
    : ["posts", postType];
};

export const getProfilePostsQuerykey = (uid: string) => {
  return ["posts", "PROFILE", uid];
};

export const getUserProfileQuerykey = (uid: string) => {
  return ["profile", uid];
};
