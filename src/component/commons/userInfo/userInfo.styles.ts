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

