import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { EMapContentType } from "../../../slice/tasteMapSlice";

// -----------------TasteMap style-----------------

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

// -----------------TasteMapTitle style-----------------

export const ShareTasteMapTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 10px;
  @media screen and (max-width: 468px) {
    justify-content: left;
    margin-left: 20px;
  }
`;

export const ShareTasteMapTitleImg = styled.img`
  margin-right: 5px;
  width: 25px;
`;

// -----------------TasteMapBtns style-----------------

export const BtnsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  width: calc(100% - 20px);
  max-width: 500px;
  margin: 0 auto;
`;

// -----------------MapContentTypeBtns style-----------------

export const MapBtn = styled.button`
  position: absolute;
  top: ${(props: { isSharePage: boolean; contentType: EMapContentType }) =>
    props.isSharePage ? "-30px" : "3px"};
  right: 50px;
  padding: 3px 6px;
  border: 1px solid #bdbdbd;
  border-right: none;
  border-radius: 5px 0 0 5px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s;
  color: ${(props: { isSharePage: boolean; contentType: EMapContentType }) =>
    props.contentType === EMapContentType.MAP ? "#fff" : "none"};
  background-color: ${(props: { contentType: EMapContentType }) =>
    props.contentType === EMapContentType.MAP ? "#208AFA" : "none"};
`;

export const ListBtn = styled.button`
  position: absolute;
  top: ${(props: { isSharePage: boolean; contentType: EMapContentType }) =>
    props.isSharePage ? "-30px" : "3px"};
  right: 15px;
  padding: 3px 6px;
  border: 1px solid #bdbdbd;
  border-left: none;
  border-radius: 0 5px 5px 0;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s;
  color: ${(props: { isSharePage: boolean; contentType: EMapContentType }) =>
    props.contentType === EMapContentType.LIST ? "#fff" : "none"};
  background-color: ${(props: { contentType: EMapContentType }) =>
    props.contentType === EMapContentType.LIST ? "#208AFA" : "none"};
`;

// -----------------OpenSearchMapModalBtn style-----------------

export const OpenModalBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-search.webp"
        : "/assets/icon-search.svg"
    }) no-repeat center right 7px / 16px gold`};
  border-radius: 5px;
  padding: 8px 30px 8px 14px;
  margin-bottom: 20px;
`;

// -----------------ShareTasteMapBtn style-----------------

export const ShareBtn = styled.button`
  width: 35px;
  height: 35px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-share.webp"
        : "/assets/icon-share.svg"
    }) no-repeat center #f0f0f0`};
  border-radius: 5px;
  margin-bottom: 20px;
`;

// -----------------KakaomapSection style-----------------

export const KakaomapWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const MapDesc = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: #208afa;
`;

// -----------------MapTypeMarkerData style-----------------

export const MarkerDataList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 500px;
`;

export const MapTypeMarkerDataUl = styled(MarkerDataList)`
  position: relative;
  margin-top: 20px;
  border: 1px solid #bdbdbd;
  padding: 10px 50px 10px 20px;
  margin: 20px auto 0 auto;
  display: flex;
`;

export const MarkerDataItem = styled.li`
  font-size: 12px;
  word-break: break-all;
  padding-left: 55px;
  text-indent: -60px;
`;

export const MarkerDataText = styled.p`
  display: inline;
  margin-left: 5px;
`;

export const MarkerDataLink = styled(Link)`
  display: inline;
  margin-left: 5px;
  color: blue;
  text-decoration: underline;
`;

export const MarkerDataTag = styled.span`
  display: inline-block;
  width: 55px;
  padding: 3px 0;
  text-align: center;
  border: 1px solid #000;
  border-radius: 5px;
  font-size: 10px;
  font-weight: bold;
  padding-left: 0px;
  text-indent: 0px;
`;

// -----------------ListTypeMarkerData style-----------------

export const NoDataWrapper = styled.div`
  position: relative;
  height: 165px;
  max-width: 500px;
  margin: ${(props: { isSharePage: boolean }) =>
    props.isSharePage ? "20px auto 0 auto" : "0 auto"};
  border: 1px solid #bdbdbd;
`;

export const ListTypeMarkDataUl = styled.ul`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #bdbdbd;
  margin-top: ${(props: { isSharePage: boolean }) =>
    props.isSharePage ? "20px" : "0px"};
  max-height: 500px;
  overflow-y: scroll;
`;

// -----------------ListTypeMarkerDataItem style-----------------

export const ListTypeMarkDataLi = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 60px 10px 20px;
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const BtnWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media screen and (max-width: 468px) {
    right: 10px;
  }
`;

export const FocusMapBtn = styled.button`
  background: none;
  color: coral;
  font-size: 13px;
  border: 1px solid #bdbdbd;
  padding: 3px 5px 4px 5px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-thumbnailMapBtn.webp"
        : "/assets/icon-thumbnailMapBtn.svg"
    }) no-repeat center / 18px`};

  :hover {
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      isMobile
        ? ""
        : `url(${
            props.$isWebpSupported
              ? "/assets/webp/icon-thumbnailMapBtnActive.webp"
              : "/assets/icon-thumbnailMapBtnActive.svg"
          }) no-repeat center / 30px`};
  }
`;

export const RemoveBtn = styled.button`
  background: none;
  color: coral;
  font-size: 13px;
  border: 1px solid #bdbdbd;
  padding: 3px 5px 4px 5px;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-delete.webp"
        : "/assets/icon-delete.svg"
    }) no-repeat center / 18px`};
  :hover {
    background-color: ${isMobile ? "" : "coral"};
  }
`;
