import React from "react";

import Kakaomap from "../../../kakaomap/Kakaomap";
import ImgSlider from "../../../imgSlider/ImgSlider";
import { usePostTasteMap } from "../../../../../hook/logic/post/postItem/usePostTasteMap";
import { usePostMoreTextBtn } from "../../../../../hook/logic/post/postItem/usePostMoreTextBtn";
import { IMyProfileData, IPostData } from "../../../../../api/apiType";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import {
  ContentText,
  ContentTextLine,
  ContentWrapper,
  KakaoMapWrapper,
  MoreContentBtn,
  StoredMapBtn
} from "../../postList/post.styles";

interface IProps {
  contentType: "MAP" | "IMAGE";
  data: IPostData;
  myProfile: IMyProfileData;
}

export default function ContentSection({
  contentType,
  data,
  myProfile
}: IProps) {
  const isWebpSupported = useSelector(
    (state: RootState) => state.setting.isWebpSupported
  );
  const { isStoredMap, toggleTasteMapHandler } = usePostTasteMap({
    data,
    myProfile
  });

  const { isShowMoreTextBtn, contentTextRef, openMoreTextHandler } =
    usePostMoreTextBtn();

  return (
    <ContentWrapper>
      <h3 className='a11y-hidden'>내용</h3>
      <ContentText ref={contentTextRef}>{data.content}</ContentText>
      {isShowMoreTextBtn && (
        <>
          <ContentTextLine />
          <MoreContentBtn
            type='button'
            onClick={openMoreTextHandler}
            aria-label='더보기'
            $isWebpSupported={isWebpSupported}
          >
            더보기
          </MoreContentBtn>
        </>
      )}

      <KakaoMapWrapper contentType={contentType}>
        {contentType === "MAP" && (
          <StoredMapBtn
            type='button'
            aria-label={isStoredMap ? "맛집 삭제" : "맛집 추가"}
            storedMap={isStoredMap}
            onClick={() => toggleTasteMapHandler(data)}
            title={isStoredMap ? "맛집 삭제" : "맛집 추가"}
            $isWebpSupported={isWebpSupported}
          />
        )}
        <h3 className='a11y-hidden'>
          {contentType === "MAP" ? "지도" : "이미지"}
        </h3>
        {contentType === "MAP"
          ? data.mapData?.mapx && (
              <Kakaomap
                items={[{ ...data.mapData }]}
                isTasteMapPage={false}
                isSharePage={false}
              />
            )
          : data.imgURL &&
            data.imgURL.length > 0 && <ImgSlider imgArray={data.imgURL} />}
      </KakaoMapWrapper>
    </ContentWrapper>
  );
}
