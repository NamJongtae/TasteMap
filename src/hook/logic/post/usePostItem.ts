import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { EContentType } from "../../../component/units/post/PostItem";
import { useInView } from "react-intersection-observer";
import { useAddTasteMapMutation } from "../../query/profile/useAddTasteMapMutation";
import { useRemoveTasteMapMutation } from "../../query/profile/useRemoveTasteMapMutation";
import { useAddLikeMutation } from "../../query/profile/useAddLikeMutation";
import { useRemoveLikeMutation } from "../../query/profile/useRemoveLikeMutation";
import { commentSlice } from "../../../slice/commentSlice";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { setDateFormat } from "../../../library/setDateFormat";
import { IMyProfileData, IPostData } from "../../../api/apiType";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export const usePostItem = ({ data, myProfile, postType }: IProps) => {
  const dispatch = useDispatch<AppDispatch>();
  // 좋아요 유무
  const isLike = myProfile.likeList.includes(data.id);
  // 좋아요 수
  const likeCount = data.likeCount;
  // 맛집 지도 추가 유무
  const isStoredMap = !!myProfile.storedMapList.find(
    (v) => v.mapx === data.mapData?.mapx && v.mapy === data.mapData?.mapy
  );

  // 게시물 썸네일 스타일 타입
  const [contentType, setContentType] = useState<EContentType>(
    EContentType.MAP
  );
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);
  const contentTextRef = useRef<HTMLParagraphElement>(null);
  const [kakaomapRef, inview] = useInView();

  const { mutate: addTasteMapMutate } = useAddTasteMapMutation();
  const { mutate: removeTasteMapMutate } = useRemoveTasteMapMutation();

  const { mutate: addLikeMutate } = useAddLikeMutation(postType);
  const { mutate: removeLikeMutate } = useRemoveLikeMutation(postType);

  const openMoreTextHandler = useCallback(() => {
    if (contentTextRef.current) {
      contentTextRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  }, []);

  const openCommentModalHanlder = useCallback(() => {
    dispatch(commentSlice.actions.setIsOpenCommentModal(true));
    dispatch(commentSlice.actions.setPostId(data.id));
  }, []);

  const changeMapTypeHandler = () => {
    if (data.imgURL && data.imgURL.length === 0) {
      sweetToast("이미지가 존재하지 않습니다.", "warning");
      return;
    }
    setContentType(EContentType.IMAGE);
  };

  const changeImgTypeHandler = () => {
    setContentType(EContentType.MAP);
  };

  /**
   * 좋아요 추가 함수
   */
  const addLikeHandler = useCallback(
    (id: string) => {
      // 자기 자신의 게시물에 좋아요를 누르면 retun
      if (myProfile.uid === data.uid) {
        sweetToast("자신의 게시물은 좋아요할 수 없습니다!", "warning");
        return;
      }
      addLikeMutate(id);
    },
    [myProfile]
  );

  /**
   * 좋아요 제거 함수
   */
  const removeLikeHandler = useCallback((id: string) => {
    removeLikeMutate(id);
  }, []);

  const toggleMapHandler = useCallback(
    async (postData: IPostData) => {
      if (!postData || !myProfile.storedMapList) return;

      if (!isStoredMap) {
        // 지도 추가 api 비동기 처리
        if (postData.mapData) {
          if (myProfile.storedMapList.length > 20) {
            sweetToast("저장 가능한 맛집 수를 초과하였습니다\n(최대 20개)");
          }
          addTasteMapMutate(postData.mapData);
        }
      } else {
        // 지도 제거 api 비동기 처리
        if (postData.mapData) {
          removeTasteMapMutate(postData.mapData);
        }
      }
    },
    [myProfile, isStoredMap]
  );

  const getFormattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  useLayoutEffect(() => {
    if (contentTextRef.current) {
      if (contentTextRef.current.clientHeight >= 105) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, []);

  return {
    isLike,
    likeCount,
    addLikeHandler,
    removeLikeHandler,
    isStoredMap,
    toggleMapHandler,
    getFormattedDate,
    changeMapTypeHandler,
    changeImgTypeHandler,
    contentType,
    openMoreTextHandler,
    contentTextRef,
    isShowMoreTextBtn,
    openCommentModalHanlder,
    kakaomapRef,
    inview
  };
};
