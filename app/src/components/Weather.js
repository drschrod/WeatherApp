import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

import Temperature from './Temperature';
import { getWeatherData, asyncGetCurrentPosition } from '../requests/weatherApiCaller';

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }
  componentDidMount() {
    asyncGetCurrentPosition()
        .then(location => getWeatherData(location))
        .then(weatherData => this.setState({weatherData, loading: false}))
  }
  render() {
    if(this.state.loading) {
        return (<Text>{"Loading..."}</Text>);
    }
    const { startTime, endTime, isDaytime, 
        temperature, temperatureUnit, 
        temperatureTrend, windSpeed, 
        windDirection, icon, 
        shortForecast, detailedForecast } = this.state.weatherData.forecast.current;
    // Todo: gradient function for the temperature
    const textColor = temperature >= 80 ? 'red' : 'blue';
    return (
      <Text style={styles.baseText}>
        <Temperature temperature={temperature} temperatureUnit={temperatureUnit}></Temperature>
        {/* Develop bag of words to determine UI based on short forecast? */}
        <Text>{shortForecast}</Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Cochin",
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black"
  }
});