import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';
import {formatHourlyTime} from '../helpers/time';

const Item = ({data, index, currentHour}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{data.name}</Text>
      <Temperature
        temperature={data.temperature}
        temperatureUnit={data.temperatureUnit}
      />
    </View>
  );
};

export default class DailyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {forecast} = this.props;
    return (
      <View style={styles.view}>
        {/* <Text style={styles.title}>7 Day Forecast</Text> */}
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
    backgroundColor: '#7FC8F8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 5,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
  },
});
