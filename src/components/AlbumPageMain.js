import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import Song from "../components/Song";
import CdMenu from "../components/CdMenu";
import AlbumContentFooter from "./AlbumContentFooter";
import OptionsSection from "./OptionsSection";
import { useAutoScrollContext } from "./common/AutoScrollProvider";
import AutoScrollBox from "./common/AutoScrollBox";
import AutoScrollItem from "./common/AutoScrollItem";

const MainLayout = styled.main`
  flex-grow: 1;
  min-height: 0;
  height: 0;

  .albumContentSection {
    height: 95%;
    position: relative;
    overflow-y: hidden;
    @media (max-width: 768px) {
      overflow-y: visible;
    }

    .songList {
      display: inline;
      .songItem {
        height: 70%;
        min-height: 450px;
        @media (max-width: 768px) {
          height: 100%;
        }
      }
    }
  }
`;

const AlbumPageMain = ({
  albumData,
  playingId,
  setPlayingId,
  isFromHighlight,
  setIsFromHighlight,
}) => {
  const [isBlurEnabled, setIsBlurEnabled] = useState(true);
  const {
    viewedItemId,
    isDisabled,
    setIsDisabled,
    scrollIntoViewWithoutPhase,
    isScrolling,
  } = useAutoScrollContext();

  useEffect(() => {
    setPlayingId(viewedItemId); // 자동스크롤 사용시 보이는 아이템을 재생시킴
  }, [viewedItemId]);

  useEffect(() => {
    scrollIntoViewWithoutPhase(playingId); // playingId가 바뀌면 자동스크롤로 보이게함
  }, [playingId]);

  const selectSong = useCallback(
    (id) => {
      if (!isScrolling) setPlayingId(id);
    },
    [isScrolling, setPlayingId]
  );

  return (
    <MainLayout>
      <OptionsSection
        isFromHighlight={isFromHighlight}
        setIsFromHighlight={setIsFromHighlight}
        isBlurEnabled={isBlurEnabled}
        setIsBlurEnabled={setIsBlurEnabled}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
      <section className="albumContentSection" aria-label="앨범 콘텐츠">
        <AutoScrollBox>
          <ol className="songList" aria-label="수록곡">
            {albumData.songs.map((song, idx) => (
              <li className="songItem" key={song.id}>
                <AutoScrollItem itemId={song.id}>
                  <Song
                    isBlur={isBlurEnabled && playingId !== song.id}
                    song={song}
                    isReversed={idx % 2 === 0}
                    selectSong={selectSong}
                  />
                </AutoScrollItem>
              </li>
            ))}
          </ol>
          <AlbumContentFooter albumData={albumData} />
        </AutoScrollBox>
        <CdMenu
          albumData={albumData}
          isScrolling={isScrolling}
          selectSong={selectSong}
        />
      </section>
    </MainLayout>
  );
};

export default AlbumPageMain;
