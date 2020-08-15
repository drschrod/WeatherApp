import React, { Component, useEffect, useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Constants from 'expo-constants';

import { forecastStyles, dailyForecastStyles } from '../asssets/styles';
import { formatHourlyTime } from '../helpers/time';

import Temperature from './Temperature';
import WeatherIcon from './WeatherIcon';

const pairDailyForecasts = ({ forecast, isDaytime }) => {
  const data = [];
  //   return data;
  if (forecast[0].isDaytime) {
    for (let index = 0; index < forecast.length; index++) {
      const halfDayForecast = forecast[index];
      const nightTimeForecast = forecast[index + 1];
      // if its daytime then the first two entries are paired
      data.push({
        name: halfDayForecast.name,
        dayTimeForecast: halfDayForecast,
        nightTimeForecast,
      });
      index += 1;
    }
  } else {
    data.push({
      name: forecast[0].name,
      dayTimeForecast: null,
      nightTimeForecast: forecast[0],
    });
    for (let index = 1; index < forecast.length - 1; index++) {
      const halfDayForecast = forecast[index];
      const nightTimeForecast = forecast[index + 1];
      // if its daytime then the first two entries are paired
      data.push({
        name: halfDayForecast.name,
        dayTimeForecast: halfDayForecast,
        nightTimeForecast,
      });
      index += 1;
    }
    data.push({
      name: forecast[forecast.length - 1].name,
      dayTimeForecast: null,
      nightTimeForecast: forecast[forecast.length - 1],
    });
  }
  return data;
};

const ForecastBlock = ({
  shortForecast,
  isDaytime,
  temperature,
  temperatureUnit,
  temperatureFontSize,
}) => {
  return (
    <View style={dailyForecastStyles.row}>
      <WeatherIcon
        shortForecast={shortForecast}
        isDaytime={isDaytime}
        temperature={temperature}
        size={50}
      />
      <Temperature
        temperature={temperature}
        temperatureUnit={temperatureUnit}
        fontSize={temperatureFontSize}
      />
    </View>
  );
};

const DayForecast = ({
  day,
  screenHeight,
  screenWidth,
  dayTimeForecast,
  nightTimeForecast,
}) => {
  if (dayTimeForecast && nightTimeForecast) {
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{ flex: 1 }}
      >
        <View style={dailyForecastStyles.column}>
          {/* Day row */}
          {/*      Title       */}
          {/*   icon | icon    */}
          {/*   Temp | Temp    */}
          <Text style={dailyForecastStyles.title}>{day}</Text>
          <View style={dailyForecastStyles.row}>
            <View style={dailyForecastStyles.subColumn}>
              <WeatherIcon
                shortForecast={dayTimeForecast.shortForecast}
                isDaytime={dayTimeForecast.isDaytime}
                temperature={dayTimeForecast.temperature}
                size={50}
              />
              <Temperature
                temperature={dayTimeForecast.temperature}
                temperatureUnit={dayTimeForecast.temperatureUnit}
                fontSize={50}
              />
            </View>
            <View style={dailyForecastStyles.subColumn}>
              <WeatherIcon
                shortForecast={nightTimeForecast.shortForecast}
                isDaytime={nightTimeForecast.isDaytime}
                temperature={nightTimeForecast.temperature}
                size={50}
              />
              <Temperature
                temperature={nightTimeForecast.temperature}
                temperatureUnit={nightTimeForecast.temperatureUnit}
                fontSize={50}
              />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }

  const data = dayTimeForecast ? dayTimeForecast : nightTimeForecast;
  return (
    <View>
      <Text style={dailyForecastStyles.title}>{day}</Text>
      <ForecastBlock
        shortForecast={data.shortForecast}
        isDaytime={data.isDaytime}
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
        temperatureFontSize={50}
      />
    </View>
  );
};

function DailyForecast({
  forecast,
  forecastRange,
  renderHorizontally,
  screenHeight,
  screenWidth,
  isDaytime,
}) {
  const [state, setState] = useState(() => {
    return pairDailyForecasts({ forecast, isDaytime });
  });
  return (
    <View>
      <FlatList
        data={state}
        renderItem={({ item, index }) => (
          <DayForecast
            day={item.name}
            dayTimeForecast={item.dayTimeForecast}
            nightTimeForecast={item.nightTimeForecast}
            screenHeight={screenHeight}
            screenWidth={screenWidth}
          />
        )}
        keyExtractor={(item, index) => `${index}`}
        horizontal={renderHorizontally}
        snapToInterval={Dimensions.get('window').width}
      />
    </View>
  );
}
export default DailyForecast;
