import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

export const MenuList = styled.ul`
  position: absolute;
  top: 40px;
  right: 0;
  width: 70px;
  border: 1px solid #bdbdbd;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
  overflow: hidden;
  transition: all 0.5s;
  animation: fadeInOption 0.5s;
  @keyframes fadeInOption {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOutOption {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export const MenuItem = styled.li`
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const MenuItemBtn = styled.button`
  padding: 6px;
  display: block;
  border: none;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
  :focus {
    outline: none;
    background-color: #f2f2f2;
  }
  :hover {
    background-color: ${isMobile ? "" : "#f2f2f2"};
  }
`;