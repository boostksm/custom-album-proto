import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import getRandomNumber from "../utils/getRandomNumber";
import AudioFetchingManager from "../utils/AudioFetchingManager";

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
  const audioSrcManager = useRef(new AudioFetchingManager(10));
  const [curObjectUrl, setCurObjectUrl] = useState(null);
  const isLoading = useMemo(() => curObjectUrl === null, [curObjectUrl]);

  useEffect(() => {
    if (!playingSong) return;
    (async () => {
      try {
        setCurObjectUrl(null);
        const objectUrl = await audioSrcManager.current.getObjectUrl(
          playingSong.audioSrc
        );
        setCurObjectUrl(objectUrl);
      } catch (err) {
        console.log(playingSong, err);
      }
    })();
  }, [playingSong]);

  const moveToHighlight = useCallback(() => {
    fadeIn();
    audioRef.current.currentTime = playingSong.highlightTime;
    setCurrentTime(playingSong.highlightTime);
  }, [playingSong]);

  useEffect(() => {
    console.log(curObjectUrl);
    audioRef.current.src = curObjectUrl;
    if (isPlaying) {
      audioRef.current.play().catch(console.log);
    }
  }, [curObjectUrl]);

  useEffect(() => {
    if (isFromHighlight) moveToHighlight();
  }, [isFromHighlight, duration]);

  useEffect(() => {
    if (isPlaying) audioRef.current.play().catch(console.log);
    else audioRef.current.pause();
  }, [isPlaying]);

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
    isLoading,
  };
}
