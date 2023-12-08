import styled from "styled-components";

export const ImgSection = styled.section`
  margin-bottom: 20px;
`;

export const ImgTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 15px;
`;

export const ImgList = styled.ul`
  width: 100%;
  max-width: 500px;
  min-height: 279px;
  display: flex;
  gap: 16px;
  margin: 0 auto;
  overflow: scroll hidden;
  ::-webkit-scrollbar {
    height: 12px;
  }
  ::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 10px;
    box-shadow: white 1px 1px 2px inset;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgb(106, 106, 106);
    border-radius: 10px;
    background-clip: padding-box;
    border: 1px solid transparent;
    height: 5px;
  }
`;

export const ImgItem = styled.li`
  width: 320px;
  height: 228px;
  position: relative;
  margin-bottom: 16px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  box-sizing: content-box;
`;

export const Img = styled.img`
  width: 320px;
  height: 228px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
`;

export const RemoveImgBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 5px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    props.$isWebpSupported
      ? "url('/assets/webp/icon-close.webp') no-repeat center top / 24px coral"
      : "url('/assets/icon-close.svg') no-repeat center / 24px"};
`;

export const ImgUploadBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  padding: 8px 32px 8px 12px;
  margin-bottom: 20px;
  background: ${(props: { $isWebpSupported: boolean | null }) =>
    `url(${
      props.$isWebpSupported
        ? "/assets/webp/icon-uploadImg.webp"
        : "/assets/icon-uploadImg.svg"
    }) no-repeat center right 6px / 20px gold`};
  z-index: 990;
`;
