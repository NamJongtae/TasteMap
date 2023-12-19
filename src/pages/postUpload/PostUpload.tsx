import React from "react";
import Header from "../../component/commons/layouts/header/Header";
import SearchModal from "../../component/commons/searchMapModal/SearchMapModal";
import Loading from "../../component/commons/loading/Loading";
import InvalidPage from "../../component/commons/invalidPage/InvalidPage";
import { useLoadPostData } from "../../hook/logic/postUpload/useLoadPostData";
import PostUploadForm from "./postUploadForm/PostUploadForm";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
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

  const isOpenSearchMapModal = useSelector(
    (state: RootState) => state.search.isOpenSearchMapModal
  );

  if (loadPostLoading) {
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
      <PostUploadForm post={post} isEdit={isEdit} />
      {isOpenSearchMapModal && <SearchModal isTasteMapPage={false} />}
    </>
  );
}
