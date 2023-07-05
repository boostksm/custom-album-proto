import { useCallback, useEffect, useRef, useState } from "react";
import getRandomNumber from "../utils/getRandomNumber";

export default function useSongPlayer({
  playingSong,
  albumData,
  setPlayingId,
  isFromHighlight,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [loopOptionIdx, setLoopOptionIdx] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const playPrevSong = useCallback(() => {
    if (!playingSong) return;
    const curIdx = playingSong.idx;
    if (curIdx > 0) {
      setPlayingId(albumData.songs[curIdx - 1].id);
    } else {
      setPlayingId(albumData.songs[albumData.songCnt - 1].id);
    }
  }, [albumData, playingSong, setPlayingId]);

  const playNextSong = useCallback(() => {
    if (!playingSong) return;
    const curIdx = playingSong.idx;
    if (isRandom) {
      const randomIdx = getRandomNumber(0, albumData.songCnt, [curIdx]);
      setPlayingId(albumData.songs[randomIdx].id);
      return;
    }
    setPlayingId(albumData.songs[(curIdx + 1) % albumData.songCnt].id);
  }, [albumData, isRandom, playingSong, setPlayingId]);

  const toggleIsRandom = useCallback(() => {
    setIsRandom((prev) => !prev);
  }, []);
  const setLoop = useCallback(() => {
    setLoopOptionIdx((prev) => (prev + 1) % 3);
  }, []);
  const toggleIsPlaying = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!playingSong || !audioRef.current) return;
    async function playAudio() {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.log(err);
        alert(err);
        // audioRef.current.src = "/samples/Be As You Are (JordanXL Remix)-Mike Posner.mp3";
        // audioRef.current.play();
      }
    }
    if (isPlaying) playAudio();
    else audioRef.current.pause();
  }, [isPlaying, playingSong]);

  const fadeIn = useCallback(() => {
    audioRef.current.volume = 0;
    const intervalId = setInterval(() => {
      if (audioRef.current.volume >= 1) {
        clearInterval(intervalId);
        return;
      }
      audioRef.current.volume = Math.min(
        (audioRef.current.volume + 0.1).toFixed(1),
        1
      );
    }, 100);
  }, []);

  useEffect(() => {
    if (playingSong && isFromHighlight) {
      if (isPlaying) fadeIn();
      audioRef.current.currentTime = playingSong.highlightTime;
      setCurrentTime(playingSong.highlightTime);
    }
  }, [isFromHighlight, playingSong]);

  const updateDuration = useCallback((e) => {
    setDuration(e.currentTarget.duration);
  }, []);
  const updateCurrentTime = useCallback((e) => {
    const { currentTime } = e.currentTarget;
    setCurrentTime(currentTime);
  }, []);

  const changeCurrentTime = useCallback(
    (e) => {
      const { value } = e.currentTarget;
      const nextTime = (value / 100) * duration;
      audioRef.current.currentTime = nextTime;
      setCurrentTime(nextTime);
    },
    [duration]
  );
  return {
    audioRef,
    playPrevSong,
    playNextSong,
    currentTime,
    duration,
    changeCurrentTime,
    updateDuration,
    updateCurrentTime,
    isPlaying,
    isRandom,
    loopOptionIdx,
    toggleIsPlaying,
    toggleIsRandom,
    setLoop,
  };
}
