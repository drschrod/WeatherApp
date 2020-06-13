import React, {Component} from 'react';
import {ActivityIndicator, Text, StyleSheet, View} from 'react-native';

import Temperature from './Temperature';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import Forecasts from './Forecasts';
import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../requests/weatherApiCaller';
import {styles} from '../asssets/styles';
export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }
  componentDidMount() {
    asyncGetCurrentPosition()
      .then(location => getWeatherData(location))
      .then(weatherData => this.setState({weatherData, loading: false}));

    setInterval(() => {
      this.setState({
        currentHour: new Date().getHours(),
      });
    }, 60000);
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
      <View style={styles.view}>
        <Text style={styles.baseText}>
          <Text style={[{textAlign: 'left', paddingLeft: 20}]}>
            {'\tCurrently\n'}
          </Text>
          <Text style={[{textAlign: 'center', paddingBottom: 20}]}>
            <Temperature
              temperature={temperature}
              temperatureUnit={temperatureUnit}
              color={'white'}
              fontSize={60}
            />
            {/* Develop bag of words to determine UI based on short forecast? */}
          </Text>
          <Text style={[{textAlign: 'right', paddingRight: 20}]}>
            {`\nand ${shortForecast}\t`}
          </Text>
        </Text>
        <HourlyForecast
          forecast={this.state.weatherData.forecast.hourly.intervals}
        />
        <DailyForecast
          forecast={this.state.weatherData.forecast.daily.intervals}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//   },
//   baseText: {
//     fontFamily: 'Cochin',
//     fontSize: 25,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10,
//   },
// });
