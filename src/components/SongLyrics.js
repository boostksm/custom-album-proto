import { styled } from "styled-components";
import { ScrollBar } from "../styles/mixins";

const SongLyricsLayout = styled.ol`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 2px 2px;
  ${ScrollBar(5, 5, null, "lightgray")}
`;

const SongLyrics = ({ lyrics }) => {
  return (
    <SongLyricsLayout>
      {lyrics.map((line, idx) => (
        <li key={idx}>{line}</li>
      ))}
    </SongLyricsLayout>
  );
};

export default SongLyrics;
