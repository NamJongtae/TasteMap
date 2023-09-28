import { Rate } from "antd";
import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px auto;
  padding: 20px;
`;

export const Section = styled.section`
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 15px;
`;

export const SubTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  display: block;
  margin-bottom: 20px;
`;

export const SearchModalBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  body.webp & {
    background: url("/assets/webp/icon-search.webp") no-repeat center right 7px /
      16px gold;
  }
  body.no-webp & {
    background: url("/assets/icon-search.svg") no-repeat center right 7px / 16px
      gold;
  }
  border-radius: 5px;
  padding: 8px 30px 8px 14px;
  margin-bottom: 20px;
`;

export const KakaoMap = styled.div`
  width: 400px;
  height: 300px;
  background-color: #f2f2f2;
  margin-bottom: 30px;
`;

export const TextArea = styled.textarea`
  width: calc(100% - 30px);
  display: block;
  margin: 20px auto;
  background-color: #f9f9f9;
  resize: none;
  border: none;
  font-size: 14px;
  box-sizing: content-box;
  border-bottom: 1px solid #bdbdbd;
  line-height: 1.6;
  padding: 15px;
  :focus {
    outline: none;
  }
  overflow: hidden;
`;

export const RatingWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 20px auto;
  border: none;
`;
export const Rating = styled(Rate)`
  font-size: 24px;
`;

export const RatingTag = styled.span``;
export const RatingCount = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: bold;
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
  body.webp & {
    background: url("/assets/webp/icon-close.webp") no-repeat center top / 24px
      coral;
  }
  body.no-webp & {
    background: url("/assets/icon-close.svg") no-repeat center / 24px;
  }
`;

export const HiddenUploadBtn = styled.input``;

export const ImgUploadBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  padding: 8px 32px 8px 12px;
  margin-bottom: 20px;
  body.webp & {
    background: url("/assets/webp/icon-uploadImg.webp") no-repeat center right
      6px/ 20px gold;
  }
  body.no-webp * {
    background: url("/assets/icon-uploadImg.svg") no-repeat center / 20px gold;
  }
  z-index: 990;
`;
