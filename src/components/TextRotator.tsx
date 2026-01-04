import React from 'react';

const TextRotator: React.FC = () => {
  return (
    <span className="cube-wrapper">
      <span className="cube">
        <span className="cube-face face-front">minimalist</span>
        <span className="cube-face face-top">productive</span>
        <span className="cube-face face-back">minimalist</span>
        <span className="cube-face face-bottom">productive</span>
      </span>
    </span>
  );
};

export default TextRotator;
