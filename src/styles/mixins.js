import { css } from "styled-components";

const ScrollBar = (
  height = 10,
  width = 10,
  trackBg = "#f1f1f1",
  thumbBg = "#888",
  hoverBg = "#555"
) => css`
  &::-webkit-scrollbar {
    height: ${height}px;
    width: ${width}px;
  }
  &::-webkit-scrollbar-track {
    background: ${trackBg};
  }
  &::-webkit-scrollbar-thumb {
    background: ${thumbBg};
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${hoverBg};
  }
`;

const AbsoluteMiddle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const InnerCircle = (ratio = 100) => css`
  ${AbsoluteMiddle}
  border-radius: 50%;
  width: ${ratio}%;
  height: ${ratio}%;
`;

const AspectRatioPollyfill = (ratio) => css`
  &::before {
    float: left;
    padding-top: ${(1 / ratio) * 100}%;
    content: "";
  }
  &::after {
    display: block;
    content: "";
    clear: both;
  }
`;

export { ScrollBar, InnerCircle, AbsoluteMiddle, AspectRatioPollyfill };
