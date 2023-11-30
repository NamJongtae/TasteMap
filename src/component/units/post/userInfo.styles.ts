import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const UserInfoWrapper = styled.article`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const UserProfileLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const Username = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const UserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #f2f2f2;
  padding: 3px;
`;

export const MoreBtn = styled.button`
  width: 30px;
  height: 45px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-more.webp"
        : "/assets/icon-more.svg"
    }) no-repeat center / 15px`};
`;

export const OptionList = styled.ul`
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

export const Option = styled.li`
  :not(:last-child) {
    border-bottom: 1px solid #bdbdbd;
  }
`;

export const OptionBtn = styled.button`
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
