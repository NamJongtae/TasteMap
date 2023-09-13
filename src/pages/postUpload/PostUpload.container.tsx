import React, { useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getCompressionImg } from "../../library/imageCompression";
import { sweetToast } from "../../library/sweetAlert/sweetAlert";
import { IPostUploadData } from "../../api/apiType";
import { Timestamp } from "firebase/firestore";
import { postSlice, thunkFetchUploadPost } from "../../slice/postSlice";
import { imgValidation } from "../../library/imageValidation";
import { isMobile } from "react-device-detect";
import PostUploadUI from "./PostUpload.presenter";

export default function PostUpload() {
  // 작성자의 프로필을 넣기위해 userData를 가져옴
  const userData = useSelector((state: RootState) => state.user.data);
  // 맛집 검색으로 선택된 맛집 데이터를 가져옴
  const selectedMapData = useSelector(
    (state: RootState) => state.post.seletedMapData
  );
  const isLoading = useSelector((state: RootState) => state.post.isLoading);
  const dispatch = useDispatch<AppDispatch>();
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
  // 별점
  const [ratingValue, setRatingValue] = useState(0);
  /**
   * 검색 모달창 열기 */
  const openSearchModal = () => {
    setIsOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  /**
   * 검색 모달창 닫기 */
  const closeSearchModal = () => {
    setIsOpenModal(false);
    document.body.style.overflow = "auto";
  };

  /**
   * 이미지 업로드 input 클릭 */
  const onClickUploadImg = () => {
    if (hiddenUploadBtnRef.current) {
      hiddenUploadBtnRef.current.click();
    }
  };

  /**
   * 게시물 작성 내용 chage 함수 */
  const onChangeContentValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 1 && e.target.value === " ") return;
    setContentValue(e.target.value);
  };

  /**
   * 이미지 chage 함수 */
  const onChangeImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 이미지가 존재하지 않을 시 return
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    // 이미지 형식 유효성 검사
    const isValidImg = imgValidation(file);
    // 유요하지 않은 이미지 형식이라면 return
    if (!isValidImg) {
      e.target.value = "";
      return;
    }
    // 모바일의 경우 이미지 미리보기 업로드 속도가 느려 로딩창 활성화
    isMobile && dispatch(postSlice.actions.setIsLoading(true));
    // 이미지 압축
    const compressdImg = (await getCompressionImg(file, "post")) as {
      compressedFile: File;
      compressedPreview: string;
    };
    // 로딩창 비활성화
    isMobile && dispatch(postSlice.actions.setIsLoading(false));
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
    if (wrapperRef.current) scrollTo({ top: wrapperRef.current.scrollHeight });
  };

  /**
   * 이미지 삭제 함수
   * 인자값으로 index를 받아 해당 index에 해당하는 imgFile, preview 제거 */
  const onClickRemoveImg = (idx: number) => {
    if (hiddenUploadBtnRef.current) {
      hiddenUploadBtnRef.current.value = "";
    }
    setPreview((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setImgFile((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
  };

  /**
   * 게시물 업로드 함수 */
  const onSubmitUpload = async () => {
    // 내용이 비었거나 맛집을 선택하지 않았을 경우 return
    if (!contentValue || !selectedMapData.length) return;
    // 서버로 보낼 postData 정의
    const postData: IPostUploadData = {
      id: uuid(),
      content: contentValue,
      img: imgFile,
      uid: userData.uid || "",
      createdAt: Timestamp.fromDate(new Date()),
      likeCount: 0,
      commentCount: 0,
      reportCount: 0,
      mapData: selectedMapData[0],
      isBlock: false,
      imgName: [],
      imgURL: [],
      rating: ratingValue
    };
    // redux thuck를 이용하여 비동기 처리 서버로 데이터 전송
    dispatch(thunkFetchUploadPost(postData));
  };

  return (
    <PostUploadUI
      contentValue={contentValue}
      selectedMapData={selectedMapData}
      ratingValue={ratingValue}
      onSubmitUpload={onSubmitUpload}
      wrapperRef={wrapperRef}
      userData={userData}
      openSearchModal={openSearchModal}
      setRatingValue={setRatingValue}
      onChangeContentValue={onChangeContentValue}
      preview={preview}
      onClickRemoveImg={onClickRemoveImg}
      onChangeImg={onChangeImg}
      hiddenUploadBtnRef={hiddenUploadBtnRef}
      onClickUploadImg={onClickUploadImg}
      closeSearchModal={closeSearchModal}
      isOpenModal={isOpenModal}
      isLoading={isLoading}
    />
  );
}
