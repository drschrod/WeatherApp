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

import Temperature from './Temperature';
import Forecasts from './Forecasts';
import DailyForecast from './DailyForecast';
import HourlyForecast from './HourlyForecast';
import CurrentForecast from './CurrentForecast';
import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../requests/weatherApiCaller';
import { weatherStyles, imageBackground } from '../asssets/styles';
export default class Weather extends Component {
  constructor(props) {
    super(props);
    const screenHeight = Dimensions.get('screen').height;
    this.state = {
      loading: true,
      currentHour: new Date().getHours(),
      pageHeight: screenHeight * 0.9,
      windowDimensions: Dimensions.get('screen'),
    };
  }
  componentDidMount() {
    asyncGetCurrentPosition()
      .then(location => getWeatherData(location))
      .then(weatherData => this.setState({ weatherData, loading: false }))
      .catch(error => this.setState({ error, loading: false }));

    setInterval(() => {
      this.setState({
        currentHour: new Date().getHours(),
      });
    }, 60000);
  }
  render() {
    if (this.state.loading) {
      return (
        <View style={[weatherStyles.container, weatherStyles.horizontal]}>
          <ActivityIndicator size='large' color='white' />
        </View>
      );
    }
    if (this.state.error) {
      return (
        <View style={weatherStyles.text}>
          <Text>{this.state.error.message}</Text>
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
      <View style={weatherStyles.view}>
        <ScrollView
          style={weatherStyles.scrollView}
          decelerationRate={'fast'}
          pagingEnabled={true}
          scrollToOverflowEnabled={true}
          snapToInterval={this.state.pageHeight}
          snapToAlignment={'center'}
        >
          <CurrentForecast
            height={this.state.pageHeight}
            temperature={temperature}
            unit={temperatureUnit}
            shortForecast={shortForecast}
            isDaytime={isDaytime}
          />
          {/* Hourly Forecast */}
          <HourlyForecast
            forecast={this.state.weatherData.forecast.hourly.intervals}
            forecastRange={11}
            renderHorizontally={true}
            renderHour={true}
            currentHour={this.state.currentHour}
            screenHeight={this.state.pageHeight}
            screenWidth={this.state.windowDimensions.width}
          />
          {/* Daily Forecast */}
          <DailyForecast
            forecast={this.state.weatherData.forecast.daily.intervals}
            forecastRange={7}
            renderHorizontally={true}
            screenHeight={this.state.pageHeight}
            screenWidth={this.state.windowDimensions.width}
            isDailyForecast={true}
          />
        </ScrollView>
      </View>
    );
  }
}
