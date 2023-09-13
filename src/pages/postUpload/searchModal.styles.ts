import { isMobile } from "react-device-detect";
import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const Dim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
`;

export const Modal = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 500px;
  height: 600px;
  background-color: #fff;
`;

export const ModalTitleBar = styled.div`
  padding: 10px;
  background-color: #bdbdbd;
`;

export const ModalTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  text-align: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 6px;
  right: 5px;
  width: 20px;
  height: 20px;
  body.webp & {
    background: url("/assets/webp/icon-close.webp") no-repeat center / 24px;
  }
  body.no-webp & {
    background: url("/assets/icon-close.svg") no-repeat center / 24px;
  }
`;

export const SearchInputForm = styled.form`
  width: 100%;
  padding: 10px 15px;
  position: relative;
  border-bottom: 2px solid #bdbdbd;
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 12px;
    display: block;
    width: 20px;
    height: 20px;
    background: url("/assets/icon-search.svg") no-repeat center / 20px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  border: none;
`;
export const SearchList = styled.ul`
  width: 100%;
  height: calc(100% - 77px);
  overflow-y: scroll;
`;

export const SearchItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 60px 10px 20px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Item = styled.li`
  font-size: 12px;
  word-break: break-all;
  padding-left: 55px;
  text-indent: -60px;
`;

export const SearchItemText = styled.p`
  display: inline;
  margin-left: 5px;
`;

export const SearchItemTag = styled.span`
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

export const SelectBtn = styled.button`
  position: absolute;
  top: calc(50% - 10px);
  transform: translateX(-50%);
  right: 0;
  background: none;
  color: #79a7ff;
  font-size: 13px;
  border: 1px solid #bdbdbd;
  padding: 3px 5px 4px 5px;
  border-radius: 5px;
  :hover {
    background-color: ${isMobile ? "" : "#eee"};
  }
`;

export const SerachTip = styled.div`
  padding: 20px;
`;
export const TipTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
`;

export const TipDescription = styled.p`
  &:nth-child(2) {
    margin-bottom: 20px;
  }
  margin-bottom: 8px;
`;
export const TipExample = styled.p`
  color: #5ea6f7;
  font-size: 14px;
`;

export const NoSearchData = styled.div`
  padding: 20px;
  line-height: 1.5;
  font-size: 14px;
`
export const Strong = styled.strong`
 font-weight: 700;
`
export const NoSearchDataText = styled.p`
&:nth-child(1){
  margin-bottom: 20px;
}
&:nth-child(2){
  margin-bottom: 5px;
  font-weight: 500;
}
  white-space: pre-line;
`
