import styled from "styled-components";

export const Button = styled.button`
  position: fixed;
  z-index: 990;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  body.webp & {
    background: url("/assets/webp/icon-topBtn.webp") no-repeat center / 50px;
  }
  body.no-webp & {
    background: url("/assets/icon-topBtn.svg") no-repeat center / 50px;
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
