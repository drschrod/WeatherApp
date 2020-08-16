import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from 'react-native';

import Constants from 'expo-constants';

import { styles } from '../asssets/styles';
import { formatHourlyTime } from '../helpers/time';
import Hour from './Hour';
import ForecastBlock from './ForecastBlock';

function HourlyForecast({
  forecast,
  forecastRange,
  renderHorizontally,
  currentHour,
  screenHeight,
  screenWidth,
}) {
  return (
    <View style={{ ...styles.view }}>
      <FlatList
        data={forecast.slice(0, forecastRange)}
        renderItem={({ item, index }) => (
          <ForecastBlock
            data={item}
            index={index}
            subText={
              <Hour
                currentHour={currentHour}
                index={index}
                fontSize={50}
              ></Hour>
            }
            screenHeight={screenHeight / 2}
            screenWidth={screenWidth}
            maxIndex={forecastRange - 1}
          />
        )}
        keyExtractor={(item) => `${item.number}`}
        horizontal={renderHorizontally}
        snapToInterval={Dimensions.get('window').width}
      />
    </View>
  );
}

export default HourlyForecast;
