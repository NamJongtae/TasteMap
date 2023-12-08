import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

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