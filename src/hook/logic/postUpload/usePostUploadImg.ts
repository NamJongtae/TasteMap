import { useCallback, useEffect, useRef, useState } from "react";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { imgValidation } from "../../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { getCompressionImg } from "../../../library/imageCompression";
import { IPostData } from "../../../api/apiType";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}
export const usePostUploadImg = ({ isEdit, post }: IProps) => {
  // 업로드할 이미지 파일
  const [imgFile, setImgFile] = useState<File[]>([]);
  // 업로드할 이미지 미리보기
  const [preview, setPreview] = useState<string[]>([]);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const [updateImgName, setUpdateImgName] = useState<string[]>([]);
  const [updateImgURL, setUpdateImgURL] = useState<string[]>([]);
  // 이미지 업로드 input button으로 custom하여 사용하기 위해 감춤
  const hiddenUploadBtnRef = useRef<HTMLInputElement>(null);
  // 이미지 업로드 페이지 wrapper
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgListRef = useRef<HTMLUListElement>(null);

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
   * 이미지 업로드 input 클릭 */
  const onClickUploadImg = useCallback(() => {
    if (hiddenUploadBtnRef.current) {
      hiddenUploadBtnRef.current.click();
    }
  }, []);

  /**
   * 이미지 삭제 함수
   * 인자값으로 index를 받아 해당 index에 해당하는 imgFile, preview 제거 */
  const onClickRemoveImg = useCallback((idx: number) => {
    if (hiddenUploadBtnRef.current) {
      hiddenUploadBtnRef.current.value = "";
    }
    setPreview((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setImgFile((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setUpdateImgURL((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
    setUpdateImgName((prev) => prev.filter((_, itemIdx) => itemIdx != idx));
  }, []);

  /**
   * 이미지 추가 시 맨 마지막 이미지로 스크롤 이동 */
  const handleImgListScroll = () => {
    if (imgListRef.current && post?.imgURL !== preview) {
      imgListRef.current.scrollLeft =
        imgListRef.current.clientWidth * preview.length;
    }
  };

  /**
   * 게시물 수정시 기존 초기값 설정 */
  const setUpdateInitalValue = () => {
    if (isEdit && post?.imgURL && post?.imgName) {
      setPreview(post.imgURL);
      setImgFile(post.imgURL.map(() => ({}) as File));
      setUpdateImgName(post.imgName);
      setUpdateImgURL(post.imgURL);
    }
  };

  useEffect(() => {
    handleImgListScroll();
  }, [preview]);

  useEffect(() => {
    setUpdateInitalValue();
  }, [post]);

  return {
    imgFile,
    setImgFile,
    preview,
    setPreview,
    updateImgName,
    setUpdateImgName,
    updateImgURL,
    setUpdateImgURL,
    isImgLoading,
    hiddenUploadBtnRef,
    imgListRef,
    wrapperRef,
    onChangeImg,
    onClickUploadImg,
    onClickRemoveImg,
    handleImgListScroll
  };
};
