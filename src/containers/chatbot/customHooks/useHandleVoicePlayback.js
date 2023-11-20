import { useCallback, useEffect, useRef, useState } from 'react';
import { convertBase64ToBlob } from '../utilities/helpers';
import { useChatBotContext } from '../context/ChatBotContext';

const useHandleVoicePlayback = (audio, setAnimationCompleted) => {
  const audioRef = useRef(null);
  const [isPlaying, setPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const { isStopped, setSpeaking, setStopped } = useChatBotContext();

  // AUTO-PLAY AUDIO WHEN AUDIO RECIEVED
  useEffect(() => {
    if (audio) {
      const blob = convertBase64ToBlob(audio);
      const audioEl = new Audio(blob);
      audioEl.playbackRate = 1.2;
      audioRef.current = audioEl;
      setAudioBlob(blob);

      audioEl.addEventListener('play', () => {
        if (isStopped) {
          setStopped(false);
        }

        setSpeaking(true);
      });

      audioEl.addEventListener('ended', () => {
        setSpeaking(false);
        setStopped(true);
      });

      // eslint-disable-next-line no-console
      audioEl.play().catch(err => console.log(err));
    }
  }, [audio]);

  // PLAY AUDIO ON CLICK OF ICON BUTTON
  const handlePlayAudio = useCallback(() => {
    const audioEl = new Audio(audioBlob);
    audioRef.current = audioEl;

    audioEl.addEventListener('play', () => {
      setPlaying(true);
      setSpeaking(true);
    });

    audioEl.addEventListener('ended', () => {
      setPlaying(false);
      setSpeaking(false);
    });

    audioEl.play();
  }, [audioBlob]);

  // STOP TEXT ANIMATION AND AUDIO
  const handleStopResponse = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setAnimationCompleted(true);
    setStopped(true);
    setSpeaking(false);
    setPlaying(false);
  }, []);

  // STOP AUDIO ON CLICK OF ICON BUTTON
  const handleStopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
      setSpeaking(false);
    }
  }, [audioRef.current]);

  return { audioRef, isPlaying, handlePlayAudio, handleStopResponse, handleStopAudio };
};

export default useHandleVoicePlayback;
