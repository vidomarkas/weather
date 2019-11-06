import React from "react";
import LottieControl from "./LottieControl";

import * as cloudFoggy from "../assets/weatherIcons/cloud-foggy.json";
import * as cloudRain from "../assets/weatherIcons/cloud-rain.json";
import * as cloudThunderRain from "../assets/weatherIcons/cloud-thunder-rain.json";
import * as cloud from "../assets/weatherIcons/cloud.json";
import * as daySunClear from "../assets/weatherIcons/day-sun-clear.json";
import * as daySunCloudRain from "../assets/weatherIcons/day-sun-cloud-rain.json";
import * as daySunCloudSnow from "../assets/weatherIcons/day-sun-cloud-snow.json";
import * as daySunCloudy from "../assets/weatherIcons/day-sun-cloudy.json";
import * as daySunThunderRain from "../assets/weatherIcons/day-sun-thunder-rain.json";
import * as nightClear from "../assets/weatherIcons/night-clear.json";
import * as nightMoonCloudSnow from "../assets/weatherIcons/night-moon-cloud-snow.json";
import * as nightMoonCloudy from "../assets/weatherIcons/night-moon-cloudy.json";
import * as nightMoonRainCloud from "../assets/weatherIcons/night-moon-rain-cloud.json";

export default function MainWeatherImage({ iconName }) {
  const detectDayOrNight = iconName => {
    if (iconName.charAt(3) === "d") {
      return "day";
    } else {
      return "night";
    }
  };

  const detectIcon = iconName => {
    const time = detectDayOrNight(iconName);

    if (time === "day") {
      switch (iconName) {
        case "c01d":
          return daySunClear;
        case "c02d":
          return daySunCloudy;
        case "c03d":
        case "c04d":
          return cloud;
        case "r01d":
        case "r02d":
        case "r03d":
        case "r04d":
        case "r06d":
        case "f01d":
        case "d01d":
        case "d02d":
        case "d03d":
        case "u00d":
          return cloudRain;
        case "r05d":
          return daySunCloudRain;
        case "t01d":
        case "t02d":
        case "t03d":
        case "t04d":
        case "t05d":
          return daySunThunderRain;
        case "s01d":
        case "s02d":
        case "s03d":
        case "s04d":
        case "s05d":
        case "s06d":
          return daySunCloudSnow;
        case "a01d":
        case "a02d":
        case "a03d":
        case "a04d":
        case "a05d":
        case "a06d":
          return cloudFoggy;
        default:
          return cloud;
      }
    } else if (time === "night") {
      switch (iconName) {
        case "c01n":
          return nightClear;
        case "c02n":
          return nightMoonCloudy;
        case "c03n":
        case "c04n":
          return cloud;
        case "d01n":
        case "d02n":
        case "d03n":
        case "r01n":
        case "r02n":
        case "r03n":
        case "r04n":
        case "r05n":
        case "r06n":
        case "f01n":
        case "u00n":
          return nightMoonRainCloud;
        case "t01n":
        case "t02n":
        case "t03n":
        case "t04n":
        case "t05n":
          return cloudThunderRain;
        case "s01n":
        case "s02n":
        case "s03n":
        case "s04n":
        case "s05n":
        case "s06n":
          return nightMoonCloudSnow;
        case "a01n":
        case "a02n":
        case "a03n":
        case "a04n":
        case "a05n":
        case "a06n":
          return cloudFoggy;
        default:
          return cloud;
      }
    }
  };

  return <LottieControl animationData={detectIcon(iconName)} />;
}
