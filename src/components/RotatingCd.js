import React from "react";
import { css, styled } from "styled-components";
import { InnerCircle } from "../styles/mixins";
import { rotate, rotateFaster, shine } from "../styles/keyframes";

const RotatingCdLayout = styled.div`
  ${InnerCircle()}
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border: 0.5px solid gray;
  overflow: hidden;
  &::before {
    /* https://codepen.io/nxworld/pen/ZYNOBZ */
    position: absolute;
    top: 0;
    left: -75%;
    z-index: 2;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
    background: -webkit-linear-gradient(
      left,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    -webkit-transform: skewX(-25deg);
    transform: skewX(-25deg);
    ${(props) =>
      props.$isFaster &&
      css`
        animation: ${shine} 0.75s;
      `};
  }
  .albumArtImage {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 4px solid white;
    animation-name: ${(props) => (props.$isFaster ? rotateFaster : rotate)};
    animation-duration: ${(props) => (props.$isFaster ? "1s" : "2s")};
    animation-timing-function: ${(props) =>
      props.$isFaster ? "ease-in-out" : "linear"};
    animation-iteration-count: infinite;
  }
  .cdInnerRim {
    ${InnerCircle(33)}
    background-color: rgba(0, 0, 0, 0.1);
    .cdHole {
      ${InnerCircle(84)}
      box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
      background-color: lightgray;
      .cdInnerHole {
        ${InnerCircle(40)}
        box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.2);
        background-color: white;
      }
    }
  }
`;

const RotatingCd = ({ isFaster, albumArtUrl }) => {
  return (
    <RotatingCdLayout $isFaster={isFaster}>
      <img
        className="albumArtImage"
        src={albumArtUrl}
        onError={(e) => (e.target.src = "/samples/albumArt5.png")}
        alt="album art"
      />
      <div className="cdInnerRim">
        <div className="cdHole">
          <div className="cdInnerHole"></div>
        </div>
      </div>
    </RotatingCdLayout>
  );
};

export default RotatingCd;
