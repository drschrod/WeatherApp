import React from 'react';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

Icon.loadFont();
function WeatherIcon({ shortForecast, isDaytime, size = 200 }) {
  const getIconFromForecast = ({ shortForecast, isDaytime }) => {
    if (isDaytime) {
      return forecastIconMapper(shortForecast, 'weather');
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
        return isDaytime ? 'weather-sunny' : 'weather-night';
    }
  };

  return (
    <Icon
      name={getIconFromForecast({ shortForecast, isDaytime })}
      testID={getIconFromForecast({ shortForecast, isDaytime })}
      size={size}
      color='white'
    />
  );
}
export default WeatherIcon;

WeatherIcon.propTypes = {
  shortForecast: PropTypes.string.isRequired,
  isDaytime: PropTypes.bool.isRequired,
  size: PropTypes.number,
};
