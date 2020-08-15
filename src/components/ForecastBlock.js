import React, { Component } from 'react';
import { forecastStyles } from '../asssets/styles';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import { Text, View } from 'react-native';

const ForecastBlock = ({
  data,
  subText,
  screenHeight,
  screenWidth,
  temperatureFontSize = 60,
  weatherIconSize = 60,
}) => {
  const currentForecastStyle = {
    ...forecastStyles.item,
    width: screenWidth,
    // height: screenHeight,
  };

  return (
    <View style={currentForecastStyle}>
      <Text style={forecastStyles.title}>{subText}</Text>
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
    </View>
  );
};

export default ForecastBlock;
