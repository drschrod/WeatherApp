import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../requests/weatherApiCaller';
import { weatherStyles, imageBackground } from '../asssets/styles';
import HourlyForecast from '../components/HourlyForecast';
import Temperature from '../components/Temperature';
import CurrentForecast from '../components/CurrentForecast';

function MainPage({
  hourlyForecast,
  currentTemperature,
  temperatureUnit,
  currentForecast,
  isDaytime,
  currentHour,
  screenHeight,
  screenWidth,
}) {
  return (
    <View>
      <CurrentForecast
        temperature={currentTemperature}
        unit={temperatureUnit}
        shortForecast={currentForecast}
        isDaytime={isDaytime}
      />
      {/* Hourly Forecast */}
      <HourlyForecast
        forecast={hourlyForecast}
        forecastRange={11}
        renderHorizontally={false}
        currentHour={currentHour}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
      />
    </View>
  );
}

export default MainPage;
