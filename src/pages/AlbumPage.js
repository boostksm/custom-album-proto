import React, { useEffect, useMemo, useState } from "react";
import { styled } from "styled-components";
import AlbumPageHeader from "../components/AlbumPageHeader";
import AlbumPageMain from "../components/AlbumPageMain";
import PlayBar from "../components/PlayBar";
import AutoScrollProvider from "../components/common/AutoScrollProvider";
import getAlbumData from "../axios/requests/getAlbumData";

const AlbumPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AlbumPage = () => {
  const [playingId, setPlayingId] = useState(null);
  const [isFromHighlight, setIsFromHighlight] = useState(false);
  const [albumData, setAlbumData] = useState(null);
  const playingSong = useMemo(
    () => albumData?.songs.find((song) => song.id === playingId) || null,
    [albumData, playingId]
  );

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAlbumData(1);
        setAlbumData(data);
      } catch (err) {
        alert(err);
      }
    })();
  }, []);

  if (!albumData) {
    return <>loading...</>;
  }

  return (
    <AlbumPageContainer>
      <AlbumPageHeader albumData={albumData} />
      <AutoScrollProvider preventScrollTime={1000} lastViewedId={playingId}>
        <AlbumPageMain
          albumData={albumData}
          playingId={playingId}
          setPlayingId={setPlayingId}
          setIsFromHighlight={setIsFromHighlight}
          isFromHighlight={isFromHighlight}
        />
      </AutoScrollProvider>
      <PlayBar
        albumData={albumData}
        setPlayingId={setPlayingId}
        isFromHighlight={isFromHighlight}
        playingSong={playingSong}
      />
    </AlbumPageContainer>
  );
};

export default AlbumPage;
