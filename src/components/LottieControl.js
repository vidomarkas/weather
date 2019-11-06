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

  return (
    <div>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default LottieControl;
