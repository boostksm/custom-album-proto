import React from "react";
import { styled } from "styled-components";
import SongPlayer from "./SongPlayer";

const PlayBarLayout = styled.div`
  flex-shrink: 0;

  width: 100%;
  padding: 5px 0;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayBar = (props) => {
  return (
    <PlayBarLayout>
      <SongPlayer {...props} />
    </PlayBarLayout>
  );
};

export default PlayBar;
