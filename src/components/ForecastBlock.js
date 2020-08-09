import React, { Component } from 'react';
import { forecastStyles } from '../asssets/styles';
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import { Text, View } from 'react-native';

const ForecastBlock = ({ data, index, subText, screenHeight, screenWidth }) => {
  const currentForecastStyle = {
    ...forecastStyles.item,
    width: screenWidth,
    height: screenHeight,
  };

  return (
    <View style={currentForecastStyle}>
      <Text style={forecastStyles.title}>{subText}</Text>
      <WeatherIcon
        shortForecast={data.shortForecast}
        isDaytime={data.isDaytime}
        temperature={data.temperature}
      />
      <Temperature
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
        fontSize={100}
      />
    </View>
  );
};

export default ForecastBlock;
