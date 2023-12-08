import React from "react";
import Header from "../../component/commons/layouts/header/Header";
import SearchModal from "../../component/commons/searchMapModal/SearchMapModal";
import Loading from "../../component/commons/loading/Loading";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";
import { HiddenUploadBtn, Wrapper } from "./postUpload.styles";
import PostUploadImg from "./postUploadImg/PostUploadImg";
import PostUploadContent from "./postUploadContent/PostUploadContent";
import PostUploadRating from "./postUploadRating/PostUploadRating";
import { PostUploadMap } from "./postUploadMap/PostUploadMap";
import { usePostUploadImg } from "../../hook/logic/postUpload/usePostUploadImg";
import { usePostUploadContent } from "../../hook/logic/postUpload/usePostUploadContent";
import { usePostUploadRating } from "../../hook/logic/postUpload/usePostUploadRating";
import { usePostUploadMap } from "../../hook/logic/postUpload/usePostUploadMap";
import { usePostUpdateDataFetch } from "../../hook/logic/postUpload/usePostUpdateDataFetch";
import { usePostUploadDataFetch } from "../../hook/logic/postUpload/usePostUploadDataFetch";
import { useSubmitBtnController } from "../../hook/logic/postUpload/useSubmitBtnController";
import { useLoadPostData } from "../../hook/logic/postUpload/useLoadPostData";
import { useUnMountResetMap } from "../../hook/logic/postUpload/useUnMountResetMap";
interface IProps {
  isEdit: boolean;
}

// 컴포넌트를 재활용하여 PostUpdate 페이지에 사용
// isEdit props를 통해 update, upload 로직 구분
export default function PostUpload({ isEdit }: IProps) {
  // 수정 페이지 일때 post Data 가져오기
  const { post, loadPostLoading, invalidPostData } = useLoadPostData({
    isEdit
  });

  // post upload map 관련 로직 customhook
  const { searchSelectedMap, isOpenSearchMapModal, openSearchModal } =
    usePostUploadMap({ isEdit, post });

  // post upload rating 관련 로직 customhook
  const { ratingValue, setRatingValue } = usePostUploadRating({ isEdit, post });

  // post upload content 관련 로직 customhook
  const { textareaRef, contentValue, onChangeContentValue } =
    usePostUploadContent({
      isEdit,
      post
    });

  // postUpdate 데이터 처리
  const { postUpdateHandler, updatePostLoading } = usePostUpdateDataFetch({
    post
  });

  // postUpload 데이터 처리
  const { postUploadHandler, uploadPostLoading } = usePostUploadDataFetch();

  // 업로드 버튼 제어
  const { isDisabled } = useSubmitBtnController({ isEdit, post });

  // post upload img 관련 로직 customhook
  const {
    imgFile,
    preview,
    updateImgName,
    updateImgURL,
    isImgLoading,
    hiddenUploadBtnRef,
    imgListRef,
    wrapperRef,
    onChangeImg,
    onClickUploadImg,
    onClickRemoveImg
  } = usePostUploadImg({ isEdit, post });

  // clean-up map data 초기화
  useUnMountResetMap();

  if (loadPostLoading || updatePostLoading) {
    return <Loading />;
  }

  if (invalidPostData) {
    return (
      <>
        <Header type='upload' btnText='수정' disabled={true} />
        <InvalidPage text='유효하지 않은 게시물입니다.' />
      </>
    );
  }

  return (
    <>
      <Header
        type='upload'
        btnText={isEdit ? "수정" : "업로드"}
        disabled={isDisabled(contentValue, preview, ratingValue)}
        onSubmit={() => {
          isEdit
            ? postUpdateHandler(
                contentValue,
                ratingValue,
                searchSelectedMap,
                updateImgURL,
                updateImgName,
                imgFile
              )
            : postUploadHandler(
                contentValue,
                ratingValue,
                searchSelectedMap,
                imgFile
              );
        }}
      />
      <Wrapper ref={wrapperRef}>
        <h2 className='a11y-hidden'>
          {isEdit ? "게시물 수정" : "게시물 작성"}
        </h2>

        <PostUploadMap
          openSearchModal={openSearchModal}
          searchSelectedMap={searchSelectedMap}
        />

        <PostUploadRating
          ratingValue={ratingValue}
          setRatingValue={setRatingValue}
        />

        <PostUploadContent
          textareaRef={textareaRef}
          contentValue={contentValue}
          onChangeContentValue={onChangeContentValue}
        />

        <PostUploadImg
          onClickUploadImg={onClickUploadImg}
          isImgLoading={isImgLoading}
          imgListRef={imgListRef}
          preview={preview}
          onClickRemoveImg={onClickRemoveImg}
        />
      </Wrapper>

      <HiddenUploadBtn
        type='file'
        accept='.jpg, .jpeg, .png, .bmp'
        className='a11y-hidden'
        onChange={onChangeImg}
        ref={hiddenUploadBtnRef}
      />
      {isOpenSearchMapModal && <SearchModal isTasteMapPage={false} />}
      {uploadPostLoading && <Loading />}
    </>
  );
}
