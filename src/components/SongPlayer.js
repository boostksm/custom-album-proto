import timeFormatter from "../utils/timeFormatter";
import { PlayerIcons } from "../utils/icons";
import { css, styled } from "styled-components";
import useSongPlayer from "../hooks/useSongPlayer";
import { moveFromLeftToRight } from "../styles/keyframes";

const loopDescriptions = [
  "반복 재생 꺼짐",
  "모든 곡 반복 재생 중",
  "한 곡 반복 재생 중",
];

const SongPlayerLayout = styled.section`
  max-width: 500px;
  width: 40%;
  height: 120px;
  line-height: initial;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;

  @media (max-width: 768px) {
    width: 75%;
  }

  .playingSongHeadingBox {
    font-size: 1.8rem;
    text-align: center;
  }
  .buttonsBox {
    display: flex;
    justify-content: space-between;
  }
  .progressBox {
    overflow: hidden;
    .barBox {
      display: flex;
      height: 10px;
      .progressBarInput {
        -webkit-appearance: none;
        appearance: none;
        margin: 0 0;
        width: 100%;
        height: 10px;
        outline: none;
        overflow: hidden;
        border-radius: 5px;
      }
      .progressBarInput::-webkit-slider-runnable-track {
        height: 10px;
        background-color: lightgray;
      }
      .progressBarInput::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid darkgray;
        box-shadow: -407px 0 0 400px darkgray;
      }
      .loadingBar {
        width: 100%;
        height: 10px;
        border-radius: 5px;
        background-color: lightgray;
        height: 10px;
        border: 1px lightgray solid;
        .loadingBarMoving {
          position: relative;
          width: 50%;
          height: 100%;
          border-radius: 5px;
          background-color: white;
          animation: ${moveFromLeftToRight} 0.8s ease-in-out infinite;
        }
      }
    }

    .playingSongTimeBox {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Button = styled.button`
  svg {
    height: 20px;
    width: 20px;
  }
  height: 100%;
  width: 100%;
  margin: 0 2px;
  flex: 1;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.$isToggled &&
    css`
      background: darkgray;
      color: white;
    `}
`;

const SongPlayer = ({
  albumData,
  setPlayingId,
  playingSong,
  isFromHighlight,
}) => {
  const {
    audioRef,
    playPrevSong,
    playNextSong,
    currentTime,
    changeCurrentTime,
    updateCurrentTime,
    isPlaying,
    isRandom,
    loopOptionIdx,
    toggleIsPlaying,
    toggleIsRandom,
    setLoop,
    isLoading,
  } = useSongPlayer({ albumData, setPlayingId, playingSong, isFromHighlight });

  return (
    <SongPlayerLayout aria-label="곡 플레이어">
      <audio
        onEnded={playNextSong}
        ref={audioRef}
        id="player"
        loop={loopOptionIdx === 2}
        onTimeUpdate={updateCurrentTime}
      ></audio>
      <div className="playingSongHeadingBox">
        <h2>{playingSong?.name}</h2>
      </div>
      <div className="buttonsBox">
        <Button
          onClick={toggleIsRandom}
          $isToggled={isRandom}
          aria-label="랜덤 재생"
          aria-pressed={isRandom}
        >
          <PlayerIcons.Random />
        </Button>
        <Button
          onClick={playPrevSong}
          disabled={isRandom || (loopOptionIdx !== 1 && playingSong?.idx === 0)}
          aria-label="이전 곡 재생"
        >
          <PlayerIcons.Prev />
        </Button>
        <Button onClick={toggleIsPlaying} aria-label="재생/일시정지">
          {isPlaying ? <PlayerIcons.Pause /> : <PlayerIcons.Play />}
        </Button>
        <Button
          onClick={playNextSong}
          disabled={
            !isRandom &&
            loopOptionIdx !== 1 &&
            playingSong?.idx === albumData.songCnt - 1
          }
          aria-label="다음곡 재생"
        >
          <PlayerIcons.Next />
        </Button>

        <Button
          onClick={setLoop}
          $isToggled={loopOptionIdx !== 0}
          aria-label="반복 재생"
          aria-description={loopDescriptions[loopOptionIdx]}
        >
          <PlayerIcons.Loop />
          {loopOptionIdx === 2 && <span>1</span>}
        </Button>
      </div>
      <div className="progressBox">
        <div className="barBox">
          {isLoading ? (
            <div className="loadingBar">
              <div className="loadingBarMoving"></div>
            </div>
          ) : (
            <input
              className="progressBarInput"
              type="range"
              value={
                playingSong ? (currentTime / playingSong.duration) * 100 : 0
              }
              onInput={changeCurrentTime}
              aria-label="재생바"
            />
          )}
        </div>
        <div className="playingSongTimeBox">
          <div>{timeFormatter.getString(currentTime)}</div>
          <div>{timeFormatter.getString(playingSong?.duration || 0)}</div>
        </div>
      </div>
    </SongPlayerLayout>
  );
};

export default SongPlayer;
