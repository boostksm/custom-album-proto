import { createGlobalStyle } from "styled-components";
import reset from "./reset";

const GlobalStyle = createGlobalStyle`
    ${reset}

    /* min-height */
    body {
        min-height: 500px;
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
