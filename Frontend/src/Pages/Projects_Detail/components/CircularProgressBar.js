import React, { useState } from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ progress, radius, dimention, bgDimention, label, color }) => {
  const [animatedProgress, setAnimatedProgress] = useState(progress);
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;

  const startAnimation = () => {
    let start = 0;
    const increment = 1;

    const animate = () => {
      start = Math.min(start + increment , progress);
      setAnimatedProgress(start);

      if (start < progress) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  return (
    <div className="circular-progress-container" onMouseEnter={startAnimation}>
      <svg
        width={bgDimention}
        height={bgDimention}
        className="circular-progress"
      >
        <circle
          className="circular-progress-bg"
          cx={dimention}
          cy={dimention}
          r={radius}
        />
        <circle
          className="circular-progress-bar"
          cx={dimention}
          cy={dimention}
          r={radius}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            stroke: color,
          }}
        />
      </svg>
      <div className="circular-progress-text">
        <div className="percentage" style={{ color: color }}>
          {Math.round(animatedProgress)}%
        </div>
        <div className="label">{label}</div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
