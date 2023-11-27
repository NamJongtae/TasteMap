import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { IPostData, IMyProfileData } from "../../../api/apiType";
import PostItemUI from "./PostItem.present";
import { setDateFormat } from "../../../library/setDateFormat";
import { commentSlice } from "../../../slice/commentSlice";
import { useInView } from "react-intersection-observer";
import { useAddTasteMapMutation } from "../../../hook/query/profile/useAddTasteMapMutation";
import { useRemoveTasteMapMutation } from "../../../hook/query/profile/useRemoveTasteMapMutation";
import { useAddLikeMutation } from "../../../hook/query/profile/useAddLikeMutation";
import { useRemoveLikeMutation } from "../../../hook/query/profile/useRemoveLikeMutation";

interface IProps {
  data: IPostData;
  myProfile: IMyProfileData;
  postType: "HOME" | "FEED" | "PROFILE";
}

export const enum EContentType {
  MAP = "MAP",
  IMAGE = "IMAGE"
}

export default function PostItem({ data, myProfile, postType }: IProps) {
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

  const onClickMoreText = useCallback(() => {
    if (contentTextRef.current) {
      contentTextRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  }, []);

  const openCommentModal = useCallback(() => {
    dispatch(commentSlice.actions.setIsOpenCommentModal(true));
    dispatch(commentSlice.actions.setPostId(data.id));
  }, []);

  useLayoutEffect(() => {
    if (contentTextRef.current) {
      if (contentTextRef.current.clientHeight >= 105) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, []);

  const changePostMapType = () => {
    if (data.imgURL && data.imgURL.length === 0) {
      sweetToast("이미지가 존재하지 않습니다.", "warning");
      return;
    }
    setContentType(EContentType.IMAGE);
  };

  const changePostImgType = () => {
    setContentType(EContentType.MAP);
  };

  /**
   * 좋아요 추가 함수
   */
  const onClickLike = useCallback(
    async (id: string | undefined) => {
      if (!id) return;
      // 자기 자신의 게시물에 좋아요를 누르면 retun
      if (myProfile.uid === data.uid) {
        sweetToast("자신의 게시물은 좋아요할 수 없습니다!", "warning");
        return;
      }

      if (!isLike) {
        addLikeMutate(id);
      } else {
        removeLikeMutate(id);
      }
    },
    [myProfile]
  );

  const onClickStoredMap = useCallback(
    async (postData: IPostData) => {
      if (!postData || !myProfile.storedMapList) return;

      if (!isStoredMap) {
        // 지도 추가 api 비동기 처리
        if (postData.mapData) {
          if (myProfile.storedMapList.length > 20) {
            sweetToast("저장 가능한 맛집 수를 초과하였습니다\n(최대 20개)");
          }
          addTasteMapMutate(postData.mapData);
          sweetToast("나의 맛집 지도에 맛집이 추가 되었습니다", "success");
        }
      } else {
        // 지도 제거 api 비동기 처리
        if (postData.mapData) {
          removeTasteMapMutate(postData.mapData);
          sweetToast("나의 맛집 지도에 맛집이 삭제 되었습니다", "success");
        }
      }
    },
    [myProfile, isStoredMap]
  );

  const formattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  return (
    <PostItemUI
      data={data}
      myProfile={myProfile}
      isLike={isLike}
      likeCount={likeCount}
      onClickLike={onClickLike}
      isStoredMap={isStoredMap}
      onClickStoredMap={onClickStoredMap}
      formattedDate={formattedDate}
      changePostMapType={changePostMapType}
      changePostImgType={changePostImgType}
      contentType={contentType}
      onClickMoreText={onClickMoreText}
      contentTextRef={contentTextRef}
      isShowMoreTextBtn={isShowMoreTextBtn}
      openCommentModal={openCommentModal}
      kakaomapRef={kakaomapRef}
      inview={inview}
      postType={postType}
    />
  );
}
