import React, { Component, useEffect } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { getColorTempGradient } from '../helpers/colorTemperature';
Icon.loadFont();
function WeatherIcon({ shortForecast, isDaytime, temperature, size = 200 }) {
  const getIconFromForecast = ({ shortForecast, isDaytime }) => {
    if (isDaytime) {
      return forecastIconMapper(shortForecast, 'weather-sunny');
    }
    return forecastIconMapper(shortForecast, 'weather-night');
  };

  const forecastIconMapper = (shortForecast, prefix) => {
    switch (shortForecast) {
      case 'Chance Showers And Thunderstorms':
        return 'weather-lightning-rainy';
      case 'Partly Cloudy':
        return `${prefix}-partly-cloudy`;
      default:
        return prefix;
    }
  };

  return (
    <Icon
      name={getIconFromForecast({ shortForecast, isDaytime })}
      size={size}
      // color={getColorTempGradient(temperature)}
      color={isDaytime ? 'yellow' : 'purple'}
    />
  );
}
export default WeatherIcon;
