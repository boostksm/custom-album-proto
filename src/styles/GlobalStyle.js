import { createGlobalStyle } from "styled-components";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    /* height */
    body {
        min-height: 500px;
        width: 100dvw;
        height: 100dvh;
        @supports not (width: 100dvw) {
            width: 100vw;
            height: 100vh;
        }
        #root{
            height: 100%;
        }
    }

    /* font-size */
    html{
        font-size: 16px;
    }

    @media (max-width: 768px) {
        html {
            font-size: 10px;
        }
    }

    /* line-height */
    body {
        line-height: 150%;
    }

    /* fonts */
    body * {
        font-family: 'IropkeBatangM';
    }


`;

export default GlobalStyle;
