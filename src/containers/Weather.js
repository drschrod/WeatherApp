import React, { useEffect, useReducer } from 'react';

import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';

import { CurrentForecast, HourlyForecast, DailyForecast } from '../components';
import { weatherStyles } from '../asssets/styles';
import { getData, storeData, generateKey } from '../helpers/dataCache';
import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../requests/weatherApiCaller';

const defaultBackgroundColor = (currentHour) => {
  if (currentHour > 17) {
    return '#252850';
  } else {
    return 'skyblue';
  }
};
const initialState = {
  weatherData: null,
  error: null,
  loading: true,
  currentHour: new Date().getHours(),
  refreshInterval: null,
  pageHeight: Dimensions.get('screen').height * 0.9,
  pageWidth: Dimensions.get('screen').width,
  windowDimensions: Dimensions.get('screen'),
};

function reducer(state, action) {
  switch (action.type) {
    case 'fetchWeather':
      return { ...state, ...action.value };
    case 'setInterval':
      return { ...state, refreshInterval: action.value };
    default:
      throw new Error();
  }
}

export default function Weather() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateWeather = (data) => {
    dispatch({
      type: 'fetchWeather',
      value: data,
    });
  };

  const setIntervalState = () => {
    if (state.refreshInterval) {
      return;
    }
    dispatch({
      type: 'setInterval',
      value: setInterval(() => {
        updateWeather({
          ...dataFetch(),
        });
      }, 60000),
    });
  };

  const dataFetch = async () => {
    const cacheKey = generateKey();
    let weatherData = await getData(cacheKey);
    let loading = true;
    let error = null;
    if (weatherData) {
      console.log('Cached Data was Valid. Using Cached data');
      loading = false;
    } else {
      try {
        const { coords } = await asyncGetCurrentPosition();
        weatherData = await getWeatherData(coords);
        loading = false;
        await storeData(weatherData, cacheKey);
      } catch (err) {
        error = err;
        loading = false;
      }
    }
    updateWeather({
      weatherData,
      loading,
      error,
      currentHour: new Date().getHours(),
    });
  };

  useEffect(() => {
    return () => {
      clearInterval(state.refreshInterval);
    };
  }, [state]);

  const renderCurrentForecastHeader = ({
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

  if (state.loading) {
    dataFetch();
    return (
      <View style={[weatherStyles.container, weatherStyles.horizontal]}>
        <ActivityIndicator size='large' color='white' />
      </View>
    );
  }
  if (state.error) {
    return (
      <View>
        <ActivityIndicator size='large' color='white' />
        <Text style={weatherStyles.text}>{state.error.message} retrying</Text>
      </View>
    );
  }

  const {
    isDaytime,
    temperature,
    temperatureUnit,
    temperatureTrend,
    windSpeed,
    windDirection,
    shortForecast,
    detailedForecast,
  } = state.weatherData.forecast.current;

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
        initialScrollIndex={0}
        snapToInterval={state.pageWidth}
        snapToAlignment={'center'}
        horizontal={true}
        indicatorStyle={'white'}
        persistentScrollbar={true}
        showsHorizontalScrollIndicator={true}
        scrollsToTop={true}
        elevation={5}
      >
        <HourlyForecast
          forecast={state.weatherData.forecast.hourly}
          forecastRange={11}
          renderHorizontally={false}
          currentHour={state.currentHour}
          screenHeight={state.pageHeight}
          screenWidth={state.pageWidth}
          isDaytime={isDaytime}
          header={renderCurrentForecastHeader({
            temperature,
            temperatureUnit,
            shortForecast,
            isDaytime,
          })}
        />
        {/* Daily Forecast */}
        <DailyForecast
          forecast={state.weatherData.forecast.daily}
          forecastRange={14}
          renderHorizontally={false}
          screenHeight={state.pageHeight}
          screenWidth={state.pageWidth}
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
