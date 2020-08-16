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
import { getColorGradientFromTemperature } from '../helpers/colorTemperature';
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
  index,
  maxIndex,
}) => {
  let dayForecastBlockStyle;
  switch (index) {
    case 0:
      dayForecastBlockStyle = {
        ...dailyForecastStyles.block,
        borderTopStartRadius: 20,
        borderTopEndRadius: 20,
      };
      break;
    case maxIndex:
      dayForecastBlockStyle = {
        ...dailyForecastStyles.block,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
      };
      break;
    default:
      dayForecastBlockStyle = dailyForecastStyles.block;
      break;
  }
  if (dayTimeForecast && nightTimeForecast) {
    return (
      <LinearGradient
        colors={getColorGradientFromTemperature({
          dayTemp: dayTimeForecast.temperature,
          nightTemp: nightTimeForecast.temperature,
        })}
        start={{ x: 0.3, y: 0.3 }}
        end={{ x: 0.8, y: 0.8 }}
        style={dayForecastBlockStyle}
      >
        <View style={dailyForecastStyles.column}>
          {/*  Day row layout  */}
          {/*          Title            */}
          {/*   icon temp | icon temp   */}
          <Text style={dailyForecastStyles.title}>{day}</Text>
          <View style={dailyForecastStyles.row}>
            <View style={dailyForecastStyles.subRow}>
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
            <View style={dailyForecastStyles.subRow}>
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
    <LinearGradient
      colors={getColorGradientFromTemperature({
        dayTemp: dayTimeForecast.temperature,
        nightTemp: nightTimeForecast.temperature,
      })}
      style={dailyForecastStyles.block}
    >
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
    </LinearGradient>
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
            index={index}
            maxIndex={state.length - 1}
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
