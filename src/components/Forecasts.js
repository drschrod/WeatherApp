import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';
import {formatHourlyTime} from '../helpers/time';

const Item = ({data, index, subText}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{subText}</Text>
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
      <View style={styles.view}>
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
          keyExtractor={item => item.id}
          horizontal={renderHorizontally}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#FFB385',
    padding: 25,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 10,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  separator: {
    height: '100%',
    width: 2,
  },
});
