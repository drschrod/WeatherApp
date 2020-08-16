import React, { Component, useEffect } from 'react';

import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { currentForecastStyles } from '../asssets/styles';

import Temperature from './Temperature';
import WeatherIcon from './WeatherIcon';
Icon.loadFont();
function CurrentForecast({ temperature, unit, shortForecast, isDaytime }) {
  return (
    <View
      style={{
        ...currentForecastStyles.container,
      }}
    >
      <WeatherIcon
        shortForecast={shortForecast}
        isDaytime={isDaytime}
        temperature={temperature}
        size={100}
      />
      <Text style={currentForecastStyles.text}>
        <Temperature
          temperature={temperature}
          temperatureUnit={unit}
          fontSize={100}
        />
      </Text>
    </View>
  );
}

export default CurrentForecast;
