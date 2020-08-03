import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, useWindowDimensions, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';
import { getColorTempGradient } from '../helpers/colorTemperature';
import { formatHourlyTime } from '../helpers/time';
import { forecastStyles } from '../asssets/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const forecastIconMapper = (shortForecast, prefix) => {
  switch (shortForecast) {
    case 'Chance Showers And Thunderstorms':
      return 'weather-lightning-rainy';
    case 'Partly Cloudy':
      return `${prefix}-partly-cloudy`;
    default:
      return prefix;
  }
};

const getIconFromForecast = ({ shortForecast, isDaytime }) => {
  if (isDaytime) {
    return forecastIconMapper(shortForecast, 'weather-sunny');
  }
  return forecastIconMapper(shortForecast, 'weather-night');
}

const Item = ({ data, index, subText }) => {
  const currentForecastStyle = {
    ...forecastStyles.item,
    width: useWindowDimensions().width - forecastStyles.item.padding,
  };
  // data.shortForecast
  const WeatherIcon = (
    <Icon name={getIconFromForecast(data)} size={60} color={getColorTempGradient(data.temperature)} />
  );

  return (
    <View
      style={index === 0 ? currentForecastStyle : forecastStyles.item}>
      <Text style={forecastStyles.title}>{subText}{WeatherIcon}</Text>
      <Temperature
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
      />
      {index === 0 ? <Text style={forecastStyles.title}>{`\nand ${data.shortForecast}\t`}</Text> : null}
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
    } = this.props;

    return (
      <View style={forecastStyles.view}>
        <FlatList
          style={[{ marginLeft: 4 }]}
          data={forecast.slice(0, forecastRange)}
          renderItem={({ item, index }) => (
            <Item
              data={item}
              index={index}
              subText={
                renderHour ? formatHourlyTime(currentHour, index) : item.name
              }
            />
          )}
          keyExtractor={item => `${item.number}`}
          horizontal={renderHorizontally}
          snapToAlignment={'center'}
          snapToInterval={Dimensions.get('window').width / 5}
        />
      </View>
    );
  }
}
