import { useCallback, useEffect, useRef, useState } from "react";
import { sweetToast } from "../../../library/sweetAlert/sweetAlert";
import { imgValidation } from "../../../library/imageValidation";
import { isMobile } from "react-device-detect";
import { getCompressionImg } from "../../../library/imageCompression";
import { useFormContext } from "react-hook-form";
import { IPostData } from "../../../api/apiType";

interface IPrpos {
  isEdit: boolean;
  post: IPostData | undefined;
}

export const usePostUploadImg = ({ isEdit, post }: IPrpos) => {
  const [preview, setPreview] = useState<string[]>([]);
  const [isImgLoading, setIsImgLoading] = useState(false);

  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgListRef = useRef<HTMLUListElement>(null);

  const { getValues, setValue } = useFormContext();
  const currentImgList = getValues("img");
  const currentImgName = getValues("imgName");
  const currentImgURL = getValues("imgURL");

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

      setValue("img", [...currentImgList, compressdImg.compressedFile], {
        shouldDirty: true
      });
      // 이미지 업로드 후 업로드한 이미지가 보이도록 스크롤을 맨 아래로 내림
      if (wrapperRef.current)
        scrollTo({ top: wrapperRef.current.scrollHeight });
    },
    [preview, isMobile]
  );

  /**
   * 이미지 업로드 input 클릭 */
  const clickUploadImgInputHandler = useCallback(() => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  }, []);

  /**
   * 이미지 삭제 함수
   * 인자값으로 index를 받아 해당 index에 해당하는 imgFile, preview 제거 */
  const removeImgHandler = useCallback((idx: number) => {
    if (uploadInputRef.current) {
      uploadInputRef.current.value = "";
    }
    setPreview((prev) => prev.filter((_, itemIdx) => itemIdx != idx));

    setValue(
      "img",
      currentImgList.filter((_: string, itemIdx: number) => itemIdx != idx),
      {
        shouldDirty: true
      }
    );

    setValue(
      "imgName",
      currentImgName.filter((_: string, itemIdx: number) => itemIdx != idx)
    );

    setValue(
      "imgURL",
      currentImgURL.filter((_: string, itemIdx: number) => itemIdx != idx)
    );
  }, []);

  /**
   * 이미지 추가 시 맨 마지막 이미지로 스크롤 이동 */
  const imgListScrollHandler = () => {
    if (imgListRef.current) {
      imgListRef.current.scrollLeft =
        imgListRef.current.clientWidth * preview.length;
    }
  };

  /**
   * 게시물 수정시 기존 초기값 설정 */
  const setUpdateInitalValue = useCallback(() => {
    if (isEdit && post?.imgURL && post?.imgName) {
      setPreview(post.imgURL);
      setValue(
        "img",
        post.imgURL.map(() => ({}) as File)
      );
      setValue("imgName", post.imgName);
      setValue("imgURL", post.imgURL);
    }
  }, [isEdit, post, setValue]);

  useEffect(() => {
    setUpdateInitalValue();
  }, []);

  useEffect(() => {
    imgListScrollHandler();
  }, [preview]);

  return {
    preview,
    setPreview,
    isImgLoading,
    uploadInputRef,
    imgListRef,
    wrapperRef,
    onChangeImg,
    clickUploadImgInputHandler,
    removeImgHandler
  };
};
