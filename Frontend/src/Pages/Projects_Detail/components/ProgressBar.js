import React, { useState, useEffect } from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress, color }) => {
  const [animatedProgress, setAnimatedProgress] = useState(progress);

  useEffect(() => {
    let start = 0;
    const increment = 1;

    const animate = () => {
      start = Math.min(start + increment, progress);
      setAnimatedProgress(start);

      if (start < progress) {
        requestAnimationFrame(animate);
      }
    };

    animate();
      
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar-fill"
        style={{ width: `${animatedProgress}%`, backgroundColor: color }}
      >
        <span className="progress-bar-text" style={{ backgroundColor: color }}>
          {Math.round(animatedProgress)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
