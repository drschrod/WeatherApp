import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';
import {formatHourlyTime} from '../helpers/time';

const Item = ({data, index, currentHour}) => {
  return (
    <View style={styles.item}>
      <Text>{data.name}</Text>
      <Temperature
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
      />
    </View>
  );
};

const Separator = ({data, index, currentHour}) => {
  return <View style={styles.separator} />;
};

export default class Forecasts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {forecast, renderHorizontally} = this.props;
    return (
      <View>
        <Text style={styles.title}>7 Day Forecast</Text>
        <FlatList
          data={forecast}
          renderItem={({item, index}) => (
            <Item
              data={item}
              index={index}
              currentHour={this.state.currentHour}
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
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
  separator: {
    height: '100%',
    width: 2,
  },
});
