import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

export const SearchForm = styled.form`
  padding: 5px 3px;
  border-radius: 20px;
  border: 2px solid #b5b5b5;
  max-width: 200px;
  margin: 0 auto 20px auto;
`;

export const SearchLabel = styled.label``;

export const SearchInput = styled.input`
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
  max-width: 370px;
  margin: 0 auto;
`;

export const SearchLi = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const FollowBtn = styled.button`
  border-radius: 20px;
  border: 1px solid #bdbdbd;
  padding: 7px 16px;
  font-size: 12px;
  border: none;
`;
