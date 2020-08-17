import React, { Component } from 'react';

import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

import { weatherStyles } from '../asssets/styles';
import CurrentForecast from '../components/CurrentForecast';
import HourlyForecast from '../components/HourlyForecast';
import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../requests/weatherApiCaller';
import { getData, storeData } from '../helpers/dataCache';
import DailyForecast from './DailyForecast';

const defaultBackgroundColor = (currentHour) => {
  if (currentHour > 17) {
    return '#252850';
  } else {
    return 'skyblue';
  }
};

// TODO: Update to functional component
export default class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentHour: new Date().getHours(),
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.refreshInterval);
    this.setState = (state, callback) => {
      return;
    };
  }

  async componentDidMount() {
    const refreshInterval = setInterval(() => {
      this.setState({
        currentHour: new Date().getHours(),
        pageHeight: Dimensions.get('screen').height * 0.9,
        pageWidth: Dimensions.get('screen').width,
        windowDimensions: Dimensions.get('screen'),
      });
    }, 60000);

    const cachedWeatherData = await getData('cachedWeatherData');
    if (cachedWeatherData) {
      console.log('Cached Data was Valid. Using Cached data');
      this.setState({ weatherData: cachedWeatherData, loading: false });
    } else {
      try {
        const { coords } = await asyncGetCurrentPosition();
        const weatherData = await getWeatherData(coords);
        this.setState({ weatherData, loading: false });
        await storeData(weatherData, 'cachedWeatherData');
      } catch (error) {
        this.setState({ error, loading: false });
      }
    }

    this.setState({
      refreshInterval,
    });
  }

  renderCurrentForecastHeader = ({
    temperature,
    temperatureUnit,
    shortForecast,
    isDaytime,
  }) => {
    return (
      <CurrentForecast
        temperature={temperature}
        unit={temperatureUnit}
        shortForecast={shortForecast}
        isDaytime={isDaytime}
      />
    );
  };
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
        <View>
          <ActivityIndicator size='large' color='white' />
          <Text style={weatherStyles.text}>
            {this.state.error.message} retrying in 10 seconds
          </Text>
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
      shortForecast,
      detailedForecast,
    } = this.state.weatherData.forecast.current;
    // Todo: gradient function for the temperature

    const textColor = temperature >= 80 ? 'red' : 'blue';
    return (
      <View style={weatherStyles.view}>
        <ScrollView
          ref={(c) => {
            this.scroll = c;
          }}
          style={weatherStyles.scrollView}
          decelerationRate={'fast'}
          pagingEnabled={true}
          scrollToOverflowEnabled={true}
          snapToInterval={this.state.pageWidth}
          snapToAlignment={'center'}
          horizontal={true}
          indicatorStyle={'white'}
          persistentScrollbar={true}
          showsHorizontalScrollIndicator={true}
          scrollsToTop={true}
          elevation={5}
        >
          <HourlyForecast
            forecast={this.state.weatherData.forecast.hourly}
            forecastRange={11}
            renderHorizontally={false}
            currentHour={this.state.currentHour}
            screenHeight={this.state.pageHeight}
            screenWidth={this.state.pageWidth}
            isDaytime={isDaytime}
            header={this.renderCurrentForecastHeader({
              temperature,
              temperatureUnit,
              shortForecast,
              isDaytime,
            })}
          />
          {/* Daily Forecast */}
          <DailyForecast
            forecast={this.state.weatherData.forecast.daily}
            forecastRange={14}
            renderHorizontally={false}
            screenHeight={this.state.pageHeight}
            screenWidth={this.state.pageWidth}
            isDailyForecast={true}
            isDaytime={isDaytime}
          />
        </ScrollView>
        {/* Bottom Naviagation */}
        {/* Today   |   This Week */}
        {/* <View style={weatherStyles.bottomNavBar}>
          <Pressable
            onPress={() => {
              this.scroll.scrollTo({ x: 0, y: 0, animated: true });
            }}
            style={({ pressed }) => [
              {
                ...weatherStyles.pressable,
                fontColor: pressed ? 'black' : 'white',
                backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
              },
            ]}
          >
            <Text style={weatherStyles.text}>Hourly</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              this.scroll.scrollTo({
                x: this.state.windowDimensions.width,
                y: 0,
                animated: true,
              });
            }}
            style={({ pressed }) => [
              {
                color: pressed ? 'black' : 'white',
              },
              weatherStyles.pressable,
            ]}
          >
            <Text style={weatherStyles.text}>Daily</Text>
          </Pressable>
        </View> */}
      </View>
    );
  }
}
