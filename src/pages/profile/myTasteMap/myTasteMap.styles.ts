import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const Desc = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  color: #208afa;
`;

export const KakaomapWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: ${(props: { contentType: "map" | "list" }) =>
    props.contentType === "map" ? "block" : "none"};
`;

export const ContetnTypeBtnWrapper = styled.div`
  position: relative;
  width: calc(100% - 20px);
  max-width: 500px;
  margin: 0 auto;
`;

export const MapBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 50px;
  padding: 3px 6px;
  border: 1px solid #bdbdbd;
  border-right: none;
  border-radius: 5px 0 0 5px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s;
  color: ${(props: { contentType: "map" | "list" }) =>
    props.contentType === "map" ? "#fff" : "none"};
  background-color: ${(props: { contentType: "map" | "list" }) =>
    props.contentType === "map" ? "#208AFA" : "none"};
`;

export const ListBtn = styled.button`
  position: absolute;
  top: 30px;
  right: 15px;
  padding: 3px 6px;
  border: 1px solid #bdbdbd;
  border-left: none;
  border-radius: 0 5px 5px 0;
  font-size: 12px;
  font-weight: 500;
  color: ${(props: { contentType: "map" | "list" }) =>
    props.contentType === "list" ? "#fff" : "none"};
  background-color: ${(props: { contentType: "map" | "list" }) =>
    props.contentType === "list" ? "#208AFA" : "none"};
`;

export const MapInfoList = styled.ul`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #bdbdbd;
  margin-top: 50px;
`;

export const MapInfoItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 60px 10px 20px;
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 500px;
`;
export const ItemSingleList = styled(ItemList)`
  position: relative;
  margin-top: 20px;
  border: 1px solid #bdbdbd;
  padding: 20px 50px 20px 20px;
  margin: 20px auto 0 auto;
  display: ${(props: { contentType: "map" | "list" }) =>
    props.contentType === "map" ? "flex" : "none"};
`;

export const Item = styled.li`
  font-size: 12px;
  word-break: break-all;
  padding-left: 55px;
  text-indent: -60px;
`;

export const ItemText = styled.p`
  display: inline;
  margin-left: 5px;
`;

export const ItemLink = styled(Link)`
  display: inline;
  margin-left: 5px;
  color: blue;
  text-decoration: underline;
`;

export const ItemTag = styled.span`
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
  body.webp & {
    background: url("/assets/webp/icon-thumbnailMapBtn.webp") no-repeat center /
      18px;
  }
  body.no-webp & {
    background: url("/assets/icon-thumbnailMapBtn.svg") no-repeat center / 18px;
  }
  :hover {
    body.webp & {
      background: ${isMobile
        ? ""
        : "url('/assets/webp/icon-thumbnailMapBtnActive.webp') no-repeat center / 30px"};
    }
    body.no-webp & {
      background: ${isMobile
        ? ""
        : "url('/assets/icon-thumbnailMapBtnActive.svg') no-repeat center / 30px"};
    }
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
  background: url("/assets/icon-delete.svg") no-repeat center / 18px;
  :hover {
    background-color: ${isMobile ? "" : "coral"};
  }
`;