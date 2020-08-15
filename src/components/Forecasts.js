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
import Temperature from './Temperature';
import WeatherIcon from './WeatherIcon';

import { formatHourlyTime } from '../helpers/time';
import { forecastStyles } from '../asssets/styles';

const TimeSlot = ({ data, index, subText, screenHeight, screenWidth }) => (
  <View style={forecastStyles.item}>
    <Text style={forecastStyles.title}>{subText}</Text>
    {/* <Icon
          name={getIconFromForecast(data)}
          size={200}
          color={getColorTempGradient(data.temperature)}
        /> */}
  </View>
);

const ForecastBlock = ({ data, index, subText, screenHeight, screenWidth }) => {
  const currentForecastStyle = {
    ...forecastStyles.item,
    width: screenWidth,
    height: screenHeight,
  };

  return (
    <View style={index === 0 ? currentForecastStyle : forecastStyles.item}>
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

export default class Forecasts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      forecast,
      forecastRange,
      renderHorizontally,
      currentHour,
      renderHour,
      screenHeight,
      screenWidth,
      isDailyForecast,
    } = this.props;

    return (
      <View style={forecastStyles.view}>
        <FlatList
          data={forecast.slice(0, forecastRange)}
          renderItem={({ item, index }) => (
            <ForecastBlock
              data={item}
              index={index}
              subText={
                renderHour ? formatHourlyTime(currentHour, index) : item.name
              }
              screenHeight={screenHeight}
              screenWidth={isDailyForecast ? screenWidth / 2 : screenWidth}
            />
          )}
          keyExtractor={(item) => `${item.number}`}
          horizontal={renderHorizontally}
          snapToInterval={Dimensions.get('window').width}
        />
      </View>
    );
  }
}
