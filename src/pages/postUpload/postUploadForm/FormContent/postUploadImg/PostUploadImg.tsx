import React from "react";
import ScrollLoading from "../../../../../component/commons/loading/ScrollLoading";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
  ImgUploadInput,
  Img,
  ImgItem,
  ImgList,
  ImgSection,
  ImgTitle,
  ImgUploadBtn,
  RemoveImgBtn
} from "../../../postUpload.styles";
import { usePostUploadImg } from "../../../../../hook/logic/postUpload/usePostUploadImg";
import { useFormContext } from "react-hook-form";
import { IPostData } from "../../../../../api/apiType";

interface IProps {
  isEdit: boolean;
  post: IPostData | undefined;
}

export default function PostUploadImg({ isEdit, post }: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );

  const {
    preview,
    isImgLoading,
    uploadInputRef,
    imgListRef,
    onChangeImg,
    clickUploadImgInputHandler,
    removeImgHandler
  } = usePostUploadImg({ isEdit, post });

  const { register } = useFormContext();
  const { ref, ...rest } = register("img", { onChange: onChangeImg });

  return (
    <ImgSection>
      <ImgTitle>이미지( 최대 5개 )</ImgTitle>
      <ImgUploadBtn
        type='button'
        aria-label='이미지 업로드'
        onClick={clickUploadImgInputHandler}
        $isWebpSupported={isWebpSupported}
      >
        이미지 업로드
      </ImgUploadBtn>
      {isImgLoading ? (
        <ScrollLoading />
      ) : (
        <ImgList ref={imgListRef}>
          {preview.map((item, idx) => {
            return (
              <ImgItem key={item}>
                <Img src={item} alt='업로드 이미지' />
                <RemoveImgBtn
                  type='button'
                  onClick={() => removeImgHandler(idx)}
                  $isWebpSupported={isWebpSupported}
                />
              </ImgItem>
            );
          })}
        </ImgList>
      )}

      <ImgUploadInput
        type='file'
        accept='.jpg, .jpeg, .png, .bmp'
        className='a11y-hidden'
        {...rest}
        ref={(e) => {
          ref(e);
          uploadInputRef.current = e;
        }}
      />
      <input type='hidden' {...register("imgName")} />
      <input type='hidden' {...register("imgURL")} />
    </ImgSection>
  );
}
