import React, { useState, useRef } from 'react';
import './VideoPlayer.css';

function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlayButton = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-container">
      <video 
        ref={videoRef}
        className="video-element" 
        width="100%" 
        height="auto" 
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        onClick={handlePlayButton} 
      />
      {!isPlaying && (
        <div className="play-button" onClick={handlePlayButton}>
          ▶
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
