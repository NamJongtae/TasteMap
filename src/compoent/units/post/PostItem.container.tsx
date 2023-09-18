import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  thuckFetchAddPostLike,
  thuckFetchAddPostMap,
  thuckFetchRemovePostLike,
  thuckFetchRemovePostMap
} from "../../../slice/postSlice";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { IPostData, IProfileData, ISearchMapData } from "../../../api/apiType";
import PostItemUI from "./PostItem.present";
import { setDateFormat } from "../../../library/setDateFormat";
import { profileSlice } from "../../../slice/profileSlice";
interface IProps {
  data: IPostData;
  userProfile: IProfileData;
}

export default function PostItem({ data, userProfile }: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  // 좋아요 유무
  const [isLike, setIsLike] = useState(false);
  // 좋아요 수
  const [likeCount, setLikeCount] = useState(0);
  // 맛집 지도 추가 유무
  const [isStoredMap, setIsStoredMap] = useState(false);
  // 게시물 썸네일 스타일 타입
  const [postType, setType] = useState<"map" | "image">("map");
  const [isShowMoreTextBtn, setIsShowMoreTextBtn] = useState(false);
  const contentTextRef = useRef<HTMLParagraphElement>(null);

  const onClickMoreText = () => {
    if (contentTextRef.current) {
      contentTextRef.current.style.display = "block";
      setIsShowMoreTextBtn(false);
    }
  };

  useEffect(() => {
    if (contentTextRef.current) {
      if (contentTextRef.current.clientHeight >= 105) {
        setIsShowMoreTextBtn(true);
      } else {
        setIsShowMoreTextBtn(false);
      }
    }
  }, []);

  const onChangePostType = () => {
    if (postType === "map") {
      if (data.imgURL && data.imgURL.length === 0) {
        sweetToast("이미지가 존재하지 않습니다.", "warning");
        return;
      }
      setType("image");
    } else {
      setType("map");
    }
  };

  const onChangeStoredMapList = (map: ISearchMapData) => {
    if (userProfile.storedMapList) {
      if (!isStoredMap) {
        const newProfile = {
          ...userProfile,
          storedMapList: [...userProfile.storedMapList, map]
        };
        dispatch(profileSlice.actions.setprofile(newProfile));
      } else {
        const newProfile = {
          ...userProfile,
          storedMapList: [...userProfile.storedMapList].filter(
            (item) => item.mapx !== map.mapx && item.mapy !== map.mapy
          )
        };
        dispatch(profileSlice.actions.setprofile(newProfile));
      }
    }
  };

  /**
   * 좋아요 추가 함수
   */
  const onClickLike = async (id: string | undefined) => {
    if (!id) return;
    // 자기 자신의 게시물에 좋아요를 누르면 retun
    if (userProfile.uid === data.uid) {
      sweetToast("자신의 게시물은 좋아요할 수 없습니다!", "warning");
      return;
    }

    if (!isLike) {
      // 좋아요 상태가 아닐경우 해당 게시물 좋아요 수를 1 늘림
      setLikeCount((prev) => (prev as number) + 1);
      // 좋아요 추가 api 비동기 처리
      dispatch(thuckFetchAddPostLike(id));
    } else {
      // 좋아요 상태가 아닐경우 해당 게시물 좋아요 수를 1 줄임
      setLikeCount((prev) => (prev as number) - 1);
      // 좋아요 제거 api 비동기 처리
      dispatch(thuckFetchRemovePostLike(id));
    }
    // 좋아요 유무 변경
    setIsLike(!isLike);
  };

  const onClickStoredMap = async (postData: IPostData) => {
    if (!postData || !userProfile.storedMapList) return;

    if (!isStoredMap) {
      // 지도 추가 api 비동기 처리
      dispatch(thuckFetchAddPostMap(postData));
      sweetToast("나의 맛집 지도에 맛집이 추가 되었습니다", "success");
    } else {
      // 지도 제거 api 비동기 처리
      dispatch(thuckFetchRemovePostMap(postData));
      sweetToast("나의 맛집 지도에 맛집이 삭제 되었습니다", "success");
    }
    if (postData.mapData) {
      onChangeStoredMapList(postData.mapData);
    }
    // 지도 추가 유무 변경
    setIsStoredMap(!isStoredMap);
  };

  // userProfile의 likeList 데이터를 이용하여 게시물의 좋아요 유무를 판별
  useEffect(() => {
    if (userProfile?.likeList && data.id) {
      setIsLike(userProfile.likeList.includes(data.id));
    }
  }, [userProfile, data]);

  useEffect(() => {
    setLikeCount(data.likeCount || 0);
  }, [data]);

  const formattedDate = useMemo(() => {
    if (data.createdAt?.seconds) {
      return setDateFormat(data.createdAt?.seconds * 1000);
    }
  }, [data.createdAt?.seconds]);

  useEffect(() => {
    // 좌표 값이 일치확인
    if (userProfile?.storedMapList && data.mapData) {
      userProfile.storedMapList.forEach((item) => {
        if (
          item.mapx === data.mapData?.mapx &&
          item.mapy === data.mapData?.mapy
        ) {
          setIsStoredMap(true);
          return;
        } else {
          setIsStoredMap(false);
        }
      });
    }
  }, [userProfile]);

  return (
    <PostItemUI
      data={data}
      userProfile={userProfile}
      isLike={isLike}
      likeCount={likeCount}
      onClickLike={onClickLike}
      isStoredMap={isStoredMap}
      onClickStoredMap={onClickStoredMap}
      formattedDate={formattedDate}
      onChangePostType={onChangePostType}
      postType={postType}
      onClickMoreText={onClickMoreText}
      contentTextRef={contentTextRef}
      isShowMoreTextBtn={isShowMoreTextBtn}
    />
  );
}
