import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  z-index: 990;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 500;
  line-height: 6.3;
  body.webp & {
    background: url("/assets/webp/icon-top.webp") no-repeat center top 10px / 12px #eee;
  }
  body.no-webp & {
    background: url("/assets/icon-topBtn.svg") no-repeat center top 10px / 12px #eee;
  }
  animation: topBtnFadeIn 0.5s;
  @keyframes topBtnFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  
  @keyframes topBtnFadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;
