import { Rate } from "antd";
import styled from "styled-components";

export const Wrapper = styled.main`
  padding: 20px;
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px auto;
`;

export const UserImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #f5f5f5;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const KaKaoMapWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

export const SearchModalBtn = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #5ea6f7;
  border-radius: 20px;
  padding: 8px 20px;
  margin-bottom: 20px;
`;

export const KakaoMap = styled.div`
  width: 400px;
  height: 300px;
  background-color: #f2f2f2;
  margin-bottom: 30px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  display: block;
  margin: 0 auto 20px auto;
  height: 200px;
  resize: none;
  padding: 15px;
  border: 1px solid #bdbdbd;
`;

export const RatingWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px auto 0 auto;
  border: 1px solid #bdbdbd;
  padding: 5px;
`;
export const Rating = styled(Rate)`
  font-size: 25px;
`;

export const RatingTag = styled.span``;
export const RatingCount = styled.span`
  font-size: 14px;
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
  position: fixed;
  right: 20px;
  bottom: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  body.webp & {
    background: url("/assets/webp/icon-upload.webp") no-repeat;
  }
  body.no-webp * {
    background: url("/assets/icon-upload.svg") no-repeat;
  }
  z-index: 990;
`;

