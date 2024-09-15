// LottieAnimation.js
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

const LottieAnimation = () => {
  return (
    <Player
      src="https://lottie.host/05458825-6800-4786-96bc-5dde556118da/12IDQYY36N.json"
      background="transparent"
      speed={1}
      style={{ width: '400px', height: '400px' }}
      loop
      autoplay
    />
  );
};

export default LottieAnimation;
