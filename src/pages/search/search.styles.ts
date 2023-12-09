import styled from "styled-components";

// ----------------Search style----------------

export const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

// ----------------SearchInput style----------------

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
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-search.webp"
        : "/assets/icon-search.svg"
    }) no-repeat right 5px center / 20px`};
  border: none;
  ::placeholder {
    color: #b5b5b5;
    font-weight: 300;
  }
  :focus {
    outline: none;
  }
`;

// ----------------SearchResultList style----------------

export const SearchList = styled.ul`
  width: 100%;
  height: 100%;
  max-width: 360px;
  margin: 0 auto;
`;

export const InfinityScrollTarget = styled.li`
  position: relative;
  bottom: 20px;
`;

// ----------------SearchResultItem style----------------

export const SearchItem = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// ----------------FollowButton style----------------

export const FollowBtn = styled.button`
  border-radius: 20px;
  border: 1px solid #bdbdbd;
  padding: 7px 16px;
  font-size: 12px;
  border: none;
  width: 77px;
  color: 767676;
`;

// ----------------UnfollowButton style----------------

export const UnfollowBtn = styled(FollowBtn)`
  color: #fff;
  background-color: #208afa;
`;

// ----------------NoSearchResult style----------------

export const NoResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const NoResultText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #888;
  white-space: pre-wrap;
  text-align: center;
  line-height: 1.3;
`;

export const NoResultKeyword = styled.strong`
  color: #555;
`;
