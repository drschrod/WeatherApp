import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';
import {formatHourlyTime} from '../helpers/time';
import {forecastStyles} from '../asssets/styles';

const Item = ({data, index, subText}) => {
  return (
    <View style={forecastStyles.item}>
      <Text style={forecastStyles.title}>{subText}</Text>
      <Temperature
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
      />
    </View>
  );
};

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
      renderHour,
    } = this.props;
    return (
      <View style={forecastStyles.view}>
        <FlatList
          style={[{marginLeft: 4}]}
          data={forecast.slice(0, forecastRange)}
          renderItem={({item, index}) => (
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
        />
      </View>
    );
  }
}
