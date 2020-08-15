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

export default class HourlyForecast extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      forecast,
      forecastRange,
      renderHorizontally,
      currentHour,
      screenHeight,
      screenWidth,
    } = this.props;

    return (
      <View style={{ ...forecastStyles.view, height: screenHeight / 2 }}>
        <Text style={forecastStyles.text}>TEST</Text>
        <FlatList
          data={forecast.slice(0, forecastRange)}
          renderItem={({ item, index }) => (
            <ForecastBlock
              data={item}
              index={index}
              subText={formatHourlyTime(currentHour, index)}
              screenHeight={screenHeight / 2}
              screenWidth={screenWidth}
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
