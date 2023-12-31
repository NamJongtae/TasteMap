import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle` 
  ${reset} 
  
  body{
    width: 100%;
    height: 100%;
  }
  :root{
    font-family: 'Noto Sans KR', sans-serif;
    --vh: 100%;
  }
  *{
        box-sizing: border-box;
   }

    a {
        text-decoration: none;
        color: inherit;
    }
 
    li {
        list-style-type: none;
    }

    .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    }

    input, textarea { 
      -moz-user-select: auto;
      -webkit-user-select: auto;
      -ms-user-select: auto;
      user-select: auto;
      font-family: 'Noto Sans KR', sans-serif;
    }

    button {
      border: none;
      padding: 0;
      font-family: 'Noto Sans KR', sans-serif;
      cursor: pointer;
      :disabled {
            cursor: default;
        }
    }
`;

export default GlobalStyles;
