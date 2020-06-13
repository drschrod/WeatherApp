import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';
import {formatHourlyTime} from '../helpers/time';

const Item = ({data, index, currentHour}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{formatHourlyTime(currentHour, index)}</Text>
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

export default class HourlyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {currentHour: new Date().getHours().toLocaleString()};
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentHour: new Date().getHours(),
      });
    }, 60000);
  }

  render() {
    const {forecast} = this.props;
    return (
      <View>
        <FlatList
          style={[{marginLeft: 4}]}
          data={forecast.slice(0, 11)}
          renderItem={({item, index}) => (
            <Item
              data={item}
              index={index}
              currentHour={this.state.currentHour}
            />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
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
