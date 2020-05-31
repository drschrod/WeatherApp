import React, {Component} from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';

import Temperature from './Temperature';
import HourlyForecast from './HourlyForecast';
import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../requests/weatherApiCaller';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }
  componentDidMount() {
    asyncGetCurrentPosition()
      .then(location => getWeatherData(location))
      .then(weatherData => this.setState({weatherData, loading: false}));
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="white" />
        </View>
      );
    }
    const {
      startTime,
      endTime,
      isDaytime,
      temperature,
      temperatureUnit,
      temperatureTrend,
      windSpeed,
      windDirection,
      icon,
      shortForecast,
      detailedForecast,
    } = this.state.weatherData.forecast.current;
    // Todo: gradient function for the temperature
    const textColor = temperature >= 80 ? 'red' : 'blue';
    return (
      <View>
        <Text style={styles.baseText}>
          <Temperature
            temperature={temperature}
            temperatureUnit={temperatureUnit}
          />
          {/* Develop bag of words to determine UI based on short forecast? */}
          <Text>{shortForecast}</Text>
        </Text>
        <HourlyForecast
          forecast={this.state.weatherData.forecast.hourly.intervals}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
