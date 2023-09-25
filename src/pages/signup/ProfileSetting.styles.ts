import styled from "styled-components";

export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding-bottom: 30px;
`;

export const InputWrapper = styled.div`
  & > p {
    margin-top: 10px;
  }
`;

export const ProfileImgWrapper = styled.div`
  position: relative;
  border-bottom: 2px solid #bdbdbd;
  margin-bottom: 10px;
`;

export const ProfileImgLabel = styled.label`
  display: block;
  text-align: center;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const ProfileImgInput = styled.input``;

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

export const ProfileImgButtonWrapper = styled.div`
  position: relative;
  max-width: 130px;
  margin: 0 auto;
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
`;

export const ProfileImgDesc = styled.li`
  color: #4c4d4f;
  list-style-type: disc;
  margin-left: 50px;
  line-height: 1.5;
  font-size: 12px;
`;

export const SignupBtn = styled.button`
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

export const PrevBtn = styled.button`
  width: 100%;
  background-color: #eee;
  padding: 14px 0;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  color: #111;
`;


