import React from "react";
import Lottie from "react-lottie";

const LottieControl = props => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: props.animationData.default,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const adaptToScreenWidth = () => {
    const width = Math.max(window.screen.width, window.innerWidth);
    if (width > 600) {
      return 180;
    } else if (width <= 600 && width >= 500) {
      return 150;
    } else if (width < 500 && width > 400) {
      return 100;
    } else if (width < 400) {
      return 100;
    }
  };

  return (
    <div className="current-weather__main__icon">
      <Lottie
        options={defaultOptions}
        height={adaptToScreenWidth()}
        width={adaptToScreenWidth()}
      />
    </div>
  );
};

export default LottieControl;
