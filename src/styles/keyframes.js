import { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
`;

const rotateFaster = keyframes`
  100% {
    transform: rotate(1800deg);
  }
`;

const shine = keyframes`
	100% {
		left: 125%;
	}
`;

const moveFromLeftToRight = keyframes`
  0%{
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

export { rotate, rotateFaster, shine, moveFromLeftToRight };
