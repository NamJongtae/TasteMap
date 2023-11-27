import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getCompressionImg } from "../../library/imageCompression";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";
import {
  IPostUpdateData,
  IPostData,
  IPostUploadData
} from "../../api/apiType";
import { Timestamp } from "firebase/firestore";
import { postSlice } from "../../slice/postSlice";
import { imgValidation } from "../../library/imageValidation";
import { isMobile } from "react-device-detect";
import PostUploadUI from "./PostUpload.presenter";
import { useNavigate, useParams } from "react-router-dom";
import { usePostUploadMutation } from "../../hook/query/post/usePostUploadMutation";
import { usePostUpdateMutation } from "../../hook/query/post/usePostUpdateMutation";
import { useLoadPostQuery } from "../../hook/query/post/useLoadPostQuery";
import { useQueryClient } from "@tanstack/react-query";

interface IProps {
  isEdit: boolean;
}

export default function PostUpload({ isEdit }: IProps) {
  const { postId } = useParams();
  const navigate = useNavigate();
  // 작성자의 프로필을 넣기위해 myInfo를 가져옴
  const myInfo = useSelector((state: RootState) => state.user.myInfo);
  // 맛집 검색으로 선택된 맛집 데이터를 가져옴
  const selectedMapData = useSelector(
    (state: RootState) => state.post.seletedMapData
  );
  const dispatch = useDispatch<AppDispatch>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [editImgName, setEditImgName] = useState<string[]>([]);
  const [editImgURL, setEditImgURL] = useState<string[]>([]);
  // 검색 모달창 오픈 여부
  const [isOpenModal, setIsOpenModal] = useState(false);
  // 업로드할 이미지 파일
  const [imgFile, setImgFile] = useState<File[]>([]);
  // 업로드할 이미지 미리보기
  const [preview, setPreview] = useState<string[]>([]);
  // 게시물 내용
  const [contentValue, setContentValue] = useState("");
  // 이미지 업로드 input button으로 custom하여 사용하기 위해 감춤
  const hiddenUploadBtnRef = useRef<HTMLInputElement>(null);
  // 이미지 업로드 페이지 wrapper
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgListRef = useRef<HTMLUListElement>(null);
  // 별점
  const [ratingValue, setRatingValue] = useState(0);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const { mutate, isPending } = usePostUploadMutation();

  const { mutate: updatePostMutate, isPending: updatePostIsPending } =
    usePostUpdateMutation();

  let post = {} as IPostData;
  let postIsPending = false;
  let postIsFetching = false;
  const queryClient = useQueryClient();

  if (isEdit && postId) {
    const { data, isPending, isFetching, isError, error } =
      useLoadPostQuery(postId);
    post = data || ({} as IPostData);
    postIsPending = isPending;
    postIsFetching = isFetching;
    if (isError) {
      if (error?.message !== "존재하지 않는 게시물입니다.") {
        sweetToast(
          "알 수 없는 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.",
          "warning"
        );
        console.error(error);
        navigate("/");
      }
    }

    queryClient.removeQueries({ queryKey: ["post"] });
  }

  /**
   * 검색 모달창 열기 */
  const openSearchModal = useCallback(() => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  }, []);

  /**
   * 검색 모달창 닫기 */
  const closeSearchModal = useCallback(() => {
    // 빈 히스토리를 없애기 위해 뒤로가기
    setIsOpenModal(false);
    document.body.style.overflow = "auto";
  }, []);

  /**
   * 이미지 업로드 input 클릭 */
  const onClickUploadImg = useCallback(() => {
    if (hiddenUploadBtnRef.current) {
      hiddenUploadBtnRef.current.click();
    }
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight - 30 + "px";
    }
  }, []);

  /**
   * 게시물 작성 내용 chage 함수 */
  const onChangeContentValue = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleResizeHeight();
      if (e.target.value.length === 1 && e.target.value === " ") return;
      setContentValue(e.target.value);
    },
    []
  );

  /**
   * 이미지 chage 함수 */
  const onChangeImg = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      // 이미지가 존재하지 않을 시 return
      if (!e.target.files || !e.target.files[0]) return;
      // 이미지가 5개를 이상이면 return
      if (preview.length >= 5) {
        sweetToast("최대 5개의 이미지까지 업로드 가능합니다.", "warning");
        return;
      }
      const file = e.target.files[0];
      // 이미지 형식 유효성 검사
      const isValidImg = imgValidation(file);
      // 유요하지 않은 이미지 형식이라면 return
      if (!isValidImg) {
        e.target.value = "";
        return;
      }
      // 모바일의 경우 이미지 미리보기 업로드 속도가 느려 로딩창 활성화
      if (isMobile) {
        setIsImgLoading(true);
      }
      // 이미지 압축
      const compressdImg = (await getCompressionImg(file, "post")) as {
        compressedFile: File;
        compressedPreview: string;
      };
      // 로딩창 비활성화
      if (isMobile) {
        setIsImgLoading(false);
      }
      // 이미지 타입이 undefined일 때 예외처리
      if (!compressdImg?.compressedFile || !compressdImg?.compressedPreview)
        return;
      // 이미 업로드한 파일이라면 경고창 출력 후 return
      if (preview.includes(compressdImg.compressedPreview)) {
        sweetToast("이미 업로드한 이미지 입니다.", "warning");
        return;
      }
      // imgFile, preview 배열에 업로드한 이미지 추가
      setPreview((prev) => [...prev, compressdImg.compressedPreview]);
      setImgFile((prev) => [...prev, compressdImg.compressedFile]);
      // 이미지 업로드 후 업로드한 이미지가 보이도록 스크롤을 맨 아래로 내림
      if (wrapperRef.current)
        scrollTo({ top: wrapperRef.current.scrollHeight });
    },
    [preview, isMobile]
  );

  /**
   * 이미지 삭제 함수
   * 인자값으로 index를 받아 해당 index에 해당하는 imgFile, preview 제거 */
  const onClickRemoveImg = useCallback((idx: number) => {
    if (hiddenUploadBtnRef.current) {
      hiddenUploadBtnRef.current.value = "";
    }
    setPreview((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setImgFile((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setEditImgURL((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setEditImgName((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
  }, []);

  /**
   * 게시물 업로드 함수 */
  const onSubmitUpload = useCallback(async () => {
    // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
    if (!contentValue || !selectedMapData.length) return;
    if (isEdit) {
      const editPostData: IPostUpdateData = {
        id: post.id,
        content: contentValue,
        rating: ratingValue,
        mapData: selectedMapData[0],
        imgURL: editImgURL || [],
        imgName: editImgName || [],
        img: imgFile
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
        content: contentValue,
        img: imgFile,
        uid: myInfo.uid,
        createdAt: Timestamp.fromDate(new Date()),
        likeCount: 0,
        commentCount: 0,
        reportCount: 0,
        reportUidList: [],
        mapData: selectedMapData[0],
        isBlock: false,
        imgName: [],
        imgURL: [],
        rating: ratingValue
      };

      mutate(uploadData);
    }
  }, [post, contentValue, selectedMapData, isEdit, imgFile, ratingValue]);

  useEffect(() => {
    if (imgListRef.current && post.imgURL !== preview) {
      imgListRef.current.scrollLeft =
        imgListRef.current.clientWidth * preview.length;
    }
  }, [preview]);

  useEffect(() => {
    if (isEdit) {
      if (post.uid && post.uid !== myInfo.uid) {
        sweetToast("다른 사용자의 게시물은 수정할 수 없습니다!", "warning");
        navigate("/", { replace: true });
      }
    }
  }, [post]);

  useEffect(() => {
    return () => {
      dispatch(postSlice.actions.setPost([]));
    };
  }, []);

  useEffect(() => {
    if (isEdit && post.imgURL && post.content && post.rating && post.imgName) {
      setPreview(post.imgURL);
      setContentValue(post.content);
      setRatingValue(post.rating);
      setImgFile(post.imgURL.map(() => ({}) as File));
      setEditImgName(post.imgName);
      setEditImgURL(post.imgURL);
      dispatch(postSlice.actions.setSelectedMapData(post.mapData));
    }
  }, [post]);

  useEffect(() => {
    handleResizeHeight();
  }, [contentValue]);

  useEffect(() => {
    return () => {
      dispatch(postSlice.actions.resetSelectedMapData());
    };
  }, []);

  return (
    <PostUploadUI
      post={post}
      contentValue={contentValue}
      selectedMapData={selectedMapData}
      ratingValue={ratingValue}
      onSubmitUpload={onSubmitUpload}
      wrapperRef={wrapperRef}
      imgListRef={imgListRef}
      myInfo={myInfo}
      openSearchModal={openSearchModal}
      setRatingValue={setRatingValue}
      textareaRef={textareaRef}
      handleResizeHeight={handleResizeHeight}
      onChangeContentValue={onChangeContentValue}
      preview={preview}
      onClickRemoveImg={onClickRemoveImg}
      onChangeImg={onChangeImg}
      hiddenUploadBtnRef={hiddenUploadBtnRef}
      onClickUploadImg={onClickUploadImg}
      closeSearchModal={closeSearchModal}
      isOpenModal={isOpenModal}
      uploadPostLoading={isPending || updatePostIsPending}
      loadPostLoading={postIsPending || postIsFetching}
      isImgLoading={isImgLoading}
      isEdit={isEdit}
      invalidPage={!post.id && !postIsPending}
    />
  );
}
