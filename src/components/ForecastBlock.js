import React from 'react';

import { View } from 'react-native';

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
  isDaytime,
}) => {
  const itemStyle = [forecastBlock.item];
  if (index === maxIndex) {
    itemStyle.push({
      // borderTopStartRadius: 40,
      // borderTopEndRadius: 40,
      marginTop: -190,
      paddingTop: 200,
    });
  }
  return (
    <View elevation={maxIndex - index} style={forecastBlock.shadowBox}>
      <LinearGradient
        colors={getColorGradientFromTemperature({
          temperature: data.temperature,
          isDaytime: isDaytime,
        })}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 0.8, y: 0.8 }}
        style={itemStyle}
      >
        <View style={itemStyle}>
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
        </View>
      </LinearGradient>
    </View>
  );
};

export default ForecastBlock;
