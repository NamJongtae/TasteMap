import { Link } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const SearchInputWrapper = styled.div`
  padding: 5px 3px;
  border-radius: 20px;
  border: 2px solid #b5b5b5;
  max-width: 200px;
  margin: 0 auto 20px auto;
`;

export const SearchLabel = styled.label``;

export const Input = styled.input`
  width: 100%;
  padding: 0 28px 0 10px;
  background: none;
  body.no-webp & {
    background: url("/assets/icon-search.svg") no-repeat right 5px center / 20px;
  }
  border: none;
  body.webp & {
    background: url("/assets/webp/icon-search.webp") no-repeat right 5px center /
      20px;
  }
  ::placeholder {
    color: #b5b5b5;
    font-weight: 300;
  }
  :focus {
    outline: none;
  }
`;

export const SearchUl = styled.ul`
  width: 100%;
  height: 100%;
  max-width: 360px;
  margin: 0 auto;
`;

export const SearchLi = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const UserProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 15px;
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

export const FollowBtn = styled.button`
  border-radius: 20px;
  border: 1px solid #bdbdbd;
  padding: 7px 16px;
  font-size: 12px;
  border: none;
  width: 77px;
  color: ${(props: { isFollow: boolean }) =>
    props.isFollow ? "#767676" : "#fff"};
  background-color: ${(props: { isFollow: boolean }) =>
    props.isFollow ? "" : "#208AFA"};
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 20px;
`;

export const NoUserData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const NoUserText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #888;
  white-space: pre-wrap;
  text-align: center;
  line-height: 1.3;
`;

export const NoUserKeyword = styled.strong`
  color: #555;
`;
