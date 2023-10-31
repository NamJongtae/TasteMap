import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IKnownError,
  IPostData,
  IPostUploadData,
  ISearchMapData
} from "../api/apiType";
import { fetchSearchMapData } from "../api/naverSearchAPI/naverSearchAPI";
import {
  fetchAddPostLike,
  fetchAddPostMap,
  fetchEditPost,
  fetchFirstPageFeedData,
  fetchFirstPagePostData,
  fetchPagingFeedData,
  fetchPagingPostData,
  fetchPostData,
  fetchPostImg,
  fetchRemovePost,
  fetchRemovePostLike,
  fetchRemovePostMap,
  fetchReportPost,
  fetchUploadPost
} from "../api/firebase/postAPI";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot
} from "firebase/firestore";
import { sweetToast } from "../library/sweetAlert/sweetAlert";
import {
  fetchProfileFirstPageData,
  fetchProfilePagingData
} from "../api/firebase/profileAPI";
import { RootState } from "../store/store";
import { userSlice } from "./userSlice";

// 게시물 데이터 조회
export const thunkFetchPostData = createAsyncThunk<
  IPostData | undefined,
  string,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchPostData", async (postId: string, thunkAPI) => {
  try {
    const res = await fetchPostData(postId);
    if (res?.id) {
      thunkAPI.dispatch(postSlice.actions.setInvalidPage(false));
    } else {
      thunkAPI.dispatch(postSlice.actions.setInvalidPage(true));
    }
    return res;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

// 게시물 댓글 수 업데이트
export const thunkUpdatePostCommentCount = createAsyncThunk<
  IPostData | undefined,
  string,
  { rejectValue: IKnownError }
>("postSlice/thunkUpdatePostCommentCount", async (postId: string, thunkAPI) => {
  try {
    const res = await fetchPostData(postId);
    return res;
  } catch (error: any) {
    thunkAPI.rejectWithValue(error);
  }
});

// 맛집 검색
export const thunkFetchSearchMap = createAsyncThunk(
  "postSlice/thunkFetchSearchMap",
  async (keyword: string, thunkAPI) => {
    try {
      const res = await fetchSearchMapData(keyword);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// 게시물 업로드
export const thunkFetchUploadPost = createAsyncThunk<
  IPostUploadData,
  IPostUploadData,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchUploadPost", async (postData, thunkAPI) => {
  try {
    // img 프로퍼티는 이미지 firestore에 이미지를 저장하고
    // 저장한 이미지 파일의 url과 filename를 얻기위해 사용
    if (postData.img) {
      const res = await fetchPostImg(postData.img);
      postData.imgURL = res.url;
      postData.imgName = res.filename;
    }
    // 이미지 저장, 이미지 저장 데이터 적용 후
    // 이미지 파일 프로퍼티 삭제
    // 데이터 업로드시 파일 프로퍼티는 업로드할 필요가 없음
    delete postData.img;
    await fetchUploadPost(postData);
    return postData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 첫 페이지 데이터 조회
 */
export const thunkFetchFirstPagePostData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: DocumentData[];
    }
  | undefined,
  number,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchFirstPagePostData", async (pagePerDate, thunkAPI) => {
  try {
    const res = await fetchFirstPagePostData(pagePerDate);
    return res;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 페이징 데이터 조회
 */
export const thunkFetchPagingPostData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: DocumentData[];
    }
  | undefined,
  {
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pagePerData: number;
  },
  { rejectValue: IKnownError }
>(
  "postSlice/thunkFetchPostPageData",
  async ({ page, pagePerData }, thunkAPI) => {
    try {
      const res = await fetchPagingPostData(page, pagePerData);
      if (!res) return;
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 게시물 피드 첫 페이지 조회
 */
export const thunkFetchFirstPageFeedData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: DocumentData[];
    }
  | undefined,
  { pagePerData: number; followerList: string[] },
  { rejectValue: IKnownError }
>(
  "postSlice/thunkFetchFirstPageFeedData",
  async ({ pagePerData, followerList }, thunkAPI) => {
    try {
      const res = await fetchFirstPageFeedData(pagePerData, followerList);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 게시물 피드 페이징 조회
 */
export const thunkFetchPagingFeedData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: DocumentData[];
    }
  | undefined,
  {
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
    pagePerData: number;
    followerList: string[];
  },
  { rejectValue: IKnownError }
>(
  "postSlice/thunkFetchPagingFeedData",
  async ({ pagePerData, page, followerList }, thunkAPI) => {
    try {
      const res = await fetchPagingFeedData(page, pagePerData, followerList);
      return res;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 게시물 수정
 */
export const thunkFecthEditPost = createAsyncThunk<
  Pick<
    IPostUploadData,
    "id" | "content" | "rating" | "mapData" | "imgURL" | "imgName" | "img"
  >,
  {
    prevPostData: IPostData;
    editPostData: Pick<
      IPostUploadData,
      "id" | "content" | "rating" | "mapData" | "imgURL" | "imgName" | "img"
    >;
  },
  { rejectValue: IKnownError }
>(
  "postSlice/thunkFecthEditPost",
  async ({ prevPostData, editPostData }, thunkAPI) => {
    try {
      // img 프로퍼티는 이미지 firestore에 이미지를 저장하고
      // 저장한 이미지 파일의 url과 filename를 얻기위해 사용
      if (editPostData.img) {
        const res = await fetchPostImg(editPostData.img);
        editPostData.imgURL = [...editPostData.imgURL, ...res.url];
        editPostData.imgName = [...editPostData.imgName, ...res.filename];
      }
      // 이미지 저장, 이미지 저장 데이터 적용 후
      // 이미지 파일 프로퍼티 삭제
      // 데이터 업로드시 파일 프로퍼티는 업로드할 필요가 없음
      delete editPostData.img;
      await fetchEditPost(prevPostData, editPostData);
      return editPostData;
    } catch (error: any) {
      if (error.message === "게시물이 존재하지 않습니다.") {
        const state = thunkAPI.getState() as RootState;
        if (window.location.pathname.includes("profile")) {
          let userPosts = [...state.post.userPosts];
          if (userPosts)
            userPosts = userPosts.filter((v) => v.id !== editPostData.id);
          thunkAPI.dispatch(postSlice.actions.setUserPosts(userPosts));
        } else {
          let posts = [...state.post.posts];
          if (posts) posts = posts.filter((v) => v.id !== editPostData.id);
          thunkAPI.dispatch(postSlice.actions.setPosts(posts));
        }
      }
      return thunkAPI.rejectWithValue(error);
    }
  }
);
/**
 * 게시물 삭제
 */
export const thunkFetchRemovePost = createAsyncThunk<
  IPostData,
  IPostData,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchRemovePost", async (postData, thunkAPI) => {
  try {
    fetchRemovePost(postData);
    return postData;
  } catch (error: any) {
    if (error.message === "게시물이 존재하지 않습니다.") {
      const state = thunkAPI.getState() as RootState;
      if (window.location.pathname.includes("profile")) {
        let userPosts = [...state.post.userPosts];
        if (userPosts)
          userPosts = userPosts.filter((v) => v.id !== postData.id);
        thunkAPI.dispatch(postSlice.actions.setUserPosts(userPosts));
      } else {
        let posts = [...state.post.posts];
        if (posts) posts = posts.filter((v) => v.id !== postData.id);
        thunkAPI.dispatch(postSlice.actions.setPosts(posts));
      }
    }

    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 신고
 */
export const thunkFetchReportPost = createAsyncThunk<
  (IPostData & { uid: string | undefined }) | undefined,
  IPostData & { uid: string | undefined },
  { rejectValue: IKnownError & { id: string | undefined } }
>("postSlice/thunkFetchReportPost", async (postData, thunkAPI) => {
  try {
    await fetchReportPost(postData);
    return postData;
  } catch (error: any) {
    if (error.message === "게시물이 존재하지 않습니다.") {
      const state = thunkAPI.getState() as RootState;
      if (window.location.pathname.includes("profile")) {
        let userPosts = [...state.post.userPosts];
        if (userPosts)
          userPosts = userPosts.filter((v) => v.id !== postData.id);
        thunkAPI.dispatch(postSlice.actions.setUserPosts(userPosts));
      } else {
        let posts = [...state.post.posts];
        if (posts) posts = posts.filter((v) => v.id !== postData.id);
        thunkAPI.dispatch(postSlice.actions.setPosts(posts));
      }
    }

    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 좋아요 추가
 */
export const thunkFetchAddPostLike = createAsyncThunk<
  string,
  string,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchAddPostLike", async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const myProfile = { ...state.user.myProfile };
    if (myProfile.likeList) myProfile.likeList = [...myProfile.likeList, id];
    thunkAPI.dispatch(userSlice.actions.setMyprofile(myProfile));
    await fetchAddPostLike(id);
    return id;
  } catch (error: any) {
    if (error.message === "게시물이 존재하지 않습니다.") {
      const state = thunkAPI.getState() as RootState;
      if (window.location.pathname.includes("profile")) {
        let userPosts = [...state.post.userPosts];
        if (userPosts) userPosts = userPosts.filter((v) => v.id !== id);
        thunkAPI.dispatch(postSlice.actions.setUserPosts(userPosts));
      } else {
        let posts = [...state.post.posts];
        if (posts) posts = posts.filter((v) => v.id !== id);
        thunkAPI.dispatch(postSlice.actions.setPosts(posts));
      }
    }
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 좋아요 삭제
 */
export const thunkFetchRemovePostLike = createAsyncThunk<
  string,
  string,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchRemovePostLike", async (id, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const myProfile = { ...state.user.myProfile };
    if (myProfile.likeList)
      myProfile.likeList = myProfile.likeList.filter((v) => v !== id);
    thunkAPI.dispatch(userSlice.actions.setMyprofile(myProfile));
    await fetchRemovePostLike(id);
    return id;
  } catch (error: any) {
    if (error.message === "게시물이 존재하지 않습니다.") {
      const state = thunkAPI.getState() as RootState;
      if (window.location.pathname.includes("profile")) {
        let userPosts = [...state.post.userPosts];
        if (userPosts) userPosts = userPosts.filter((v) => v.id !== id);
        thunkAPI.dispatch(postSlice.actions.setUserPosts(userPosts));
      } else {
        let posts = [...state.post.posts];
        if (posts) posts = posts.filter((v) => v.id !== id);
        thunkAPI.dispatch(postSlice.actions.setPosts(posts));
      }
    }
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 지도 추가
 */
export const thunkFetchAddPostMap = createAsyncThunk<
  ISearchMapData,
  ISearchMapData,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchAddPostMap", async (mapData, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const myProfile = { ...state.user.myProfile };
    if (myProfile.storedMapList)
      myProfile.storedMapList = [...myProfile.storedMapList, mapData];
    thunkAPI.dispatch(userSlice.actions.setMyprofile(myProfile));
    await fetchAddPostMap(mapData);
    return mapData;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 게시물 지도 삭제
 */
export const thunkFetchRemovePostMap = createAsyncThunk<
  void,
  ISearchMapData,
  { rejectValue: IKnownError }
>("postSlice/thunkFetchRemovePostMap", async (mapData, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState;
    const myProfile = { ...state.user.myProfile };
    if (myProfile.storedMapList)
      myProfile.storedMapList = myProfile.storedMapList.filter(
        (v) => v.mapx !== mapData.mapx && v.mapy !== mapData.mapy
      );
    thunkAPI.dispatch(userSlice.actions.setMyprofile(myProfile));
    await fetchRemovePostMap(mapData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

/**
 * 유저 프로필 게시물 첫 페이지 조회
 */
export const thunkFetchProfileFirstPageData = createAsyncThunk<
  | { postDocs: QuerySnapshot<DocumentData, DocumentData>; data: IPostData[] }
  | undefined,
  { uid: string; pagePerData: number },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchProfileFirstPageData",
  async ({ uid, pagePerData }, thuckAPI) => {
    try {
      const res = await fetchProfileFirstPageData(uid, pagePerData);
      return res;
    } catch (error: any) {
      thuckAPI.rejectWithValue(error);
    }
  }
);

/**
 * 유저 프로필 게시물 페이징
 */
export const thunkFetchProfilePagingData = createAsyncThunk<
  | {
      postDocs: QuerySnapshot<DocumentData, DocumentData>;
      data: IPostData[];
    }
  | undefined,
  {
    uid: string;
    pagePerData: number;
    page: QueryDocumentSnapshot<DocumentData, DocumentData>;
  },
  { rejectValue: IKnownError }
>(
  "profileSlice/thunkFetchProfilePagingData",
  async ({ uid, pagePerData, page }, thunkAPI) => {
    try {
      const res = await fetchProfilePagingData(uid, pagePerData, page);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

/**
 * 프로필 게시물 댓글 수 업데이트
 **/
export const thunkUpdateProfilePostCommentCount = createAsyncThunk<
  IPostData | undefined,
  string,
  { rejectValue: IKnownError }
>(
  "postSlice/thunkUpdateProfilePostCommentCount",
  async (postId: string, thunkAPI) => {
    try {
      const res = await fetchPostData(postId);
      return res;
    } catch (error: any) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    post: {} as IPostData,
    posts: [] as IPostData[], // 게시물 데이터
    postsPage: {} as QueryDocumentSnapshot<DocumentData>,
    postsPagePerData: 5,
    postsHasMore: false,
    searchMapData: [] as ISearchMapData[], // 검색 데이터
    seletedMapData: [] as ISearchMapData[], // 선택한 검색 데이터,
    invalidPage: false,
    isNoPostData: false,
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: "",
    loadMorePostsLoading: false,
    removePostLoading: false,
    removePostDone: false,
    removePostError: "",
    reportPostLoading: false,
    reportPostDone: false,
    reportPostError: "",
    likePostLoading: false,
    likePostDone: false,
    likePostError: "",
    unlikePostLoading: false,
    unlikePostDone: false,
    unlikePostError: "",
    addMyMapLoading: false,
    addMyMapDone: false,
    addMyMapError: "",
    removeMyMapLoading: false,
    removeMyMapDone: false,
    removeMyMapError: "",
    uploadPostLoading: false,
    uploadPostDone: false,
    uploadPostError: "",
    updateCommentCountLoading: false,
    updateCommentCountDone: false,
    updateCommentCountError: "",
    searchMapLoading: false,
    searchMapDone: false,
    searchMapError: "",
    userPosts: [] as IPostData[],
    loadUserPostsLoading: false,
    loadUserPostsDone: false,
    loadUserPostsError: "",
    userPostsPage: {} as QueryDocumentSnapshot<DocumentData>,
    userPostsPagePerData: 5,
    userPostsHasMore: false,
    isNoUserPostData: false,
    updateUserPostCommentCountLoading: false,
    updateUserPostCommentCountDone: false,
    updateUserPostCommentCountError: ""
  },

  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    setSelectedMapData: (state, action) => {
      state.seletedMapData = [action.payload];
    },
    resetSelectedMapData: (state) => {
      state.seletedMapData = [] as ISearchMapData[];
    },
    resetSearchMapData: (state) => {
      state.searchMapData = [];
    },
    remove: (state, action) => {
      const newData = [...state.posts].filter(
        (item) => item.id !== action.payload
      );
      state.posts = newData;
    },
    setInvalidPage: (state, action) => {
      state.invalidPage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.loadPostsLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    // 게시물 데이터 조회
    builder.addCase(thunkFetchPostData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = "";
    });
    builder.addCase(thunkFetchPostData.fulfilled, (state, action) => {
      if (action.payload) state.post = action.payload;
      document.body.style.overflow = "auto";
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
    });
    builder.addCase(thunkFetchPostData.rejected, (state, action) => {
      if (action.payload) state.loadPostsError = action.payload.message;
      document.body.style.overflow = "auto";
      state.loadPostsLoading = false;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadPostsError);
    });

    builder.addCase(thunkUpdatePostCommentCount.pending, (state) => {
      state.updateCommentCountLoading = false;
      state.updateCommentCountDone = true;
      state.updateCommentCountError = "";
    });

    // 게시물 댓글 수 업데이트
    builder.addCase(thunkUpdatePostCommentCount.fulfilled, (state, action) => {
      if (action.payload) {
        state.updateCommentCountLoading = false;
        state.updateCommentCountDone = true;
        const postListData = state.posts.find(
          (item) => item.id === (action.payload as IPostData).id
        );
        if (postListData)
          postListData.commentCount = action.payload.commentCount;
      }
    });
    builder.addCase(thunkUpdatePostCommentCount.rejected, (state, action) => {
      if (!action.payload) return;
      state.updateCommentCountLoading = false;
      state.updateCommentCountError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.updateCommentCountError);
    });

    // 맛집 지도 검색
    builder.addCase(thunkFetchSearchMap.pending, (state) => {
      state.searchMapLoading = true;
      state.searchMapDone = false;
      state.searchMapError = "";
    });
    builder.addCase(thunkFetchSearchMap.fulfilled, (state, action) => {
      state.searchMapData = action.payload;
      state.searchMapLoading = false;
      state.searchMapDone = true;
    });
    builder.addCase(thunkFetchSearchMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.searchMapError = action.payload.toString();
      state.searchMapLoading = false;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.searchMapError);
    });

    // 게시물 업로드
    builder.addCase(thunkFetchUploadPost.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.uploadPostLoading = true;
      state.uploadPostDone = false;
      state.uploadPostError = "";
    });
    builder.addCase(thunkFetchUploadPost.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.uploadPostLoading = false;
      state.posts.unshift(action.payload);
    });
    builder.addCase(thunkFetchUploadPost.rejected, (state, action) => {
      if (!action.payload) return;
      state.uploadPostLoading = false;
      state.uploadPostError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.uploadPostError);
    });

    // 게시물 조회
    builder.addCase(thunkFetchFirstPagePostData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = "";
    });
    builder.addCase(thunkFetchFirstPagePostData.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      if (!action.payload) return;
      if (action.payload.data.length > 0) {
        state.isNoPostData = false;
        state.posts = action.payload?.data as IPostData[];
        state.postsHasMore =
          (action.payload?.data as IPostData[]).length %
            state.postsPagePerData ===
          0;
        state.postsPage =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
        if (action.payload?.data.length > 0) {
          state.isNoPostData = false;
        } else {
          state.isNoPostData = true;
        }
      }
    });
    builder.addCase(thunkFetchFirstPagePostData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadPostsError);
    });

    // 게시물 페이징
    builder.addCase(thunkFetchPagingPostData.pending, (state) => {
      state.loadMorePostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = "";
    });
    builder.addCase(thunkFetchPagingPostData.fulfilled, (state, action) => {
      state.loadMorePostsLoading = false;
      state.loadPostsDone = true;
      if (!action.payload) return;
      if (action.payload.data.length > 0) {
        state.posts.push(...(action.payload?.data as IPostData[]));
        state.postsPage =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
        state.postsHasMore =
          action.payload.data.length % state.postsPagePerData === 0;
      }
    });
    builder.addCase(thunkFetchPagingPostData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadMorePostsLoading = false;
      state.loadPostsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadPostsError);
    });

    // 게시물 피드 첫 페이지 조회
    builder.addCase(thunkFetchFirstPageFeedData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.loadPostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = "";
    });
    builder.addCase(thunkFetchFirstPageFeedData.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.loadPostsLoading = false;
      state.loadPostsDone = true;
      if (!action.payload) return;
      if (action.payload?.data.length > 0) {
        state.isNoPostData = false;
        state.posts = action.payload?.data as IPostData[];
        state.postsHasMore =
          (action.payload?.data as IPostData[]).length %
            state.postsPagePerData ===
          0;
        state.postsPage =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
      } else {
        state.isNoPostData = true;
      }
    });
    builder.addCase(thunkFetchFirstPageFeedData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadPostsLoading = false;
      state.loadPostsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadPostsError);
    });

    // 게시물 피드 페이징
    builder.addCase(thunkFetchPagingFeedData.pending, (state) => {
      state.loadMorePostsLoading = true;
      state.loadPostsDone = false;
      state.loadPostsError = "";
    });
    builder.addCase(thunkFetchPagingFeedData.fulfilled, (state, action) => {
      state.loadMorePostsLoading = false;
      state.loadPostsDone = true;
      if (!action.payload) return;
      if (action.payload.data.length > 0) {
        state.posts.push(...(action.payload?.data as IPostData[]));
        state.postsPage =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
        state.postsHasMore =
          action.payload.data.length % state.postsPagePerData === 0;
      }
    });
    builder.addCase(thunkFetchPagingFeedData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadMorePostsLoading = false;
      state.loadPostsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadPostsError);
    });

    // 게시물 수정
    builder.addCase(thunkFecthEditPost.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.uploadPostLoading = true;
      state.uploadPostDone = false;
      state.uploadPostError = "";
    });
    builder.addCase(thunkFecthEditPost.fulfilled, (state, action) => {
      document.body.style.overflow = "auto";
      state.uploadPostLoading = false;
      state.uploadPostDone = true;
      let postListData = state.posts.find(
        (item) => item.id === action.payload.id
      );
      if (postListData) postListData = action.payload;
    });
    builder.addCase(thunkFecthEditPost.rejected, (state, action) => {
      if (!action.payload) return;
      document.body.style.overflow = "auto";
      state.uploadPostLoading = false;
      state.uploadPostError = action.payload.message;
      if (action.payload.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.uploadPostError);
    });

    // 게시물 삭제
    builder.addCase(thunkFetchRemovePost.pending, (state) => {
      state.removePostLoading = true;
      state.removePostDone = false;
      state.removePostError = "";
    });
    builder.addCase(thunkFetchRemovePost.fulfilled, (state, action) => {
      state.posts = state.posts.filter((item) => item.id !== action.payload.id);
      state.removePostLoading = false;
      state.removePostDone = true;
      sweetToast("삭제가 완료되었습니다.", "success");
    });

    builder.addCase(thunkFetchRemovePost.rejected, (state, action) => {
      if (!action.payload) return;
      state.removePostLoading = false;
      state.removePostError = action.payload.message;
      if (action.payload.message === "게시물이 존재하지 않습니다.") {
        sweetToast("이미 삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.removePostError);
    });

    // 게시물 신고
    builder.addCase(thunkFetchReportPost.pending, (state) => {
      state.reportPostLoading = true;
      state.reportPostDone = false;
      state.reportPostError = "";
    });
    builder.addCase(thunkFetchReportPost.fulfilled, (state, action) => {
      state.reportPostLoading = false;
      state.reportPostDone = true;
      const post = state.posts.find((v) => v.id === action.payload?.id);
      if (!action.payload?.uid) {
        sweetToast("로그인 후 이용해주세요!");
        return;
      }
      if (post) post.reportUidList?.push(action.payload.uid);
      if (action.payload?.reportCount && action.payload?.reportCount >= 4) {
        if (window.location.pathname.includes("profile")) {
          const userPosts = state.userPosts.find(
            (v) => v.id === action.payload?.id
          );
          if (userPosts) userPosts.isBlock = true;
        } else {
          const post = state.posts.find((v) => v.id === action.payload?.id);
          if (post) post.isBlock = true;
        }

        sweetToast("신고가 누적되어 게시물이 블라인드 처리되었습니다.", "info");
      } else {
        sweetToast("신고가 완료되었습니다.", "success");
      }
    });
    builder.addCase(thunkFetchReportPost.rejected, (state, action) => {
      if (!action.payload) return;
      state.reportPostLoading = false;
      state.reportPostError = action.payload.message;
      if (action.payload.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.reportPostError);
    });

    // 게시물 좋아요 추가
    builder.addCase(thunkFetchAddPostLike.pending, (state) => {
      state.likePostLoading = true;
      state.likePostDone = false;
      state.likePostError = "";
    });
    builder.addCase(thunkFetchAddPostLike.fulfilled, (state, action) => {
      state.likePostLoading = false;
      state.likePostDone = true;
      const index = state.posts.findIndex((v) => v.id === action.payload);
      state.posts[index].likeCount = state.posts[index].likeCount || 0 + 1;
    });
    builder.addCase(thunkFetchAddPostLike.rejected, (state, action) => {
      if (!action.payload) return;
      state.likePostLoading = false;
      state.likePostError = action.payload.message;
      if (action.payload.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.likePostError);
    });

    // 게시물 좋아요 삭제
    builder.addCase(thunkFetchRemovePostLike.pending, (state) => {
      state.unlikePostLoading = true;
      state.unlikePostDone = false;
      state.unlikePostError = "";
    });
    builder.addCase(thunkFetchRemovePostLike.fulfilled, (state, action) => {
      state.unlikePostLoading = false;
      state.unlikePostDone = true;
      const post = state.posts.find((v) => v.id === action.payload);
      if (post?.likeCount) post.likeCount = post.likeCount - 1;
    });
    builder.addCase(thunkFetchRemovePostLike.rejected, (state, action) => {
      if (!action.payload) return;
      state.unlikePostLoading = false;
      state.unlikePostError = action.payload.message;
      if (action.payload.message === "게시물이 존재하지 않습니다.") {
        sweetToast("삭제된 게시물입니다.", "warning");
      } else {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
      }
      console.error(state.unlikePostError);
    });

    // 게시물 지도 추가
    builder.addCase(thunkFetchAddPostMap.pending, (state) => {
      state.addMyMapLoading = true;
      state.addMyMapDone = false;
      state.addMyMapError = "";
    });
    builder.addCase(thunkFetchAddPostMap.fulfilled, (state) => {
      state.addMyMapLoading = false;
      state.addMyMapDone = true;
    });
    builder.addCase(thunkFetchAddPostMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.addMyMapLoading = false;
      state.addMyMapError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.addMyMapError);
    });

    // 게시물 지도 삭제
    builder.addCase(thunkFetchRemovePostMap.pending, (state) => {
      state.removeMyMapLoading = true;
      state.removeMyMapDone = false;
      state.removeMyMapError = "";
    });
    builder.addCase(thunkFetchRemovePostMap.fulfilled, (state) => {
      state.removeMyMapLoading = false;
      state.removeMyMapDone = true;
    });
    builder.addCase(thunkFetchRemovePostMap.rejected, (state, action) => {
      if (!action.payload) return;
      state.removeMyMapLoading = false;
      state.removeMyMapError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.removeMyMapError);
    });

    // 프로필 게시물 데이터 첫 페이지
    builder.addCase(thunkFetchProfileFirstPageData.pending, (state) => {
      document.body.style.overflow = "hidden";
      state.loadUserPostsLoading = true;
      state.loadUserPostsDone = false;
      state.loadUserPostsError = "";
    });
    builder.addCase(
      thunkFetchProfileFirstPageData.fulfilled,
      (state, action) => {
        document.body.style.overflow = "auto";
        state.loadUserPostsDone = true;
        state.loadUserPostsLoading = false;
        if (!action.payload) return;
        if (action.payload.data.length > 0) {
          state.isNoUserPostData = false;
          state.userPosts = action.payload?.data;
          state.userPostsHasMore =
            (action.payload?.data as IPostData[]).length %
              state.userPostsPagePerData ===
            0;
          state.userPostsPage =
            action.payload.postDocs.docs[
              action.payload.postDocs.docs.length - 1
            ];
        } else {
          state.isNoUserPostData = true;
        }
      }
    );
    builder.addCase(
      thunkFetchProfileFirstPageData.rejected,
      (state, action) => {
        if (!action.payload) return;
        state.loadUserPostsLoading = false;
        state.loadUserPostsError = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.loadUserPostsError);
      }
    );

    // 유저 게시물 페이징
    builder.addCase(thunkFetchProfilePagingData.pending, (state) => {
      state.loadMorePostsLoading = true;
      state.loadUserPostsDone = false;
      state.loadUserPostsError = "";
    });
    builder.addCase(thunkFetchProfilePagingData.fulfilled, (state, action) => {
      state.loadMorePostsLoading = false;
      state.loadUserPostsDone = true;
      if (!action.payload) return;
      if (action.payload.data.length > 0) {
        state.userPosts.push(...(action.payload?.data as IPostData[]));
        state.userPostsPage =
          action.payload.postDocs.docs[action.payload.postDocs.docs.length - 1];
        state.userPostsHasMore =
          action.payload.data.length % state.userPostsPagePerData === 0;
      }
    });
    builder.addCase(thunkFetchProfilePagingData.rejected, (state, action) => {
      if (!action.payload) return;
      state.loadMorePostsLoading = false;
      state.loadUserPostsError = action.payload.message;
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(state.loadUserPostsError);
    });

    // 게시물 댓글 수 업데이트
    builder.addCase(thunkUpdateProfilePostCommentCount.pending, (state) => {
      state.updateUserPostCommentCountLoading = true;
      state.updateUserPostCommentCountDone = false;
      state.updateUserPostCommentCountError = "";
    });
    builder.addCase(
      thunkUpdateProfilePostCommentCount.fulfilled,
      (state, action) => {
        state.updateUserPostCommentCountLoading = false;
        state.updateUserPostCommentCountDone = true;
        if (action.payload) {
          const userPosts = state.userPosts.find(
            (v) => v.id === (action.payload as IPostData).id
          );
          if (userPosts?.commentCount)
            userPosts.commentCount = action.payload.commentCount;
        }
      }
    );
    builder.addCase(
      thunkUpdateProfilePostCommentCount.rejected,
      (state, action) => {
        if (!action.payload) return;
        state.updateUserPostCommentCountLoading = false;
        state.updateUserPostCommentCountError = action.payload.message;
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(state.updateUserPostCommentCountError);
      }
    );
  }
});
