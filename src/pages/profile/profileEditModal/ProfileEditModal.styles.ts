import styled from "styled-components";

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

export const Dim = styled.div`
  width: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  inset: 0;
  z-index: 999;
`;

export const ModalTitleBar = styled.div`
  padding: 12px;
  border-bottom: 1px solid #bdbdbd;
`;

export const ModalTitle = styled.h2`
  position: relative;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 30px;
  height: 30px;
  body.webp & {
    background: url("/assets/webp/icon-back.webp") no-repeat center / 16px;
  }
  body.no-webp & {
    background: url("/assets/icon-back.svg") no-repeat center / 16px;
  }
  transform: rotate(180deg);
`;

export const ProfileEditModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  max-width: 500px;
  background-color: #fff;
  z-index: 999;
  animation: ProfileEditModalmoveUp 1s;
  @keyframes ProfileEditModalmoveUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
  }

  @keyframes ProfileEditModalmoveUpmoveDown {
    from {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    to {
      transform: translate(-50%, 80%);
      opacity: 0;
    }
  }
`;

export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: calc(100% - 30px);
  max-width: 360px;
  margin: 0 auto;
  padding: 30px 0;
`;

export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
  & input {
    background-color: #fff;
  }
`;

export const ProfileImgWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #bdbdbd;
  margin-bottom: 10px;
`;

export const ProfileImgLabel = styled.label`
  display: block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ProfileImgInput = styled.input``;
export const ProfileImgButtonWrapper = styled.div`
  position: relative;
  max-width: 130px;
  margin: 0 auto;
`;
export const ProfileImgButton = styled.button`
  display: block;
  margin: 0 auto;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: relative;
  border: 2px solid #bdbdbd;
  ::after {
    content: "";
    position: absolute;
    right: -12px;
    bottom: -3px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  body.no-webp &::after {
    background: url("/assets/icon-uploadProfile.svg") no-repeat center / 20px
      #79a7ff;
  }
  body.webp &::after {
    background: url("/assets/webp/icon-uploadProfile.webp") no-repeat center /
      20px #79a7ff;
  }
`;

export const ProfileImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;
export const ProfileImgResetBtn = styled.button`
  position: absolute;
  top: -3px;
  right: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  body.webp & {
    background: url("/assets/webp/icon-close.webp") no-repeat center top 2px /
      16px #767676;
  }
  body.no-webp & {
    background: url("/assets/icon-close.svg") no-repeat center top 2px/ 16px #767676;
  }
`;
export const ProfileImgDescList = styled.ul`
  padding: 20px 10px;
  display: table;
  margin: 0 auto;
`;

export const ProfileImgDesc = styled.li`
  color: #4c4d4f;
  line-height: 1.5;
  font-size: 12px;
  word-break: keep-all;
  @media screen and (max-width: 362px) {
    font-size: 11px;
  }
`;

export const IntroTextArea = styled.textarea`
  width: calc(100% - 10px);
  resize: none;
  padding: 15px 5px;
  border: none;
  box-sizing: content-box;
  border-bottom: 1px solid #bdbdbd;
  line-height: 1.6;
  max-height: 100px;
  ::placeholder {
    font-weight: 500;
    color: #d0d0d0;
  }
  :focus {
    outline: none;
  }
  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #79a7ff; /* 스크롤바의 색상 */

    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 100, 244, 0.1); /*스크롤바 뒷 배경 색상*/
    border-radius: 10px;
  }
`;

export const EditBtn = styled.button`
  width: 100%;
  background-color: ${(props) => (props.disabled ? "#cbcbcb" : "gold")};
  cursor: ${(props) => (props.disabled ? "default" : "cursor")};
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
  transition: all 0.5s;
`;
