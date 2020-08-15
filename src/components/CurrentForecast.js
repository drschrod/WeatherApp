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
import WeatherIcon from './WeatherIcon';
import Temperature from './Temperature';
import { currentForecastStyles } from '../asssets/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

function CurrentForecast({ temperature, unit, shortForecast }) {
  console.log({ temperature, unit, shortForecast });
  return (
    //   NOTE: I want weather alerts and such found here
    <View
      style={{
        ...currentForecastStyles.container,
        justifyContent: 'center',
      }}
    >
      <Text style={currentForecastStyles.text}>Currently</Text>
      <Text style={currentForecastStyles.text}>
        <Temperature
          temperature={temperature}
          temperatureUnit={unit}
          fontSize={100}
        />
      </Text>
      <Text
        style={{ ...currentForecastStyles.text, fontStyle: 'italic' }}
      >{`and ${shortForecast}\t`}</Text>
      <Icon name='keyboard-arrow-up' size={100} color='white' />
    </View>
  );
}

export default CurrentForecast;
