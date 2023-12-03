import React from "react";
import Header from "../../component/commons/layouts/header/Header";
import SearchModal from "./MapSearchModal/SearchModal";
import Loading from "../../component/commons/loading/Loading";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";
import { usePostUpload } from "../../hook/logic/postUpload/usePostUpload";
import { HiddenUploadBtn, Wrapper } from "./postUpload.styles";
import PostUploadImg from "./PostUploadImg";
import PostUploadContent from "./PostUploadContent";
import PostUploadRating from "./PostUploadRating";
import { PostUploadMap } from "./PostUploadMap";
import { usePostUploadImg } from "../../hook/logic/postUpload/usePostUploadImg";
import { usePostUploadContent } from "../../hook/logic/postUpload/usePostUploadContent";
import { usePostUploadRating } from "../../hook/logic/postUpload/usePostUploadRating";
import { usePostUploadMap } from "../../hook/logic/postUpload/usePostUploadMap";
interface IProps {
  isEdit: boolean;
}

export default function PostUpload({ isEdit }: IProps) {
  // post upload 제어 관련 로직 customhook
  const {
    post,
    onSubmitUpload,
    searchSelectedMap,
    textareaRef,
    uploadPostLoading,
    isDisabled,
    loadPostLoading,
    invalidUpdatePage
  } = usePostUpload({ isEdit });

  // post upload map 관련 로직 customhook
  const { selectedMap, isOpenSearchMapModal, openSearchModal } =
    usePostUploadMap({ isEdit, post });

  // post upload rating 관련 로직 customhook
  const { ratingValue, setRatingValue } = usePostUploadRating({ isEdit, post });

  // post upload content 관련 로직 customhook
  const { contentValue, onChangeContentValue } = usePostUploadContent({
    isEdit,
    post,
    textareaRef
  });

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

  if (loadPostLoading) {
    return <Loading />;
  }

  if (invalidUpdatePage) {
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
        onSubmit={() =>
          onSubmitUpload(
            contentValue,
            ratingValue,
            selectedMap,
            updateImgURL,
            updateImgName,
            imgFile
          )
        }
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
