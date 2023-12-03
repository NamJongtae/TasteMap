import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store/store";
import { useCallback, useEffect, useRef } from "react";
import { usePostUploadMutation } from "../../query/post/usePostUploadMutation";
import { usePostUpdateMutation } from "../../query/post/usePostUpdateMutation";
import { useQueryClient } from "@tanstack/react-query";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { useLoadPostQuery } from "../../query/post/useLoadPostQuery";
import {
  IMapData,
  IPostUpdateData,
  IPostUploadData
} from "../../../api/apiType";
import { Timestamp } from "firebase/firestore";
import { tasteMapSlice } from "../../../slice/tasteMapSlice";

interface IProps {
  isEdit: boolean;
}
export const usePostUpload = ({ isEdit }: IProps) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  // 작성자의 프로필을 넣기위해 myInfo를 가져옴
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchSelectedMap = useSelector(
    (state: RootState) => state.tasteMap.searchSelectedMap
  );
  const dispatch = useDispatch<AppDispatch>();

  const { mutate, isPending: uploadPostIsPending } = usePostUploadMutation();

  const { mutate: updatePostMutate, isPending: updatePostIsPending } =
    usePostUpdateMutation();

  const queryClient = useQueryClient();

  const {
    data: post,
    isFetching: loadPostLoading,
    isError,
    error
  } = useLoadPostQuery(isEdit, postId || "");

  if (isError) {
    if (error?.message !== "존재하지 않는 게시물입니다.") {
      sweetToast(
        "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
        "warning"
      );
      console.error(error);
      navigate("/");
    }
    queryClient.removeQueries({ queryKey: ["post", postId] });
  }

  /**
   * 게시물 수정 사용자 확인 */
  const checkVaildationUser = () => {
    if (isEdit && post) {
      if (post?.uid !== myInfo.uid) {
        sweetToast("다른 사용자의 게시물은 수정할 수 없습니다!", "warning");
        navigate("/", { replace: true });
      }
    }
  };

  /**
   * 게시물 업로드 함수 */
  const onSubmitUpload = useCallback(
    async (
      content: string,
      rating: number,
      mapData: IMapData,
      imgURL: string[],
      imgName: string[],
      img: File[]
    ) => {
      // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
      if (!content || !searchSelectedMap.mapx) return;
      if (isEdit && post) {
        const editPostData: IPostUpdateData = {
          id: post!.id,
          content,
          rating,
          mapData,
          imgURL,
          imgName,
          img
        };
        updatePostMutate({
          prevPostDataImgName: post,
          newPost: editPostData
        });
      } else {
        const id = uuid();
        // 서버로 보낼 postData 정의
        const uploadData: IPostUploadData = {
          id,
          content,
          img,
          uid: myInfo.uid,
          createdAt: Timestamp.fromDate(new Date()),
          likeCount: 0,
          commentCount: 0,
          reportCount: 0,
          reportUidList: [],
          mapData,
          isBlock: false,
          imgName: [],
          imgURL: [],
          rating
        };

        mutate(uploadData);
      }
    },
    [post, isEdit, searchSelectedMap]
  );

  useEffect(() => {
    checkVaildationUser();
  }, [post]);

  useEffect(() => {
    return () => {
      dispatch(tasteMapSlice.actions.setSearchSelectedMap({} as IMapData));
    };
  }, []);

  const isDisabled = (
    contentValue: string,
    preview: string[],
    ratingValue: number
  ) => {
    return isEdit
      ? contentValue === "" ||
          (post?.content === contentValue &&
            post?.imgURL === preview &&
            post?.rating === ratingValue &&
            post?.mapData.address === searchSelectedMap.address)
      : !contentValue || !searchSelectedMap.mapx || !ratingValue;
  };
  const uploadPostLoading = uploadPostIsPending || updatePostIsPending;
  const invalidUpdatePage = isEdit && !post?.uid && !loadPostLoading;

  return {
    post,
    onSubmitUpload,
    searchSelectedMap,
    textareaRef,
    uploadPostLoading,
    isDisabled,
    loadPostLoading,
    invalidUpdatePage
  };
};
