import moment from 'moment';
import { useCallback, useRef, useState } from 'react';

const useHandleVoice = (socketRef, setChatMessages, setLoading, setRecentQuery) => {
  const mediaRecorder = useRef(null);
  const [isVoiceRecording, setVoiceRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);

  const handleStartRecording = useCallback(async () => {
    let options = {};

    // CHECKING WHICH TYPE IS SUPPORTED FOR CROSS BROWSER COMPATIBILITY
    if (MediaRecorder.isTypeSupported('audio/webm')) {
      options = { mimeType: 'audio/webm' };
    } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
      options = { mimeType: 'audio/mp4' };
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream, options);

    mediaRecorder.current.ondataavailable = async event => {
      if (event.data.size > 0) {
        setAudioBlob(event.data);

        socketRef.current?.send(event.data);
        setChatMessages(prevState => [
          ...prevState,
          { query: URL.createObjectURL(event.data), type: 'audio', timestamp: moment().format('hh:mm A') },
        ]);
        setRecentQuery({ type: 'audio', query: event.data });
        setAudioBlob(null);
        setLoading(true);
      }
    };

    mediaRecorder.current.start();
    setVoiceRecording(true);
  }, [socketRef]);

  const handleStopRecording = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
    setVoiceRecording(false);
  }, [mediaRecorder]);

  return { handleStartRecording, handleStopRecording, isVoiceRecording, audioBlob };
};

export default useHandleVoice;
