import styled from "styled-components";

export const SearchInput = styled.input`
  width: 100%;
  border: none;
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
    background: ${(props: { $isWebpSupported: boolean | null }) =>
      `url(${
        props.$isWebpSupported
          ? "/assets/webp/icon-search.webp"
          : "/assets/icon-search.svg"
      }) no-repeat center / 20px`};
  }
`;
