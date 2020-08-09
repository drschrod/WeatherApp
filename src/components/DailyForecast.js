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
import ForecastBlock from './ForecastBlock';

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

export default class DailyForecast extends Component {
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
              subText={item.name}
              screenHeight={screenHeight}
              screenWidth={screenWidth}
            />
          )}
          keyExtractor={item => `${item.number}`}
          horizontal={renderHorizontally}
          snapToInterval={Dimensions.get('window').width}
        />
      </View>
    );
  }
}
