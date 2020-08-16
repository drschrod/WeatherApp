import React, { Component } from 'react';

import { Text, View } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { forecastBlock } from '../asssets/styles';
import { getColorGradientFromTemperature } from '../helpers/colorTemperature';

import Temperature from './Temperature';
import WeatherIcon from './WeatherIcon';

const ForecastBlock = ({
  data,
  subText,
  screenHeight,
  screenWidth,
  temperatureFontSize = 60,
  weatherIconSize = 60,
  index,
  maxIndex,
}) => {
  let currentForecastStyle;
  switch (index) {
    case 0:
      currentForecastStyle = {
        ...forecastBlock.item,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
      };
      break;
    case maxIndex:
      currentForecastStyle = {
        ...forecastBlock.item,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      };
      break;
    default:
      currentForecastStyle = forecastBlock.item;
      break;
  }
  return (
    <LinearGradient
      colors={getColorGradientFromTemperature({
        temperature: data.temperature,
      })}
      start={{ x: 0.3, y: 0.3 }}
      end={{ x: 0.8, y: 0.8 }}
      style={currentForecastStyle}
    >
      {subText}
      <WeatherIcon
        shortForecast={data.shortForecast}
        isDaytime={data.isDaytime}
        temperature={data.temperature}
        size={weatherIconSize}
      />
      <Temperature
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
        fontSize={temperatureFontSize}
      />
    </LinearGradient>
  );
};

export default ForecastBlock;
